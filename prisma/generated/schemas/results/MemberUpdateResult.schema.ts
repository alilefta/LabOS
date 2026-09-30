import * as z from 'zod';
export const MemberUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  organizationId: z.string(),
  organization: z.unknown(),
  userId: z.string(),
  authuser: z.unknown(),
  role: z.string(),
  createdAt: z.date(),
  labStaff: z.unknown().optional(),
  fileUploadGrants: z.array(z.unknown()),
  uploadedStoredFiles: z.array(z.unknown()),
  createdCaseFileVersions: z.array(z.unknown())
}));