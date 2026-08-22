import * as z from 'zod';
export const OrganizationUpsertResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional(),
  createdAt: z.date(),
  metadata: z.string().optional(),
  members: z.array(z.unknown()),
  invitations: z.array(z.unknown()),
  lab: z.unknown().optional()
});