import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import dotenv from 'dotenv';

const operation = process.argv[2];
if (!['prepare', 'status-pre', 'deploy', 'status-post', 'diff', 'cleanup'].includes(operation)) throw new Error('unsupported operation');
dotenv.config({ path: '.env', quiet: true });
const root = process.cwd();
const evidence = path.join(root, 'docs/evidence/files/authorization-v1/n-file-110-case-asset-create/s001-normal-development-20261003');
const identityFile = path.join(evidence, 'execution-identity.json');
const preflightFile = path.join(evidence, 'preflight.json');
const candidate = '20261002120000_case_s001_evidence_identity';
const candidateHash = 'c322412de3c40f697407ce74a062afb797b2554a98fa5e8393e1c4bfe8c8bb88';
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const rawUrl = process.env.DIRECT_URL;
if (!rawUrl) throw new Error('DIRECT_URL absent');
const url = new URL(rawUrl);
if (sha(url.hostname).slice(0, 12) !== 'eb0d823953fe' || Number(url.port || 5432) !== 5432 || url.pathname !== '/postgres' || (url.searchParams.get('schema') || 'public') !== 'public') throw new Error('not the established development target');
const pre = JSON.parse(fs.readFileSync(preflightFile, 'utf8'));
if (pre.status !== 'PASS' || pre.ledger.count !== 50 || pre.ledger.candidateRows !== 0 || pre.data.s001Count !== 0 || pre.source.candidate.rawSha256 !== candidateHash) throw new Error('preflight not accepted');

const sourceRoot = path.join(root, 'prisma/migrations');
for (const x of pre.source.manifest) {
  const raw = fs.readFileSync(path.join(sourceRoot, x.name, 'migration.sql'));
  if (sha(raw) !== x.rawSha256 || sha(Buffer.from(raw.toString('utf8').replace(/\r\n/g, '\n'))) !== x.canonicalLfSha256) throw new Error(`source migration changed: ${x.name}`);
}
let identity;
if (operation === 'prepare') {
  if (fs.existsSync(identityFile)) throw new Error('execution already prepared');
  const runName = `s001-normal-dev-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto.randomBytes(4).toString('hex')}`;
  const runRoot = path.resolve(root, 'experiments', runName);
  if (!runRoot.startsWith(path.resolve(root, 'experiments') + path.sep) || fs.existsSync(runRoot)) throw new Error('unsafe run root');
  const migrationRoot = path.join(runRoot, 'migrations');
  fs.mkdirSync(migrationRoot, { recursive: true });
  for (const x of pre.source.manifest) {
    const destination = path.join(migrationRoot, x.name);
    fs.mkdirSync(destination);
    const raw = fs.readFileSync(path.join(sourceRoot, x.name, 'migration.sql'));
    const lf = Buffer.from(raw.toString('utf8').replace(/\r\n/g, '\n'));
    if (sha(lf) !== x.canonicalLfSha256) throw new Error('canonical LF mismatch');
    fs.writeFileSync(path.join(destination, 'migration.sql'), lf);
  }
  fs.copyFileSync(path.join(sourceRoot, 'migration_lock.toml'), path.join(migrationRoot, 'migration_lock.toml'));
  const config = path.join(runRoot, 'prisma.config.ts');
  fs.writeFileSync(config, `import { defineConfig } from 'prisma/config';\nexport default defineConfig({schema:${JSON.stringify(path.join(root, 'prisma/schema.prisma').replaceAll('\\', '/'))},migrations:{path:${JSON.stringify(migrationRoot.replaceAll('\\', '/'))}},datasource:{url:process.env.DIRECT_URL!}});\n`);
  identity = { runRoot, migrationRoot, config, runName, candidate, candidateHash, canonicalLfFiles: pre.source.manifest.length, createdAt: new Date().toISOString() };
  fs.writeFileSync(identityFile, JSON.stringify(identity, null, 2) + '\n');
  process.stdout.write(JSON.stringify(identity) + '\n');
  process.exit(0);
}
identity = JSON.parse(fs.readFileSync(identityFile, 'utf8'));
const intended = path.resolve(root, 'experiments', identity.runName);
if (path.resolve(identity.runRoot) !== intended || !intended.startsWith(path.resolve(root, 'experiments') + path.sep)) throw new Error('unsafe execution identity');
for (const x of pre.source.manifest) if (sha(fs.readFileSync(path.join(identity.migrationRoot, x.name, 'migration.sql'))) !== x.canonicalLfSha256) throw new Error(`execution migration changed: ${x.name}`);
if (sha(fs.readFileSync(path.join(identity.migrationRoot, candidate, 'migration.sql'))) !== candidateHash) throw new Error('execution candidate hash mismatch');
if (operation === 'cleanup') {
  fs.rmSync(intended, { recursive: true });
  const result = { runRoot: intended, absent: !fs.existsSync(intended), at: new Date().toISOString(), canonicalCandidateSha256: sha(fs.readFileSync(path.join(sourceRoot, candidate, 'migration.sql'))) };
  fs.writeFileSync(path.join(evidence, 'execution-cleanup.json'), JSON.stringify(result, null, 2) + '\n');
  process.stdout.write(JSON.stringify(result) + '\n');
  process.exit(result.absent ? 0 : 1);
}
if (operation === 'deploy') {
  const priorStatus = JSON.parse(fs.readFileSync(path.join(evidence, 'prisma-status-pre.json'), 'utf8'));
  if (priorStatus.exitCode !== 1 || !priorStatus.stdout.includes(candidate) || priorStatus.stdout.includes('failed migration')) throw new Error('expected single pending migration not established');
}
const args = ['node_modules/prisma/build/index.js', 'migrate', operation === 'diff' ? 'diff' : operation.startsWith('status') ? 'status' : 'deploy'];
if (operation === 'diff') args.push('--from-config-datasource', '--to-schema', 'prisma/schema.prisma', '--exit-code');
args.push('--config', identity.config);
const child = spawnSync(process.execPath, args, { cwd: root, env: { ...process.env, DIRECT_URL: rawUrl }, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, timeout: 120000 });
const sanitize = value => String(value || '').replaceAll(rawUrl, '[REDACTED_URL]').replaceAll(url.hostname, '[development-host]').replaceAll(decodeURIComponent(url.username), '[REDACTED_USER]').replaceAll(decodeURIComponent(url.password), '[REDACTED_PASSWORD]');
const result = { operation, at: new Date().toISOString(), exitCode: child.status, signal: child.signal, stdout: sanitize(child.stdout), stderr: sanitize(child.stderr), candidate, candidateHash, canonicalLfFiles: pre.source.manifest.length };
const resultName = operation === 'status-pre' ? 'prisma-status-pre.json' : operation === 'status-post' ? 'prisma-status-post.json' : `prisma-${operation}.json`;
fs.writeFileSync(path.join(evidence, resultName), JSON.stringify(result, null, 2) + '\n');
process.stdout.write(JSON.stringify({ operation, exitCode: result.exitCode, stdout: result.stdout.slice(-2500), stderr: result.stderr.slice(-1000) }) + '\n');
if (operation === 'status-pre') {
  if (child.status !== 1 || !result.stdout.includes(candidate)) process.exitCode = 1;
} else if (child.status !== 0) process.exitCode = 1;
