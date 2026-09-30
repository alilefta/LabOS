// Controlled synthetic/public-fixture probe; never reads clinical/provider data.
import { createRequire } from 'node:module';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';

const requireFromNext = createRequire(createRequire(import.meta.url).resolve('next/package.json'));
const sharp = requireFromNext('sharp');
const controls = { maxSegmentCount: 512, maxProgressiveScans: 64 }; // Probe values, NOT R001 policy.

async function probe(path, timeoutMs = 30_000, killOnStage = null) {
  const started = performance.now();
  const child = spawn(process.execPath, [fileURLToPath(new URL('./decode-worker.mjs', import.meta.url)), path, JSON.stringify(controls)], { stdio: ['ignore', 'pipe', 'pipe', 'ipc'] });
  let output = '';
  let error = '';
  let reachedStage = null;
  let killRequestedAt = null;
  let killReturned = null;
  child.stdout.on('data', (chunk) => { output += chunk; });
  child.stderr.on('data', (chunk) => { error += chunk; });
  child.on('message', (message) => {
    reachedStage = message.stage;
    if (killOnStage === message.stage) {
      killRequestedAt = message.stage;
      killReturned = child.kill('SIGTERM');
    }
  });
  let timedOut = false;
  const timer = setTimeout(() => { timedOut = true; killReturned = child.kill('SIGTERM'); }, timeoutMs);
  const disposition = await new Promise((resolve) => child.on('exit', (code, signal) => resolve({ code, signal })));
  clearTimeout(timer);
  return { ...disposition, timedOut, reachedStage, killRequestedAt, killReturned, outerWallMs: Math.round(performance.now() - started), result: output.trim() ? JSON.parse(output.trim()) : null, stderr: error.trim().slice(0, 120) };
}

const directory = await mkdtemp(join(tmpdir(), 'labos-jpeg-r001-'));
const records = [];
try {
  const examples = [
    { id: 'baseline-small', width: 640, height: 480, progressive: false },
    { id: 'progressive-small', width: 640, height: 480, progressive: true },
    { id: 'landscape-near-50mp', width: 9000, height: 5555, progressive: false },
    { id: 'portrait-near-50mp', width: 5555, height: 9000, progressive: true },
    { id: 'grayscale', width: 1000, height: 1000, progressive: false, grayscale: true },
  ];
  for (const item of examples) {
    const path = join(directory, `${item.id}.jpg`);
    const source = item.grayscale
      ? sharp(Buffer.alloc(item.width * item.height, 127), { raw: { width: item.width, height: item.height, channels: 1 } })
      : sharp({ create: { width: item.width, height: item.height, channels: 3, background: '#5a7192' } });
    if (item.grayscale) source.greyscale();
    const bytes = await source.jpeg({ quality: 90, progressive: item.progressive }).toBuffer();
    await writeFile(path, bytes);
    records.push({ id: item.id, provenance: 'run-generated uniform synthetic', encodedBytes: bytes.length, width: item.width, height: item.height, ...await probe(path) });
  }
  const randomPath = join(directory, 'high-entropy.jpg');
  const random = randomBytes(2048 * 2048 * 3);
  const highEntropy = await sharp(random, { raw: { width: 2048, height: 2048, channels: 3 } }).jpeg({ quality: 95 }).toBuffer();
  await writeFile(randomPath, highEntropy);
  records.push({ id: 'high-entropy', provenance: 'run-generated cryptographic random pixels', encodedBytes: highEntropy.length, width: 2048, height: 2048, ...await probe(randomPath) });
  const app = (marker, count) => Buffer.concat([Buffer.from([0xff, marker, (count + 2) >> 8, (count + 2) & 255]), Buffer.alloc(count)]);
  const seed = await (await import('node:fs/promises')).readFile(join(directory, 'baseline-small.jpg'));
  const metadata = Buffer.concat([seed.subarray(0, 2), app(0xe2, 65_000), app(0xe3, 65_000), app(0xe4, 65_000), app(0xfe, 65_000), app(0xe5, 2_144), seed.subarray(2)]);
  const metadataPath = join(directory, 'metadata-exact.jpg');
  await writeFile(metadataPath, metadata);
  records.push({ id: 'metadata-exact', provenance: 'run-generated APP/COM segments', encodedBytes: metadata.length, ...await probe(metadataPath) });
  const excessive = Buffer.concat([seed.subarray(0, 2), app(0xe2, 65_000), app(0xe3, 65_000), app(0xe4, 65_000), app(0xfe, 65_000), app(0xe5, 2_145), seed.subarray(2)]);
  const excessPath = join(directory, 'metadata-plus-one.jpg');
  await writeFile(excessPath, excessive);
  records.push({ id: 'metadata-plus-one', provenance: 'run-generated APP/COM segments', encodedBytes: excessive.length, ...await probe(excessPath) });
  const validPath = join(directory, 'baseline-small.jpg');
  const valid = await (await import('node:fs/promises')).readFile(validPath);
  for (const [id, bytes] of [
    ['truncated-tail', valid.subarray(0, valid.length - 12)],
    ['shortened-entropy-with-eoi', Buffer.concat([valid.subarray(0, valid.length - 80), valid.subarray(valid.length - 2)])],
    ['trailing', Buffer.concat([valid, Buffer.from('payload')])],
    ['concatenated', Buffer.concat([valid, valid])],
  ]) {
    const path = join(directory, `${id}.jpg`);
    await writeFile(path, bytes);
    records.push({ id, provenance: 'run-mutated synthetic', encodedBytes: bytes.length, ...await probe(path) });
  }
  // A one-millisecond kill demonstrates parent-controlled process termination,
  // but not reliable cancellation during a particular native decode stage.
  for (const [id, path, stage] of [
    ['forced-inspection-termination', randomPath, 'inspect-start'],
    ['forced-decode-termination', join(directory, 'landscape-near-50mp.jpg'), 'decode-start'],
  ]) {
    const result = await probe(path, 30_000, stage);
    if (!result.killReturned || result.killRequestedAt !== stage || result.signal !== 'SIGTERM' || result.result !== null || result.timedOut) throw new Error(`unverified ${id}`);
    records.push({ id, provenance: 'run-owned synthetic fixture', ...result });
  }
  let active = 0;
  let peakActive = 0;
  const queueLimit = 2;
  const request = async () => {
    if (active >= queueLimit) return { rejected: true, reason: 'probe capacity' };
    active++;
    peakActive = Math.max(peakActive, active);
    try { return await probe(randomPath); } finally { active--; }
  };
  const results = await Promise.all([request(), request(), request()]);
  records.push({ id: 'bounded-concurrency', provenance: 'run-owned high-entropy fixture', queueLimit, peakActive, results });
} finally {
  await rm(directory, { recursive: true, force: true });
}
process.stdout.write(JSON.stringify({ probeControlsNotPolicy: controls, records, cleanup: 'run temp directory removed' }, null, 2) + '\n');
