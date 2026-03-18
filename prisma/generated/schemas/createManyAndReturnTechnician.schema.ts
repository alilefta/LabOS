import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianSelectObjectSchema as TechnicianSelectObjectSchema } from './objects/TechnicianSelect.schema';
import { TechnicianCreateManyInputObjectSchema as TechnicianCreateManyInputObjectSchema } from './objects/TechnicianCreateManyInput.schema';

export const TechnicianCreateManyAndReturnSchema: z.ZodType<Prisma.TechnicianCreateManyAndReturnArgs> = z.object({ select: TechnicianSelectObjectSchema.optional(), data: z.union([ TechnicianCreateManyInputObjectSchema, z.array(TechnicianCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.TechnicianCreateManyAndReturnArgs>;

export const TechnicianCreateManyAndReturnZodSchema = z.object({ select: TechnicianSelectObjectSchema.optional(), data: z.union([ TechnicianCreateManyInputObjectSchema, z.array(TechnicianCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();