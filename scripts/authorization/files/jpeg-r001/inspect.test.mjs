import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { inspectJpeg, APPROVED } from './inspect.mjs';

const requireFromNext = createRequire(createRequire(import.meta.url).resolve('next/package.json'));
const sharp = requireFromNext('sharp');
const controls = { maxSegmentCount: 512, maxProgressiveScans: 64 };
const inspect = (bytes) => inspectJpeg(bytes, controls);

async function fixture({ width = 24, height = 16, channels = 3, progressive = false } = {}) {
  return sharp({ create: { width, height, channels, background: channels === 1 ? '#777777' : '#337799' } })
    .jpeg({ progressive, quality: 85 }).toBuffer();
}

test('approved product limits are exact and independent of probe controls', () => {
  assert.deepEqual(APPROVED, {
    maxEncodedBytes: 33_554_432, maxWidth: 9_000, maxHeight: 9_000,
    maxDecodedPixels: 50_000_000, maxMetadataBytes: 262_144,
  });
});

test('baseline and progressive synthetic JPEGs parse', async () => {
  for (const progressive of [false, true]) {
    const info = inspect(await fixture({ progressive }));
    assert.equal(info.width, 24);
    assert.equal(info.height, 16);
    assert.equal(info.progressive, progressive);
    assert.ok(info.scans >= 1);
  }
});

test('single EOI, trailing bytes and concatenation', async () => {
  const valid = await fixture();
  assert.throws(() => inspect(valid.subarray(0, valid.length - 2)), /missing EOI|truncated/);
  assert.throws(() => inspect(Buffer.concat([valid, Buffer.from('x')])), /trailing bytes/);
  assert.throws(() => inspect(Buffer.concat([valid, valid])), /trailing bytes/);
  assert.throws(() => inspect(Buffer.from([0xff, 0xd8, 0xff, 0xd9])), /EOI before image/);
});

test('malformed length, unsupported coding and finite parser budgets', async () => {
  const valid = await fixture();
  const badLength = Buffer.from(valid);
  badLength[4] = 0;
  badLength[5] = 1;
  assert.throws(() => inspect(badLength), /malformed segment length/);
  assert.throws(() => inspectJpeg(valid, { ...controls, maxSegmentCount: 1 }), /segment count exceeded/);
  const progressive = await fixture({ progressive: true });
  assert.throws(() => inspectJpeg(progressive, { ...controls, maxProgressiveScans: 1 }), /scan count exceeded/);
});

test('metadata is aggregate across APP and COM payloads', async () => {
  const valid = await fixture();
  const segment = (marker, n) => Buffer.concat([Buffer.from([0xff, marker, (n + 2) >> 8, (n + 2) & 255]), Buffer.alloc(n)]);
  const body = Buffer.concat([valid.subarray(0, 2), segment(0xe2, 65_000), segment(0xfe, 65_000), segment(0xe3, 65_000), segment(0xe4, 65_000), valid.subarray(2)]);
  assert.equal(inspect(body).metadataBytes >= 260_000, true);
  const excessive = Buffer.concat([valid.subarray(0, 2), segment(0xe2, 65_000), segment(0xe3, 65_000), segment(0xe4, 65_000), segment(0xe5, 65_000), segment(0xfe, 2_145), valid.subarray(2)]);
  assert.throws(() => inspect(excessive), /metadata bytes exceeded/);
});

test('cancelled signal and encoded-size overflow fail early', async () => {
  const controller = new AbortController();
  controller.abort();
  const valid = await fixture();
  assert.throws(() => inspectJpeg(valid, { ...controls, signal: controller.signal }), /aborted/);
  assert.throws(() => inspect(Buffer.alloc(APPROVED.maxEncodedBytes + 1)), /encoded bytes exceeded/);
});

test('axis and pixel limits are enforced without decoder allocation', async () => {
  const valid = await fixture();
  const sof = valid.indexOf(Buffer.from([0xff, 0xc0]));
  assert.ok(sof > 0);
  const withDimensions = (width, height) => {
    const copy = Buffer.from(valid);
    copy.writeUInt16BE(height, sof + 5);
    copy.writeUInt16BE(width, sof + 7);
    return copy;
  };
  assert.equal(inspect(withDimensions(9_000, 5_555)).pixels, 49_995_000);
  assert.throws(() => inspect(withDimensions(9_001, 5_555)), /dimensions exceeded/);
  assert.throws(() => inspect(withDimensions(5_555, 9_001)), /dimensions exceeded/);
  assert.equal(inspect(withDimensions(8_000, 6_250)).pixels, 50_000_000);
  assert.throws(() => inspect(withDimensions(8_000, 6_251)), /dimensions exceeded/);
});

test('bounded mutation sweep terminates without crash or hang', async () => {
  const valid = await fixture({ progressive: true });
  let accepted = 0;
  for (let index = 0; index < 1_000; index++) {
    const copy = Buffer.from(valid);
    const offset = 2 + ((index * 7919) % (copy.length - 4));
    copy[offset] ^= (index % 255) + 1;
    try { inspect(copy); accepted++; } catch (error) { assert.ok(error instanceof Error); }
  }
  assert.ok(accepted >= 0 && accepted <= 1_000);
});
