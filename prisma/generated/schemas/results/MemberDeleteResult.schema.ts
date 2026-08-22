import * as z from 'zod';
export const MemberDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  organizationId: z.string(),
  organization: z.unknown(),
  userId: z.string(),
  authuser: z.unknown(),
  role: z.string(),
  createdAt: z.date(),
  labStaff: z.unknown().optional()
}));