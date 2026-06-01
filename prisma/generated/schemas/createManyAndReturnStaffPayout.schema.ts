import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StaffPayoutSelectObjectSchema as StaffPayoutSelectObjectSchema } from './objects/StaffPayoutSelect.schema';
import { StaffPayoutCreateManyInputObjectSchema as StaffPayoutCreateManyInputObjectSchema } from './objects/StaffPayoutCreateManyInput.schema';

export const StaffPayoutCreateManyAndReturnSchema: z.ZodType<Prisma.StaffPayoutCreateManyAndReturnArgs> = z.object({ select: StaffPayoutSelectObjectSchema.optional(), data: z.union([ StaffPayoutCreateManyInputObjectSchema, z.array(StaffPayoutCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffPayoutCreateManyAndReturnArgs>;

export const StaffPayoutCreateManyAndReturnZodSchema = z.object({ select: StaffPayoutSelectObjectSchema.optional(), data: z.union([ StaffPayoutCreateManyInputObjectSchema, z.array(StaffPayoutCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();