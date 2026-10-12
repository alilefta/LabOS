import { createHash } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import { validateReservedClinicalJpeg, assertRetainedOriginal, type ValidationDependencies } from '@/modules/labos-files/jpeg-r001/validate'

const grantId='11111111-1111-4111-8111-111111111111'
const grant={uploadGrantId:grantId,organizationId:'org',labId:'lab',caseId:'case',memberId:'member',provider:'UPLOADTHING' as const,providerFileKey:'opaque_key-123'}
function harness(){
 const original=Buffer.from([255,216,255,217])
 const order:string[]=[]
 const release=vi.fn()
 const deps={
  acquireSlot:vi.fn(async()=>{order.push('slot');return release}),
  resolveGrant:vi.fn(async()=>{order.push('authorize');return grant}),
  retrieve:vi.fn(async()=>{order.push('retrieve');return original}),
  inspect:vi.fn((bytes:Uint8Array)=>{expect(bytes).toBe(original);order.push('inspect');return {width:24,height:16,components:3 as const,progressive:false,segments:5,scans:1,metadataBytes:0}}),
  decode:vi.fn(async(bytes:Buffer)=>{expect(bytes).toBe(original);order.push('decode')}),
 } as unknown as ValidationDependencies
 return {original,order,release,deps}
}

describe('R001 internal validation boundary',()=>{
 it('authorizes before provider and uses one original byte buffer for SHA, structure and native decode',async()=>{
  const h=harness();const result=await validateReservedClinicalJpeg(grantId,undefined,h.deps)
  expect(h.order).toEqual(['slot','authorize','retrieve','inspect','decode'])
  expect(result).toMatchObject({profileId:'JPEG_CLINICAL_V1_R001',encodedBytes:h.original.length,width:24,height:16,components:3,sha256:createHash('sha256').update(h.original).digest('hex'),grant})
  expect(h.release).toHaveBeenCalledOnce()
  expect(()=>assertRetainedOriginal(result)).not.toThrow()
  expect(Object.keys(result)).not.toContain('providerUrl')
  expect(Object.keys(result)).not.toContain('originalBytes')
  h.original[0]^=1
  expect(()=>assertRetainedOriginal(result)).toThrow('Clinical JPEG unavailable')
 })
 it('never calls provider or decoder when grant authorization fails',async()=>{
  const h=harness();vi.mocked(h.deps.resolveGrant).mockRejectedValueOnce(new Error('denied'))
  await expect(validateReservedClinicalJpeg(grantId,undefined,h.deps)).rejects.toThrow('Clinical JPEG unavailable')
  expect(h.deps.retrieve).not.toHaveBeenCalled();expect(h.deps.decode).not.toHaveBeenCalled();expect(h.release).toHaveBeenCalledOnce()
 })
 it('does not touch persistence on validation rejection',async()=>{
  const h=harness();vi.mocked(h.deps.decode).mockRejectedValueOnce(new Error('decoder warning'))
  await expect(validateReservedClinicalJpeg(grantId,undefined,h.deps)).rejects.toThrow('Clinical JPEG unavailable')
  expect(h.order).toEqual(['slot','authorize','retrieve','inspect'])
  expect(h.release).toHaveBeenCalledOnce()
  expect(Object.keys(h.deps)).toEqual(['acquireSlot','resolveGrant','retrieve','inspect','decode'])
 })
})
