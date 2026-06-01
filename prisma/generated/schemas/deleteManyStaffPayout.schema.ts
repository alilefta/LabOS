import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './objects/StaffPayoutWhereInput.schema';

export const StaffPayoutDeleteManySchema: z.ZodType<Prisma.StaffPayoutDeleteManyArgs> = z.object({ where: StaffPayoutWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffPayoutDeleteManyArgs>;

export const StaffPayoutDeleteManyZodSchema = z.object({ where: StaffPayoutWhereInputObjectSchema.optional() }).strict();