import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
const repo=process.argv[2];
const require=createRequire(join(repo,'package.json'));
require('dotenv').config({path:join(repo,'.env.local'),quiet:true});
const token=process.env.UPLOADTHING_DEVELOPMENT_TOKEN;
if(!token)throw new Error('development token missing');
function fp(s){return createHash('sha256').update(s).digest('hex').slice(0,12)}
let decoded=null;
for(const part of [token,token.split('.')[1]]){if(!part)continue;try{const v=JSON.parse(Buffer.from(part,'base64url').toString('utf8'));if(v&&typeof v==='object'){decoded=v;break}}catch{}}
const appId=decoded?.appId??decoded?.app_id??decoded?.appID;
const {UTApi}=require('uploadthing/server');
const api=new UTApi({token,logLevel:'Error'});
try{
 const [listed,usage]=await Promise.all([api.listFiles({limit:1,offset:0}),api.getUsageInfo()]);
 console.log(JSON.stringify({kind:'read_only_preflight',tokenFingerprint:fp(token),appIdFingerprint:typeof appId==='string'?fp(appId):null,decodedClaimNames:decoded?Object.keys(decoded).sort():[],listFilesOk:Array.isArray(listed.files),listHasMore:listed.hasMore,usageFilesUploaded:usage.filesUploaded,usageLimitBytes:usage.limitBytes,uploadthingVersion:require('uploadthing/package.json').version}));
}catch(e){console.log(JSON.stringify({kind:'read_only_preflight',tokenFingerprint:fp(token),appIdFingerprint:typeof appId==='string'?fp(appId):null,errorClass:e?.constructor?.name??'Unknown'}));process.exitCode=2}

