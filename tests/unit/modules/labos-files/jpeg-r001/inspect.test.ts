import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'
import { inspectR001, R001_LIMITS } from '@/modules/labos-files/jpeg-r001/inspect'

const fromNext = createRequire(createRequire(import.meta.url).resolve('next/package.json'))
const sharp = fromNext('sharp') as (input: unknown) => { jpeg: (options?: { progressive?: boolean; quality?: number }) => { toBuffer: () => Promise<Buffer> } }
const jpeg = (channels: 1 | 3 = 3, progressive = false) => channels===1 ? Promise.resolve(readFileSync(new URL('./grayscale.jpg', import.meta.url))) : sharp({ create: { width: 24, height: 16, channels: 3, background: '#337799' } }).jpeg({ progressive, quality: 85 }).toBuffer()
const segment = (marker: number, payload: number) => { const b = Buffer.alloc(payload + 4); b[0]=255; b[1]=marker; b.writeUInt16BE(payload+2,2); return b }

describe('production R001 structure', () => {
 it('accepts baseline, progressive and grayscale', async () => {
  for (const [components, progressive] of [[3,false],[3,true],[1,false]] as const) {
   const info=inspectR001(await jpeg(components,progressive))
   expect([info.width,info.height,info.components,info.progressive]).toEqual([24,16,components,progressive])
  }
 })
 it('rejects truncated, trailing, concatenated, unsupported and malformed bytes', async () => {
  const valid=await jpeg()
  for(const bad of [valid.subarray(0,valid.length-2),Buffer.concat([valid,Buffer.from('x')]),Buffer.concat([valid,valid]),Buffer.from([255,216,255,217])]) expect(()=>inspectR001(bad)).toThrow()
  const malformed=Buffer.from(valid); malformed[4]=0; malformed[5]=1; expect(()=>inspectR001(malformed)).toThrow()
  const sof=valid.indexOf(Buffer.from([255,192])); const unsupported=Buffer.from(valid); unsupported[sof+1]=195; expect(()=>inspectR001(unsupported)).toThrow()
  const precision=Buffer.from(valid); precision[sof+4]=12; expect(()=>inspectR001(precision)).toThrow()
 })
 it('enforces dimensions, pixel and metadata equality and limit+1', async () => {
  const valid=await jpeg(); const sof=valid.indexOf(Buffer.from([255,192]))
  const dimensions=(w:number,h:number)=>{const b=Buffer.from(valid);b.writeUInt16BE(h,sof+5);b.writeUInt16BE(w,sof+7);return b}
  expect(inspectR001(dimensions(9000,5555)).width).toBe(9000)
  expect(()=>inspectR001(dimensions(9001,5555))).toThrow()
  expect(inspectR001(dimensions(5555,9000)).height).toBe(9000)
  expect(()=>inspectR001(dimensions(5555,9001))).toThrow()
  expect(inspectR001(dimensions(8000,6250)).width*6250).toBe(R001_LIMITS.pixels)
  expect(()=>inspectR001(dimensions(8000,6251))).toThrow()
  const inject=(parts:Buffer[])=>Buffer.concat([valid.subarray(0,2),...parts,valid.subarray(2)])
  const exact=[segment(226,65000),segment(227,65000),segment(228,65000),segment(229,65000),segment(254,2144)]
  expect(inspectR001(inject(exact)).metadataBytes).toBe(R001_LIMITS.metadataBytes)
  expect(()=>inspectR001(inject([...exact,segment(254,1)]))).toThrow()
  expect(()=>inspectR001(Buffer.alloc(R001_LIMITS.encodedBytes+1))).toThrow()
 })
 it('counts structural segments to exactly 512', async () => {
  const valid=await jpeg(); const base=inspectR001(valid).segments
  const add=(n:number)=>Buffer.concat([valid.subarray(0,2),...Array.from({length:n},()=>segment(254,0)),valid.subarray(2)])
  expect(inspectR001(add(512-base)).segments).toBe(512)
  expect(()=>inspectR001(add(513-base))).toThrow()
 })

 it('accepts exact progressive 128 scans structurally and rejects 129',async()=>{
  const progressive=await jpeg(3,true);const original=inspectR001(progressive).scans
  const extra=Buffer.from([255,218,0,8,1,1,0,0,0,0])
  const withScans=(count:number)=>Buffer.concat([progressive.subarray(0,-2),...Array.from({length:count-original},()=>extra),progressive.subarray(-2)])
  expect(inspectR001(withScans(128)).scans).toBe(128)
  expect(()=>inspectR001(withScans(129))).toThrow()
 })
 it('accepts exactly 33,554,432 structurally and rejects byte 33,554,433',async()=>{
  const valid=await jpeg();const padding=Buffer.alloc(R001_LIMITS.encodedBytes-valid.length)
  const exact=Buffer.concat([valid.subarray(0,-2),padding,valid.subarray(-2)])
  expect(exact.length).toBe(R001_LIMITS.encodedBytes)
  expect(inspectR001(exact).width).toBe(24)
  expect(()=>inspectR001(Buffer.concat([exact,Buffer.from([0])]))).toThrow()
 })
})
