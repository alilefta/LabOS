import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StaffPayoutCreateManyInputObjectSchema as StaffPayoutCreateManyInputObjectSchema } from './objects/StaffPayoutCreateManyInput.schema';

export const StaffPayoutCreateManySchema: z.ZodType<Prisma.StaffPayoutCreateManyArgs> = z.object({ data: z.union([ StaffPayoutCreateManyInputObjectSchema, z.array(StaffPayoutCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffPayoutCreateManyArgs>;

export const StaffPayoutCreateManyZodSchema = z.object({ data: z.union([ StaffPayoutCreateManyInputObjectSchema, z.array(StaffPayoutCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();