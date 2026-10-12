import { createRequire } from 'node:module';
import { randomBytes } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
const [run, repo] = process.argv.slice(2);
const req = createRequire(join(repo, 'package.json'));
const sharp = createRequire(req.resolve('next/package.json'))('sharp');
const { inspectJpeg } = await import(pathToFileURL(join(repo, 'scripts/authorization/files/jpeg-r001/inspect.mjs')));
const limits = { maxSegmentCount: 512, maxProgressiveScans: 128 };
const entries = [];
async function add(id, bytes, provenance) {
  const path = join(run, id + '.jpg');
  await writeFile(path, bytes);
  let inspection;
  try { inspection = { status: 'ACCEPT', ...inspectJpeg(bytes, limits) }; }
  catch (e) { inspection = { status: 'REJECT', reason: e.message }; }
  entries.push({ id, path, encodedBytes: bytes.length, provenance, inspection });
}
async function photo(id, width, height, progressive = false, quality = 85) {
  const bytes = await sharp({ create: { width, height, channels: 3, background: '#5a7192' } }).jpeg({ progressive, quality }).toBuffer();
  await add(id, bytes, 'run-generated uniform RGB');
  return bytes;
}
const baseline = await photo('baseline-small', 640, 480);
const progressive = await photo('progressive-small', 640, 480, true);
const pgm = Buffer.concat([Buffer.from('P5\n1000 1000\n255\n'), Buffer.alloc(1_000_000, 127)]);
const cjpeg = spawnSync(join(run,'extracted/bin/cjpeg.exe'), ['-grayscale'], { input: pgm, maxBuffer: 8_000_000 });
if (cjpeg.status !== 0) throw new Error('cjpeg grayscale generation failed');
await add('grayscale', cjpeg.stdout, 'run-generated PGM through pinned cjpeg');
await photo('near-50mp-baseline', 9000, 5555);
await photo('near-50mp-progressive', 5555, 9000, true);
const entropyPixels = randomBytes(5000*5000*3);
const entropy = await sharp(entropyPixels, { raw: { width: 5000, height: 5000, channels: 3 } }).jpeg({ quality: 85, progressive: true }).toBuffer();
await add('entropy-progressive-25mp', entropy, 'run-generated cryptographic random RGB; bounded 75MB raw');
const near32Pixels = randomBytes(6000*6000*3);
for (const quality of [85,90,95]) {
  const bytes = await sharp(near32Pixels, { raw: { width: 6000, height: 6000, channels: 3 } }).jpeg({ quality }).toBuffer();
  if (bytes.length <= 33_554_432) await add('near-32mib-q'+quality, bytes, 'run-generated cryptographic random RGB; bounded 108MB raw');
  else entries.push({ id:'near-32mib-q'+quality, encodedBytes:bytes.length, provenance:'generation exceeded R001 ceiling; not retained', inspection:{status:'REJECT',reason:'encoded bytes exceeded'} });
}
function segment(marker, n) { return Buffer.concat([Buffer.from([255,marker,(n+2)>>8,(n+2)&255]),Buffer.alloc(n)]); }
function prepend(parts) { return Buffer.concat([baseline.subarray(0,2),...parts,baseline.subarray(2)]); }
await add('metadata-262144', prepend([65533,65533,65533,65533,12].map(n=>segment(0xfe,n))), 'run-generated COM payload equality');
const originalSegments = inspectJpeg(baseline,limits).segments;
await add('segments-512', prepend(Array.from({length:512-originalSegments},()=>segment(0xfe,0))), 'run-generated COM structural segment equality');
await add('missing-eoi', baseline.subarray(0,-2), 'run-mutated synthetic');
const sos = baseline.indexOf(Buffer.from([255,218]));
const start = sos+2+baseline.readUInt16BE(sos+2);
const cut = start+Math.floor((baseline.length-2-start)/2);
await add('shortened-entropy-eoi', Buffer.concat([baseline.subarray(0,cut),baseline.subarray(-2)]), 'run-mutated synthetic');
const malformed=Buffer.from(progressive);
const psos=progressive.indexOf(Buffer.from([255,218]));
const components=progressive[psos+4];
malformed[psos+4+1+2*components+1]=63;
await add('malformed-progressive', malformed, 'run-mutated synthetic');
await writeFile(join(run,'fixture-manifest.json'), JSON.stringify({limits,entries},null,2));
console.log(JSON.stringify({count:entries.length, ids:entries.map(e=>({id:e.id,encodedBytes:e.encodedBytes,inspection:e.inspection.status}))}));
