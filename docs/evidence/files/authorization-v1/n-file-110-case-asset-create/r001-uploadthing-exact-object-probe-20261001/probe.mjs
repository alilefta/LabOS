import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { lookup } from 'node:dns/promises';
import { request } from 'node:https';
import { isIP } from 'node:net';
const [run, repo] = process.argv.slice(2);
const require = createRequire(join(repo, 'package.json'));
require('dotenv').config({ path: join(repo, '.env.local'), quiet: true });
const hash = x => createHash('sha256').update(x).digest('hex');
const manifest = JSON.parse(await readFile(join(run, 'private-manifest.json'), 'utf8'));
const token = process.env.UPLOADTHING_DEVELOPMENT_TOKEN;
if (manifest.state !== 'created' || !manifest.providerKey || hash(token).slice(0, 12) !== '979e35aca2f2') throw new Error('run or target mismatch');
const claims = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
if (hash(claims.appId).slice(0, 12) !== '2e77ac21b101') throw new Error('app mismatch');
const { UTApi } = require('uploadthing/server');
const api = new UTApi({ token, logLevel: 'Error' });
function publicIp(x) {
  const family = isIP(x);
  if (family === 4) {
    const [a,b,c] = x.split('.').map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 168 || a === 100 && b >= 64 && b <= 127 || a === 192 && b === 0 && c === 0 || a === 192 && b === 0 && c === 2 || a === 198 && b >= 18 && b <= 19 || a === 198 && b === 51 && c === 100 || a === 203 && b === 0 && c === 113);
  }
  if (family === 6) return /^[23]/i.test(x) && !/^2001:db8:/i.test(x);
  return false;
}
function download(url, ip) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const done = (error, value) => { if (!settled) { settled = true; error ? reject(error) : resolve(value); } };
    const req = request(url, { method: 'GET', headers: { 'Accept-Encoding': 'identity' }, timeout: 15000, lookup: (_host, opts, cb) => opts.all ? cb(null, [ip]) : cb(null, ip.address, ip.family) }, res => {
      const h = res.headers;
      const selected = Object.fromEntries(['content-length','content-type','content-encoding','cache-control','etag','last-modified','location','accept-ranges'].map(k => [k, h[k] ?? null]));
      if (selected.etag) selected.etag = { present: true, sha256Prefix: hash(String(selected.etag)).slice(0,12) };
      if (selected.location) { try { const dest = new URL(selected.location, url); selected.location = { origin: dest.origin, pathShape: dest.pathname.replaceAll(manifest.providerKey, '{key}') }; } catch { selected.location = { malformed: true }; } }
      const chunks=[]; let size=0;
      res.on('data', chunk => { size += chunk.length; if (size > 33554432) { req.destroy(new Error('encoded ceiling exceeded')); return; } chunks.push(chunk); });
      res.on('end', () => done(null, { status: res.statusCode, headers: selected, bytes: size, sha256: hash(Buffer.concat(chunks)), matchesSource: size === manifest.sourceBytes && hash(Buffer.concat(chunks)) === manifest.sourceSha256 }));
      res.on('error', e => done(e));
    });
    req.on('timeout', () => req.destroy(new Error('request timeout')));
    req.on('error', e => done(e));
    req.end();
  });
}
const observations=[];
for (let i=0;i<3;i++) {
  const lookupResult = await api.getFileUrls(manifest.providerKey, { keyType: 'fileKey' });
  const rows = lookupResult.data ?? [];
  if (lookupResult.error || rows.length !== 1 || rows[0].key !== manifest.providerKey) throw new Error('lookup cardinality or key mismatch');
  const raw = rows[0].url;
  const u = new URL(raw);
  const urlShape = { scheme:u.protocol,origin:u.origin,hostname:u.hostname,port:u.port||null,usernamePresent:!!u.username,passwordPresent:!!u.password,pathShape:u.pathname.replaceAll(manifest.providerKey,'{key}'),pathContainsExactKey:u.pathname.includes(manifest.providerKey),pathEndsExactKey:u.pathname.endsWith(manifest.providerKey),queryPresent:!!u.search,queryNames:[...u.searchParams.keys()],fragmentPresent:!!u.hash,urlSha256Prefix:hash(raw).slice(0,12) };
  if (u.protocol !== 'https:' || u.username || u.password || u.port || u.hash || !/^(?:[a-z0-9-]+\.)?(?:ufs\.sh|utfs\.io)$/i.test(u.hostname)) throw new Error('unexpected provider destination');
  const answers = await lookup(u.hostname, { all: true });
  if (!answers.length || answers.some(x => !publicIp(x.address))) throw new Error('non-public DNS answer');
  const chosen = answers.find(x => x.family === 4) ?? answers[0];
  const got = await download(u, chosen);
  observations.push({ index:i+1, cardinality:rows.length,returnedKeyExact:true,url:urlShape,dns:answers,chosenIp:chosen,download:got });
}
const out = { run:manifest.run, sourceBytes:manifest.sourceBytes, sourceSha256:manifest.sourceSha256, keyFingerprint:manifest.providerKeyFingerprint, observations };
await writeFile(join(run,'probe-results.json'),JSON.stringify(out,null,2));
console.log(JSON.stringify(out));

