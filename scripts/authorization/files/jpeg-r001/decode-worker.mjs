// Non-production decoder probe. Receives only a run-owned local fixture path.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { performance } from 'node:perf_hooks';
import { inspectJpeg } from './inspect.mjs';

const requireFromNext = createRequire(createRequire(import.meta.url).resolve('next/package.json'));
const sharp = requireFromNext('sharp');
const path = process.argv[2];
const controls = JSON.parse(process.argv[3] || '{}');
const started = performance.now();
const cpuStarted = process.cpuUsage();
let peakRss = process.memoryUsage().rss;
const sampler = setInterval(() => { peakRss = Math.max(peakRss, process.memoryUsage().rss); }, 5);

try {
  const bytes = readFileSync(path);
  process.send?.({ stage: 'inspect-start' });
  const structure = inspectJpeg(bytes, controls);
  // stats() must read pixels, unlike metadata(). Its completeness and warning
  // semantics remain an adversarial test claim, not an assumed guarantee.
  const image = sharp(bytes, {
    failOn: 'warning', limitInputPixels: 50_000_000,
    limitInputChannels: 3, unlimited: false, autoOrient: false, ignoreIcc: true,
  });
  const metadata = await image.metadata();
  if (metadata.format !== 'jpeg' || metadata.width !== structure.width || metadata.height !== structure.height) throw new Error('decoder header mismatch');
  process.send?.({ stage: 'decode-start' });
  const stats = await image.stats();
  if (!stats.channels.length) throw new Error('no decoded channels');
  const cpu = process.cpuUsage(cpuStarted);
  clearInterval(sampler);
  process.stdout.write(JSON.stringify({ ok: true, structure, wallMs: Math.round(performance.now() - started), cpuMs: Math.round((cpu.user + cpu.system) / 1000), peakRss, sharp: sharp.versions.sharp, vips: sharp.versions.vips }) + '\n');
} catch (error) {
  clearInterval(sampler);
  const cpu = process.cpuUsage(cpuStarted);
  process.stdout.write(JSON.stringify({ ok: false, reason: error instanceof Error ? error.message : 'unknown', wallMs: Math.round(performance.now() - started), cpuMs: Math.round((cpu.user + cpu.system) / 1000), peakRss }) + '\n');
  process.exitCode = 1;
}
