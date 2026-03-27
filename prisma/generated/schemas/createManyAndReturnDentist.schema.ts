import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistSelectObjectSchema as DentistSelectObjectSchema } from './objects/DentistSelect.schema';
import { DentistCreateManyInputObjectSchema as DentistCreateManyInputObjectSchema } from './objects/DentistCreateManyInput.schema';

export const DentistCreateManyAndReturnSchema: z.ZodType<Prisma.DentistCreateManyAndReturnArgs> = z.object({ select: DentistSelectObjectSchema.optional(), data: z.union([ DentistCreateManyInputObjectSchema, z.array(DentistCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.DentistCreateManyAndReturnArgs>;

export const DentistCreateManyAndReturnZodSchema = z.object({ select: DentistSelectObjectSchema.optional(), data: z.union([ DentistCreateManyInputObjectSchema, z.array(DentistCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();