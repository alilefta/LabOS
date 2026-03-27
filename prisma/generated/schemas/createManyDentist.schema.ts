import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistCreateManyInputObjectSchema as DentistCreateManyInputObjectSchema } from './objects/DentistCreateManyInput.schema';

export const DentistCreateManySchema: z.ZodType<Prisma.DentistCreateManyArgs> = z.object({ data: z.union([ DentistCreateManyInputObjectSchema, z.array(DentistCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.DentistCreateManyArgs>;

export const DentistCreateManyZodSchema = z.object({ data: z.union([ DentistCreateManyInputObjectSchema, z.array(DentistCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();