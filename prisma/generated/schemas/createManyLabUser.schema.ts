import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserCreateManyInputObjectSchema as LabUserCreateManyInputObjectSchema } from './objects/LabUserCreateManyInput.schema';

export const LabUserCreateManySchema: z.ZodType<Prisma.LabUserCreateManyArgs> = z.object({ data: z.union([ LabUserCreateManyInputObjectSchema, z.array(LabUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabUserCreateManyArgs>;

export const LabUserCreateManyZodSchema = z.object({ data: z.union([ LabUserCreateManyInputObjectSchema, z.array(LabUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();