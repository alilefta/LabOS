import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { basename, join, resolve, sep } from 'node:path'
import { describe, expect, it } from 'vitest'
import { acquireNativeSlot, decodeR001WithNative, verifyR001HelperIdentity } from '@/modules/labos-files/jpeg-r001/native'
import { inspectR001 } from '@/modules/labos-files/jpeg-r001/inspect'

const exe=resolve(process.cwd(),'native/bin/win32-x64/r001-codec.exe')
const manifest=JSON.parse(readFileSync(resolve(process.cwd(),'native/bin/win32-x64/r001-codec.manifest.json'),'utf8')) as {executableSha256:string;sourceSha256:string;protocol:string}
const fromNext=createRequire(createRequire(import.meta.url).resolve('next/package.json'))
const sharp=fromNext('sharp') as (input: unknown) => { jpeg: (options?: { progressive?: boolean; quality?: number }) => { toBuffer: () => Promise<Buffer> } }
const source=readFileSync(resolve(process.cwd(),'docs/evidence/files/authorization-v1/n-file-110-case-asset-create/r001-uploadthing-exact-object-probe-20261001/synthetic-source.jpg'))
const grayscale=readFileSync(new URL('./grayscale.jpg',import.meta.url))
const frame=(bytes:Buffer)=>{const header=Buffer.alloc(8);header.write('LJ01',0,'ascii');header.writeUInt32LE(bytes.length,4);return Buffer.concat([header,bytes])}

describe('production Windows x64 native helper',()=>{
 it('has the pinned build identity',()=>{
  expect(manifest.protocol).toBe('LJ01')
  expect(createHash('sha256').update(readFileSync(exe)).digest('hex')).toBe(manifest.executableSha256)
  expect(createHash('sha256').update(readFileSync('native/r001/codec.c')).digest('hex')).toBe(manifest.sourceSha256)
 })
 it('fully decodes baseline, progressive and grayscale using the built helper',async()=>{
  const progressive=await sharp({create:{width:24,height:16,channels:3,background:'#337799'}}).jpeg({progressive:true}).toBuffer()
  for(const bytes of [source,progressive,grayscale]) await expect(decodeR001WithNative(bytes,inspectR001(bytes))).resolves.toBeUndefined()
 })
 it('fails closed on malformed frames, invalid parent and malformed JPEG',()=>{
  for(const input of [Buffer.alloc(0),Buffer.from('LJ01'),Buffer.concat([Buffer.from('BAD!'),Buffer.alloc(4),source]),frame(source).subarray(0,15),frame(Buffer.from([255,216,255,217]))]){
   const result=spawnSync(exe,[String(process.pid)],{input,encoding:'utf8',timeout:10000})
   expect(result.status).not.toBe(0);expect(result.stderr).toBe('')
  }
  const wrongParent=spawnSync(exe,['0'],{input:frame(source),encoding:'utf8',timeout:10000})
  expect(wrongParent.status).not.toBe(0)
  expect(wrongParent.stdout).toBe('')
 })
 it('caps active helpers and queued identifiers, cancels a waiter and releases slots',async()=>{
  const release1=await acquireNativeSlot('one');const release2=await acquireNativeSlot('two')
  const cancelled=new AbortController()
  const q1=acquireNativeSlot('three',cancelled.signal)
  const q2=acquireNativeSlot('four')
  await expect(acquireNativeSlot('five')).rejects.toThrow('Clinical JPEG unavailable')
  cancelled.abort();await expect(q1).rejects.toThrow('Clinical JPEG unavailable')
  release1();const release3=await q2;release3();release2()
 })
 it('treats codec warnings and malformed progressive scans as fatal',async()=>{
  const baseline=await sharp({create:{width:128,height:128,channels:3,background:'#337799'}}).jpeg({quality:85}).toBuffer()
  const sos=baseline.indexOf(Buffer.from([255,218]));const start=sos+2+baseline.readUInt16BE(sos+2)
  const cut=start+Math.floor((baseline.length-2-start)/2)
  const shortened=Buffer.concat([baseline.subarray(0,cut),baseline.subarray(-2)])
  expect(inspectR001(shortened).width).toBe(128)
  const warning=spawnSync(exe,[String(process.pid)],{input:frame(shortened),encoding:'utf8',timeout:10000})
  expect(warning.status).toBe(3);expect(warning.stdout).toBe('');expect(warning.stderr).toBe('')
  const progressive=await sharp({create:{width:24,height:16,channels:3,background:'#337799'}}).jpeg({progressive:true}).toBuffer()
  const scan=progressive.indexOf(Buffer.from([255,218]));const count=progressive[scan+4]
  const malformed=Buffer.from(progressive);malformed[scan+4+1+2*count+1]=63
  expect(inspectR001(malformed).progressive).toBe(true)
  const result=spawnSync(exe,[String(process.pid)],{input:frame(malformed),encoding:'utf8',timeout:10000})
  expect(result.status).toBe(3);expect(result.stdout).toBe('');expect(result.stderr).toBe('')
 })
 it('expires queued identifiers after the approved five-second wait',async()=>{
  const release1=await acquireNativeSlot('hold-one');const release2=await acquireNativeSlot('hold-two')
  try {await expect(acquireNativeSlot('expires')).rejects.toThrow('Clinical JPEG unavailable')}
  finally {release1();release2()}
 },8000)

 it('rejects missing or altered helper identity before spawn',async()=>{
  const root=await mkdtemp(join(tmpdir(),'labos-r001-id-'))
  try {
   await expect(verifyR001HelperIdentity(root)).rejects.toThrow('Clinical JPEG unavailable')
   const bin=join(root,'native','bin','win32-x64');await mkdir(bin,{recursive:true})
   await copyFile(exe,join(bin,'r001-codec.exe'))
   await copyFile(resolve(process.cwd(),'native/bin/win32-x64/r001-codec.manifest.json'),join(bin,'r001-codec.manifest.json'))
   await expect(verifyR001HelperIdentity(root)).resolves.toContain('r001-codec.exe')
   const altered=await readFile(join(bin,'r001-codec.exe'));altered[0]^=1;await writeFile(join(bin,'r001-codec.exe'),altered)
   await expect(verifyR001HelperIdentity(root)).rejects.toThrow('Clinical JPEG unavailable')
  }finally{
   if(!root.startsWith(resolve(tmpdir())+sep)||!basename(root).startsWith('labos-r001-id-'))throw new Error('unsafe test cleanup')
   await rm(root,{recursive:true,force:true})
  }
 })
})
