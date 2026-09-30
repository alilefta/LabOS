/* Offline native-helper feasibility tests; not an application validation path. */
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { inspectJpeg } from './inspect.mjs';

const requireFromNext = createRequire(createRequire(import.meta.url).resolve('next/package.json'));
const sharp = requireFromNext('sharp');
const helper = process.env.R001_HELPER;
const cjpeg = process.env.R001_CJPEG;
const expectedHelperHash = process.env.R001_HELPER_SHA256;
assert.ok(helper && cjpeg && expectedHelperHash,
  'R001_HELPER, R001_CJPEG and R001_HELPER_SHA256 are required');
assert.equal(createHash('sha256').update(readFileSync(helper)).digest('hex'), expectedHelperHash);
const limits = { maxSegmentCount: 512, maxProgressiveScans: 128 };

function frame(bytes, declaredLength = bytes.length) {
  const header = Buffer.alloc(8);
  header.write('LJ01', 0, 'ascii');
  header.writeUInt32LE(declaredLength, 4);
  return Buffer.concat([header, bytes]);
}

function run(bytes, options = {}) {
  return spawnSync(helper, [], {
    input: frame(bytes), encoding: 'utf8', timeout: 5_000,
    maxBuffer: 1024, ...options,
  });
}

function validateOffline(bytes, execute = run) {
  const facts = inspectJpeg(bytes, limits);
  const result = execute(bytes);
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.signal, null);
  assert.equal(result.status, 0, result.stdout);
  assert.equal(result.stderr, '');
  assert.ok(result.stdout.length < 96, 'bounded result');
  const expected = `LJ01 OK ${facts.width} ${facts.height} ${facts.components} ${facts.height}\n`;
  assert.equal(result.stdout, expected);
  return facts;
}

async function photo({ progressive = false, width = 24, height = 16 } = {}) {
  return sharp({ create: { width, height, channels: 3, background: '#337799' } })
    .jpeg({ progressive, quality: 85 }).toBuffer();
}

async function grayscale() {
  const pixels = Buffer.alloc(24 * 16, 127);
  const pgm = Buffer.concat([Buffer.from('P5\n24 16\n255\n'), pixels]);
  const child = spawnSync(cjpeg, ['-grayscale'], { input: pgm, maxBuffer: 1024 * 1024 });
  assert.equal(child.status, 0, child.stderr.toString());
  return child.stdout;
}

test('complete baseline, progressive, and genuine grayscale', async () => {
  assert.equal(validateOffline(await photo()).progressive, false);
  const progressive = validateOffline(await photo({ progressive: true }));
  assert.equal(progressive.progressive, true);
  assert.ok(progressive.scans > 1);
  assert.equal(validateOffline(await grayscale()).components, 1);
});

test('inspector rejection cannot be overridden by decoder acceptance', async () => {
  const valid = await photo();
  const trailing = Buffer.concat([valid, Buffer.from([0x41])]);
  assert.throws(() => validateOffline(trailing), /trailing bytes/);
  assert.equal(run(trailing).status, 0);
  assert.throws(() => validateOffline(Buffer.concat([valid, valid])), /trailing bytes/);
});

test('missing EOI and shortened entropy fail in native decoder', async () => {
  const valid = await photo({ width: 128, height: 128 });
  const withoutEoi = valid.subarray(0, valid.length - 2);
  const missingEoi = run(withoutEoi);
  assert.notEqual(missingEoi.status, 0);
  console.log(`missing EOI: ${missingEoi.stdout.trim()}`);
  const sos = valid.indexOf(Buffer.from([0xff, 0xda]));
  const start = sos + 2 + valid.readUInt16BE(sos + 2);
  const cut = start + Math.floor((valid.length - 2 - start) / 2);
  const shortened = Buffer.concat([valid.subarray(0, cut), valid.subarray(valid.length - 2)]);
  assert.ok(inspectJpeg(shortened, limits));
  const result = run(shortened);
  assert.equal(result.status, 3);
  assert.match(result.stdout, /^LJ01 ERR DECODE 2 \d+\n$/);
  console.log(`shortened entropy: ${result.stdout.trim()}`);
});

test('malformed progressive scan rejected after inspector admits structure', async () => {
  const valid = await photo({ progressive: true });
  const sos = valid.indexOf(Buffer.from([0xff, 0xda]));
  const components = valid[sos + 4];
  const spectralEnd = sos + 4 + 1 + 2 * components + 1;
  const malformed = Buffer.from(valid);
  malformed[spectralEnd] = 63;
  assert.ok(inspectJpeg(malformed, limits));
  const result = run(malformed);
  assert.equal(result.status, 3);
  console.log(`malformed progressive: ${result.stdout.trim()}`);
});

test('framed IPC rejects empty, oversized, incomplete, and extra data', () => {
  for (const input of [
    Buffer.alloc(0),
    frame(Buffer.alloc(0)),
    frame(Buffer.alloc(0), 33_554_433),
    frame(Buffer.from([0xff, 0xd8]), 100),
    Buffer.concat([frame(Buffer.from([0xff, 0xd8])), Buffer.from([0])]),
  ]) {
    const child = spawnSync(helper, [], { input, encoding: 'utf8', timeout: 5_000, maxBuffer: 1024 });
    assert.equal(child.status, 2, child.stdout);
    assert.equal(child.stdout, 'LJ01 ERR FRAME\n');
  }
});

