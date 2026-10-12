import { EventEmitter } from 'node:events'
import { beforeEach, describe, expect, it, vi } from 'vitest'
const { spawnMock } = vi.hoisted(()=>({spawnMock:vi.fn()}))
vi.mock('node:child_process',()=>({spawn:spawnMock}))
import { decodeR001WithNative } from '@/modules/labos-files/jpeg-r001/native'

const bytes=Buffer.from([255,216,255,217])
const structure={width:64,height:48,components:3 as const,progressive:false,segments:5,scans:1,metadataBytes:0}
type Scenario='success'|'extra'|'wrong-dimensions'|'stderr'|'oversize'|'crash'|'hang'
let scenario:Scenario='success'
let killed=0
beforeEach(()=>{
 scenario='success';killed=0;spawnMock.mockReset()
 spawnMock.mockImplementation(()=>{
  const child=new EventEmitter() as EventEmitter & {stdin:EventEmitter & {end:(frame:Buffer)=>void};stdout:EventEmitter;stderr:EventEmitter;kill:()=>boolean}
  child.stdout=new EventEmitter();child.stderr=new EventEmitter()
  child.stdin=new EventEmitter() as typeof child.stdin
  child.kill=()=>{killed++;queueMicrotask(()=>child.emit('close',null,'SIGTERM'));return true}
  child.stdin.end=()=>queueMicrotask(()=>{
   if(scenario==='hang')return
   if(scenario==='crash'){child.emit('close',7,null);return}
   if(scenario==='stderr')child.stderr.emit('data',Buffer.from('sensitive native diagnostic'))
   const line=scenario==='wrong-dimensions'?'LJ01 OK 65 48 3 48\n':'LJ01 OK 64 48 3 48\n'
   child.stdout.emit('data',Buffer.from(scenario==='oversize'?'X'.repeat(96):scenario==='extra'?line+'extra':line))
   child.emit('close',0,null)
  })
  return child
 })
})

describe('R001 native parent IPC',()=>{
 it('accepts only exact successful framed response',async()=>{
  await expect(decodeR001WithNative(bytes,structure)).resolves.toBeUndefined()
  expect(spawnMock).toHaveBeenCalledWith(expect.stringContaining('r001-codec.exe'),[String(process.pid)],expect.objectContaining({shell:false,windowsHide:true}))
 })
 it.each(['extra','wrong-dimensions','stderr','oversize','crash'] as const)('fails closed on %s',async kind=>{
  scenario=kind;await expect(decodeR001WithNative(bytes,structure)).rejects.toThrow('Clinical JPEG unavailable')
 })
 it('kills a hung child at the approved ten-second wall',async()=>{
  scenario='hang'; const started=Date.now();await expect(decodeR001WithNative(bytes,structure)).rejects.toThrow('Clinical JPEG unavailable')
  expect(killed).toBeGreaterThan(0);expect(Date.now()-started).toBeGreaterThanOrEqual(9900)
 },15000)
 it('kills the helper on application cancellation',async()=>{
  scenario='hang';const controller=new AbortController()
  spawnMock.mockImplementationOnce(()=>{
   const child=new EventEmitter() as EventEmitter & {stdin:EventEmitter & {end:(frame:Buffer)=>void};stdout:EventEmitter;stderr:EventEmitter;kill:()=>boolean}
   child.stdout=new EventEmitter();child.stderr=new EventEmitter();child.stdin=new EventEmitter() as typeof child.stdin
   child.stdin.end=()=>{};child.kill=()=>{killed++;queueMicrotask(()=>child.emit('close',null,'SIGTERM'));return true}
   queueMicrotask(()=>controller.abort())
   return child
  })
  await expect(decodeR001WithNative(bytes,structure,controller.signal)).rejects.toThrow('Clinical JPEG unavailable')
  expect(killed).toBe(1)
 })
})
