import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserSelectObjectSchema as LabUserSelectObjectSchema } from './objects/LabUserSelect.schema';
import { LabUserCreateManyInputObjectSchema as LabUserCreateManyInputObjectSchema } from './objects/LabUserCreateManyInput.schema';

export const LabUserCreateManyAndReturnSchema: z.ZodType<Prisma.LabUserCreateManyAndReturnArgs> = z.object({ select: LabUserSelectObjectSchema.optional(), data: z.union([ LabUserCreateManyInputObjectSchema, z.array(LabUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabUserCreateManyAndReturnArgs>;

export const LabUserCreateManyAndReturnZodSchema = z.object({ select: LabUserSelectObjectSchema.optional(), data: z.union([ LabUserCreateManyInputObjectSchema, z.array(LabUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();