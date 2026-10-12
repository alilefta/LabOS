import { describe, expect, it, vi } from 'vitest'
vi.mock('@/modules/labos-files/case-asset-stage.repository', () => ({
  createTransactionStageAuthorizer: () => ({ require: vi.fn().mockResolvedValue(undefined) }),
}))
import { issueCaseObjectStorageWrite } from '@/modules/labos-files/case-object-storage-upload'
import type { TenantContext } from '@/platform/organizations'
import type { ObjectStorage } from '@/modules/labos-files/object-storage/contract'
const id = '11111111-1111-4111-8111-111111111111'
const key = 'objects/33333333-3333-4333-8333-333333333333'
const now = new Date('2026-10-07T12:00:00Z')
const tenant: TenantContext = { userId:'u',memberId:'m',memberRole:'owner',staffId:null,
 organizationId:'o',labId:'l',lab:{id:'l',title:'L',slug:null} }
function fixture() {
 const order:string[]=[]
 const grant={id,organizationId:'o',labId:'l',createdByMemberId:'m',boundaryId:'N-FILE-110',
 purpose:'case.asset.add.stage',targetType:'case',targetId:'c',status:'PENDING',
 provider:'OBJECT_STORAGE',providerFileKey:key,providerFileUrl:null,
 caseClinicalValidatedSuffix:'JPG',expiresAt:new Date(now.getTime()+900000),
 uploadedAt:null,consumedAt:null,expiredAt:null,failedAt:null,providerDeletedAt:null}
 const allocation={sourceUploadGrantId:id,latestWriteCapabilityExpiresAt:null as Date|null}
 const tx={
 $queryRaw:vi.fn(async (q:{strings:readonly string[]})=>{
  const sql=q.strings.join(' ')
  if(sql.includes('clock_timestamp')) return [{now}]
  if(sql.includes('SELECT "sourceUploadGrantId"')) return [{sourceUploadGrantId:id,covers:!!allocation.latestWriteCapabilityExpiresAt&&allocation.latestWriteCapabilityExpiresAt>=capability.expiresAt}]
  if(sql.includes('SELECT "latestWriteCapabilityExpiresAt" >=')) return [{covers:!!allocation.latestWriteCapabilityExpiresAt&&allocation.latestWriteCapabilityExpiresAt>=capability.expiresAt}]
  return [{id}]
 }),
 $executeRaw:vi.fn(async()=>{order.push('fence');allocation.latestWriteCapabilityExpiresAt=capability.expiresAt;return 1}),
 fileUploadGrant:{findUnique:vi.fn(async()=>grant)},
 member:{findFirst:vi.fn(async()=>({id:'m',role:'owner'}))},
 objectStorageKeyAllocation:{findUnique:vi.fn(async()=>allocation)}}
 const prisma={$transaction:vi.fn(async (f:(t:typeof tx)=>Promise<unknown>)=>{const r=await f(tx);order.push('commit');return r})}
 const capability={url:'opaque',method:'PUT' as const,headers:{'If-None-Match':'*'},
 expiresAt:new Date(now.getTime()+120000)}
 const storage={issueCreateOnlyWrite:vi.fn(async()=>{order.push('sign');return {ok:true as const,value:capability}})} as unknown as ObjectStorage
 return {order,grant,allocation,tx,prisma,capability,storage}
}
describe('R2-03 write issuance',()=>{
 it('commits exact expiry fence before capability disclosure',async()=>{
  const h=fixture()
  const result=await issueCaseObjectStorageWrite(id,tenant,h.storage,h.prisma as never)
  h.order.push('disclose')
  expect(result).toEqual(h.capability)
  expect(h.order).toEqual(['commit','sign','fence','commit','disclose'])
  expect(h.allocation.latestWriteCapabilityExpiresAt).toEqual(h.capability.expiresAt)
 })
 it('drops signed capability when grant terminalizes before fence commit',async()=>{
  const h=fixture()
  vi.mocked(h.storage.issueCreateOnlyWrite).mockImplementationOnce(async()=>{h.grant.status='UPLOADED';return {ok:true,value:h.capability}})
  await expect(issueCaseObjectStorageWrite(id,tenant,h.storage,h.prisma as never)).rejects.toThrow('unavailable')
  expect(h.tx.$executeRaw).not.toHaveBeenCalled()
 })
 it('denies other Member before signing',async()=>{
  const h=fixture()
  await expect(issueCaseObjectStorageWrite(id,{...tenant,memberId:'other'},h.storage,h.prisma as never)).rejects.toThrow('unavailable')
  expect(h.storage.issueCreateOnlyWrite).not.toHaveBeenCalled()
 })
})


describe('R2-03 HTTP gate', () => {
  it('keeps both POST routes unavailable before N-FILE-110 activation', async () => {
    const intentRoute = await import('@/app/api/cases/[caseId]/clinical-upload/intent/route')
    const completeRoute = await import('@/app/api/cases/[caseId]/clinical-upload/complete/route')
    const context = { params: Promise.resolve({ caseId: '44444444-4444-4444-8444-444444444444' }) }
    const request = new Request('http://localhost:3000/api/cases/ignored/clinical-upload', { method: 'POST' })
    expect((await intentRoute.POST(request, context)).status).toBe(404)
    expect((await completeRoute.POST(request, context)).status).toBe(404)
  }, 30000)
})
