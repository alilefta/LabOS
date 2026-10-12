import { EventEmitter } from 'node:events'
import { Readable } from 'node:stream'
import { describe, expect, it, vi } from 'vitest'
import { isPublicProviderAddress, validateProviderDestination, retrieveReservedUploadThingBytes, type ProviderLookupAndTransport } from '@/modules/labos-files/jpeg-r001/retrieve'

const key='opaque_key-123'
const good=`https://fyylnhrlmu.ufs.sh/f/${key}`
function harness(rows: {key:string;url:string}[] = [{key,url:good}], response: {status:number;headers:Record<string,string>;body:Uint8Array;complete:boolean} = {status:200,headers:{'content-length':'3'},body:Buffer.from('abc'),complete:true}) {
 const lookup=vi.fn().mockResolvedValue(rows)
 const resolve=vi.fn().mockResolvedValue([{address:'188.114.96.7',family:4}])
 const state:{options?:Record<string,unknown>; pinned?:unknown; calls:number}={calls:0}
 const request=vi.fn((_url:URL, options:Record<string,unknown>, callback:(res:Readable & {statusCode:number;headers:Record<string,string>;complete:boolean})=>void)=>{
  state.calls++; state.options=options
  const req=new EventEmitter() as EventEmitter & {end:()=>void;destroy:()=>void}
  req.end=()=>{setImmediate(()=>{
   const res=Readable.from([response.body]) as Readable & {statusCode:number;headers:Record<string,string>;complete:boolean}
   res.statusCode=response.status; res.headers=response.headers; res.complete=response.complete
   callback(res); res.on('end',()=>req.emit('close'))
  })}
  req.destroy=()=>{req.emit('error',new Error('closed'));req.emit('close')}
  return req
 })
 const transport={lookup:{lookup},resolve,request:request as unknown as ProviderLookupAndTransport['request'],appId:'fyylnhrlmu'}
 return {lookup,resolve,request,state,transport}
}

describe('R001 exact-key provider destination',()=>{
 it('accepts only the observed exact origin/path and safe key',()=>{
  expect(validateProviderDestination(good,key,'fyylnhrlmu').href).toBe(good)
  for(const url of [good.replace('https:','http:'),good.replace('fyylnhrlmu.ufs.sh','evil.ufs.sh'),good.replace('/f/','/x/'),good+'?x=1',good+'#x',good.replace('https://','https://user@'),good.replace('.sh/','.sh:8443/')]) expect(()=>validateProviderDestination(url,key,'fyylnhrlmu')).toThrow()
  expect(()=>validateProviderDestination(good,key,'other-app')).toThrow()
 })
 it('rejects private, loopback, link-local, mapped and documentation addresses',()=>{
  for(const address of ['127.0.0.1','10.1.2.3','169.254.1.1','192.168.1.1','100.64.0.1','198.18.0.1','0.0.0.0','224.0.0.1','::1','fe80::1','fc00::1','::ffff:127.0.0.1','2001:db8::1']) expect(isPublicProviderAddress(address)).toBe(false)
  expect(isPublicProviderAddress('188.114.96.7')).toBe(true)
  expect(isPublicProviderAddress('2606:4700::1111')).toBe(true)
 })
 it('requires one returned exact key before DNS/HTTP',async()=>{
  for(const rows of [[],[{key:'other',url:good}],[{key,url:good},{key,url:good}]]){
   const h=harness(rows); await expect(retrieveReservedUploadThingBytes(key,undefined,h.transport)).rejects.toThrow('Clinical JPEG unavailable')
   expect(h.resolve).not.toHaveBeenCalled();expect(h.request).not.toHaveBeenCalled()
  }
 })
 it('pins the checked address into the HTTPS socket and returns measured original bytes',async()=>{
  const h=harness(); const bytes=await retrieveReservedUploadThingBytes(key,undefined,h.transport)
  expect(bytes).toEqual(Buffer.from('abc')); expect(h.state.calls).toBe(1)
  expect(h.state.options).toMatchObject({agent:false,rejectUnauthorized:true,servername:'fyylnhrlmu.ufs.sh'})
  const callback=vi.fn(); (h.state.options?.lookup as (host:string,opts:{all:boolean},cb:typeof callback)=>void)('fyylnhrlmu.ufs.sh',{all:false},callback)
  expect(callback).toHaveBeenCalledWith(null,'188.114.96.7',4)
 })
 it('rejects non-public DNS and HTTP/length/encoding/partial failures',async()=>{
  const dns=harness(); dns.resolve.mockResolvedValue([{address:'127.0.0.1',family:4}]); await expect(retrieveReservedUploadThingBytes(key,undefined,dns.transport)).rejects.toThrow();expect(dns.request).not.toHaveBeenCalled()
  for(const response of [
   {status:302,headers:{location:'https://evil.test/'},body:Buffer.from('abc'),complete:true},
   {status:206,headers:{},body:Buffer.from('abc'),complete:true},
   {status:200,headers:{'content-encoding':'gzip'},body:Buffer.from('abc'),complete:true},
   {status:200,headers:{'content-length':'2'},body:Buffer.from('abc'),complete:true},
   {status:200,headers:{'content-length':'33554433'},body:Buffer.from('abc'),complete:true},
   {status:200,headers:{},body:Buffer.alloc(0),complete:true},
   {status:200,headers:{},body:Buffer.from('abc'),complete:false},
  ]){const h=harness(undefined,response as unknown as {status:number;headers:Record<string,string>;body:Uint8Array;complete:boolean});await expect(retrieveReservedUploadThingBytes(key,undefined,h.transport)).rejects.toThrow('Clinical JPEG unavailable')}
  const absent=harness(undefined,{status:200,headers:{},body:Buffer.from('abc'),complete:true});await expect(retrieveReservedUploadThingBytes(key,undefined,absent.transport)).resolves.toEqual(Buffer.from('abc'))
 })
 it('aborts on actual byte 33,554,433 despite absent Content-Length',async()=>{
  const h=harness(undefined,{status:200,headers:{},body:Buffer.alloc(33_554_433),complete:true})
  await expect(retrieveReservedUploadThingBytes(key,undefined,h.transport)).rejects.toThrow('Clinical JPEG unavailable')
 })})
