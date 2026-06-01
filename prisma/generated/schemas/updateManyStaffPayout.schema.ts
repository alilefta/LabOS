import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StaffPayoutUpdateManyMutationInputObjectSchema as StaffPayoutUpdateManyMutationInputObjectSchema } from './objects/StaffPayoutUpdateManyMutationInput.schema';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './objects/StaffPayoutWhereInput.schema';

export const StaffPayoutUpdateManySchema: z.ZodType<Prisma.StaffPayoutUpdateManyArgs> = z.object({ data: StaffPayoutUpdateManyMutationInputObjectSchema, where: StaffPayoutWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffPayoutUpdateManyArgs>;

export const StaffPayoutUpdateManyZodSchema = z.object({ data: StaffPayoutUpdateManyMutationInputObjectSchema, where: StaffPayoutWhereInputObjectSchema.optional() }).strict();