test('composed boundary rejects failed, crashed and malformed child records', async () => {
  const valid = await photo();
  const facts = inspectJpeg(valid, limits);
  const success = `LJ01 OK ${facts.width} ${facts.height} ${facts.components} ${facts.height}\n`;
  for (const bad of [
    { status: 3, signal: null, stdout: success, stderr: '', error: undefined },
    { status: null, signal: 'SIGTERM', stdout: success, stderr: '', error: undefined },
    { status: 0, signal: null, stdout: `${success}extra`, stderr: '', error: undefined },
    { status: 0, signal: null, stdout: success.replace('24 16', '25 16'), stderr: '', error: undefined },
    { status: 0, signal: null, stdout: success, stderr: 'unexpected', error: undefined },
  ]) assert.throws(() => validateOffline(valid, () => bad));
});

test('approved structural limits retain exact equality and plus-one edges', async () => {
  const valid = await photo();
  const sof = valid.indexOf(Buffer.from([0xff, 0xc0]));
  assert.ok(sof > 0);
  const dimensions = (width, height) => {
    const bytes = Buffer.from(valid);
    bytes.writeUInt16BE(height, sof + 5);
    bytes.writeUInt16BE(width, sof + 7);
    return bytes;
  };
  assert.equal(inspectJpeg(dimensions(9_000, 1), limits).width, 9_000);
  assert.throws(() => inspectJpeg(dimensions(9_001, 1), limits), /dimensions exceeded/);
  assert.equal(inspectJpeg(dimensions(1, 9_000), limits).height, 9_000);
  assert.throws(() => inspectJpeg(dimensions(1, 9_001), limits), /dimensions exceeded/);
  assert.equal(inspectJpeg(dimensions(8_000, 6_250), limits).pixels, 50_000_000);
  assert.throws(() => inspectJpeg(dimensions(8_000, 6_251), limits), /dimensions exceeded/);

  const segment = (marker, n) => Buffer.concat([
    Buffer.from([0xff, marker, (n + 2) >> 8, (n + 2) & 255]), Buffer.alloc(n),
  ]);
  const beforeImage = (parts) => Buffer.concat([valid.subarray(0, 2), ...parts, valid.subarray(2)]);
  const metadata = [65_533, 65_533, 65_533, 65_533, 12].map((n) => segment(0xfe, n));
  assert.equal(inspectJpeg(beforeImage(metadata), limits).metadataBytes, 262_144);
  assert.throws(() => inspectJpeg(beforeImage([...metadata, segment(0xfe, 1)]), limits), /metadata bytes exceeded/);

  const originalSegments = inspectJpeg(valid, limits).segments;
  const exactSegments = beforeImage(Array.from({ length: 512 - originalSegments }, () => segment(0xfe, 0)));
  assert.equal(inspectJpeg(exactSegments, limits).segments, 512);
  assert.throws(() => inspectJpeg(beforeImage(Array.from({ length: 513 - originalSegments }, () => segment(0xfe, 0))), limits), /segment count exceeded/);

  const progressive = await photo({ progressive: true });
  const originalScans = inspectJpeg(progressive, limits).scans;
  const extraScan = Buffer.from([0xff, 0xda, 0, 8, 1, 1, 0, 0, 0, 0]);
  const withScans = (count) => Buffer.concat([
    progressive.subarray(0, -2),
    ...Array.from({ length: count - originalScans }, () => extraScan),
    progressive.subarray(-2),
  ]);
  assert.equal(inspectJpeg(withScans(128), limits).scans, 128);
  assert.throws(() => inspectJpeg(withScans(129), limits), /scan count exceeded/);

  const entropy = Buffer.alloc(33_554_432 - valid.length);
  const exactBytes = Buffer.concat([valid.subarray(0, -2), entropy, valid.subarray(-2)]);
  assert.equal(inspectJpeg(exactBytes, limits).width, 24);
  assert.throws(() => inspectJpeg(Buffer.concat([exactBytes, Buffer.from([0])]), limits), /encoded bytes exceeded/);
});

test('caller can terminate a child blocked on incomplete input', async () => {
  const child = spawn(helper, [], { stdio: ['pipe', 'pipe', 'pipe'] });
  child.stdin.write(frame(Buffer.from([1]), 1024));
  const close = once(child, 'close');
  assert.equal(child.kill(), true);
  await close;
  assert.notEqual(child.exitCode, 0);
});

test('caller must reject abnormal exit without a success record', () => {
  const child = spawnSync(process.execPath, ['-e', 'process.exit(7)'], {
    input: Buffer.alloc(0), encoding: 'utf8', timeout: 5_000, maxBuffer: 1024,
  });
  assert.equal(child.status, 7);
  assert.equal(child.stdout, '');
});
