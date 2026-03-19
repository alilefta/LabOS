import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  brandAvatarUrl: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const LabCreateManyInputObjectSchema: z.ZodType<Prisma.LabCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateManyInput>;
export const LabCreateManyInputObjectZodSchema = makeSchema();
