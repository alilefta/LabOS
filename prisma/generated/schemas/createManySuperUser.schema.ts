import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserCreateManyInputObjectSchema as SuperUserCreateManyInputObjectSchema } from './objects/SuperUserCreateManyInput.schema';

export const SuperUserCreateManySchema: z.ZodType<Prisma.SuperUserCreateManyArgs> = z.object({ data: z.union([ SuperUserCreateManyInputObjectSchema, z.array(SuperUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.SuperUserCreateManyArgs>;

export const SuperUserCreateManyZodSchema = z.object({ data: z.union([ SuperUserCreateManyInputObjectSchema, z.array(SuperUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();