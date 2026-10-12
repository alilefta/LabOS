import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import {readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
const [run,repo]=process.argv.slice(2);
const require=createRequire(join(repo,'package.json'));
require('dotenv').config({path:join(repo,'.env.local'),quiet:true});
const hash=x=>createHash('sha256').update(x).digest('hex');
const m=JSON.parse(await readFile(join(run,'private-manifest.json'),'utf8'));
const token=process.env.UPLOADTHING_DEVELOPMENT_TOKEN;
if(m.state!=='created'||!m.providerKey||hash(token).slice(0,12)!=='979e35aca2f2'||hash(m.providerKey).slice(0,16)!==m.providerKeyFingerprint)throw new Error('run identity mismatch');
const claims=JSON.parse(Buffer.from(token,'base64url').toString('utf8'));
if(hash(claims.appId).slice(0,12)!=='2e77ac21b101')throw new Error('app mismatch');
const {UTApi}=require('uploadthing/server');
const api=new UTApi({token,logLevel:'Error'});
async function listed(){const r=await api.listFiles({limit:100});if(!Array.isArray(r.files)||r.hasMore)throw new Error('listing incomplete');return {count:r.files.length,exactKeyPresent:r.files.some(x=>x.key===m.providerKey),runNamePresent:r.files.some(x=>x.name===m.filename)};}
const before=await listed();
if(!before.exactKeyPresent||!before.runNamePresent)throw new Error('run object not observed before deletion');
const deleted=await api.deleteFiles(m.providerKey,{keyType:'fileKey'});
if(deleted.error)throw new Error('provider deletion rejected');
let after=await listed();
for(let i=0;i<3&&(after.exactKeyPresent||after.runNamePresent);i++){await new Promise(r=>setTimeout(r,1500));after=await listed();}
const result={run:m.run,keyFingerprint:m.providerKeyFingerprint,before,deleteAcknowledged:true,after,cleanupVerified:!after.exactKeyPresent&&!after.runNamePresent};
await writeFile(join(run,'cleanup.json'),JSON.stringify(result,null,2));
m.state=result.cleanupVerified?'deleted_verified':'delete_acknowledged_not_verified';m.deletedAtUtc=new Date().toISOString();await writeFile(join(run,'private-manifest.json'),JSON.stringify(m,null,2));
console.log(JSON.stringify(result));
if(!result.cleanupVerified)process.exitCode=2;


