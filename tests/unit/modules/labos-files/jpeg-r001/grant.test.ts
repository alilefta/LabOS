import { describe, expect, it, vi } from 'vitest'
const requireStage=vi.hoisted(()=>vi.fn().mockResolvedValue(undefined))
vi.mock('@/modules/labos-files/case-asset-stage.repository',()=>({createTransactionStageAuthorizer:()=>({require:requireStage})}))
import { resolveReservedClinicalGrant } from '@/modules/labos-files/jpeg-r001/grant'

const grantId='11111111-1111-4111-8111-111111111111'
function fixture(){
 const grant={id:grantId,organizationId:'org',labId:'lab',createdByMemberId:'member',boundaryId:'N-FILE-110',purpose:'case.asset.add.stage',targetType:'case',targetId:'case',status:'PENDING',provider:'UPLOADTHING',providerFileKey:'opaque-key',providerFileUrl:null,caseClinicalValidatedSuffix:'JPG' as 'JPG'|'JPEG'|null,uploadedAt:null,providerDeletedAt:null,expiresAt:new Date('2026-10-01T12:15:00Z')}
 const tx={$queryRaw:vi.fn().mockResolvedValue([{now:new Date('2026-10-01T12:00:00Z')}]),fileUploadGrant:{findUnique:vi.fn().mockResolvedValue(grant)},member:{findFirst:vi.fn().mockResolvedValue({id:'member',userId:'user',role:'owner'})},lab:{findFirst:vi.fn().mockResolvedValue({id:'lab'})},case:{findFirst:vi.fn().mockResolvedValue({id:'case'})}}
 const prisma={$transaction:vi.fn(async(fn:(transaction:typeof tx)=>Promise<unknown>)=>fn(tx))}
 return {grant,tx,prisma}
}

describe('R001 reserved grant authority',()=>{
 it('resolves canonical Case context and authorizes before returning key',async()=>{
  const h=fixture();const result=await resolveReservedClinicalGrant(grantId,h.prisma as unknown as Parameters<typeof resolveReservedClinicalGrant>[1])
  expect(result).toMatchObject({uploadGrantId:grantId,organizationId:'org',labId:'lab',caseId:'case',memberId:'member',providerFileKey:'opaque-key',checkedSuffix:'JPG'})
  expect(requireStage).toHaveBeenCalledWith(expect.objectContaining({permission:'case.asset.add',boundaryId:'N-FILE-110',target:{type:'case',id:'case'}}))
  expect(h.tx.case.findFirst).toHaveBeenCalledWith(expect.objectContaining({where:expect.objectContaining({id:'case',labId:'lab',status:'DRAFT'})}))
  expect(Object.keys(h.tx)).not.toContain('caseClinicalUploadEvidence')
 })
 it('preserves checked JPEG suffix',async()=>{const h=fixture();h.grant.caseClinicalValidatedSuffix='JPEG';await expect(resolveReservedClinicalGrant(grantId,h.prisma as unknown as Parameters<typeof resolveReservedClinicalGrant>[1])).resolves.toMatchObject({checkedSuffix:'JPEG'})})
 it.each(['expired','missing key','missing suffix','wrong purpose','wrong provider','wrong Case','missing member','denied permission'] as const)('fails closed for %s',async kind=>{
  const h=fixture();requireStage.mockResolvedValue(undefined)
  if(kind==='expired')h.grant.expiresAt=new Date('2026-10-01T12:00:00Z')
  if(kind==='missing key')h.grant.providerFileKey=null as unknown as string
  if(kind==='missing suffix')h.grant.caseClinicalValidatedSuffix=null
  if(kind==='wrong purpose')h.grant.purpose='other'
  if(kind==='wrong provider')h.grant.provider='OTHER'
  if(kind==='wrong Case')h.tx.case.findFirst.mockResolvedValue(null)
  if(kind==='missing member')h.tx.member.findFirst.mockResolvedValue(null)
  if(kind==='denied permission')requireStage.mockRejectedValueOnce(new Error('denied'))
  await expect(resolveReservedClinicalGrant(grantId,h.prisma as unknown as Parameters<typeof resolveReservedClinicalGrant>[1])).rejects.toThrow('Clinical JPEG unavailable')
 })
})
