import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserSelectObjectSchema as SuperUserSelectObjectSchema } from './objects/SuperUserSelect.schema';
import { SuperUserCreateManyInputObjectSchema as SuperUserCreateManyInputObjectSchema } from './objects/SuperUserCreateManyInput.schema';

export const SuperUserCreateManyAndReturnSchema: z.ZodType<Prisma.SuperUserCreateManyAndReturnArgs> = z.object({ select: SuperUserSelectObjectSchema.optional(), data: z.union([ SuperUserCreateManyInputObjectSchema, z.array(SuperUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.SuperUserCreateManyAndReturnArgs>;

export const SuperUserCreateManyAndReturnZodSchema = z.object({ select: SuperUserSelectObjectSchema.optional(), data: z.union([ SuperUserCreateManyInputObjectSchema, z.array(SuperUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();