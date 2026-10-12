import { spawnSync } from 'node:child_process'

const executable = process.argv[2]
if (!executable) throw new Error('run-owned containment test executable required')
const parent = spawnSync(process.execPath, ['-e', `
const {spawn}=require('node:child_process');
const child=spawn(process.argv[1],[String(process.pid),'--wait'],
  {stdio:['ignore','pipe','ignore'],detached:true,windowsHide:true});
child.stdout.once('data',chunk=>{
  if(chunk.toString().trim()!=='READY')process.exit(3);
  process.stdout.write(String(child.pid));
  process.exit(0);
});
setTimeout(()=>process.exit(4),3000);
`, executable], { encoding: 'utf8', timeout: 5_000 })
if (parent.status !== 0 || !/^\d+$/.test(parent.stdout)) throw new Error('parent harness failed')
const childPid = Number(parent.stdout)
const alive = () => { try { process.kill(childPid, 0); return true } catch { return false } }
let stopped = !alive()
for (let i = 0; i < 30 && !stopped; i++) {
  await new Promise(resolve => setTimeout(resolve, 100))
  stopped = !alive()
}
if (!stopped) {
  try { process.kill(childPid) } catch { /* already exited */ }
  throw new Error('orphan watcher did not terminate exact run-owned child')
}
console.log(JSON.stringify({ childStarted: true, parentExited: true, childTerminatedWithinMs: 3_000 }))
