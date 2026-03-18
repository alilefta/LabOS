import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianCreateManyInputObjectSchema as TechnicianCreateManyInputObjectSchema } from './objects/TechnicianCreateManyInput.schema';

export const TechnicianCreateManySchema: z.ZodType<Prisma.TechnicianCreateManyArgs> = z.object({ data: z.union([ TechnicianCreateManyInputObjectSchema, z.array(TechnicianCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.TechnicianCreateManyArgs>;

export const TechnicianCreateManyZodSchema = z.object({ data: z.union([ TechnicianCreateManyInputObjectSchema, z.array(TechnicianCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();