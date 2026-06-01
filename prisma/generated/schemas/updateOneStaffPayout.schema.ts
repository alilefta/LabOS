import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StaffPayoutSelectObjectSchema as StaffPayoutSelectObjectSchema } from './objects/StaffPayoutSelect.schema';
import { StaffPayoutIncludeObjectSchema as StaffPayoutIncludeObjectSchema } from './objects/StaffPayoutInclude.schema';
import { StaffPayoutUpdateInputObjectSchema as StaffPayoutUpdateInputObjectSchema } from './objects/StaffPayoutUpdateInput.schema';
import { StaffPayoutUncheckedUpdateInputObjectSchema as StaffPayoutUncheckedUpdateInputObjectSchema } from './objects/StaffPayoutUncheckedUpdateInput.schema';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './objects/StaffPayoutWhereUniqueInput.schema';

export const StaffPayoutUpdateOneSchema: z.ZodType<Prisma.StaffPayoutUpdateArgs> = z.object({ select: StaffPayoutSelectObjectSchema.optional(), include: StaffPayoutIncludeObjectSchema.optional(), data: z.union([StaffPayoutUpdateInputObjectSchema, StaffPayoutUncheckedUpdateInputObjectSchema]), where: StaffPayoutWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffPayoutUpdateArgs>;

export const StaffPayoutUpdateOneZodSchema = z.object({ select: StaffPayoutSelectObjectSchema.optional(), include: StaffPayoutIncludeObjectSchema.optional(), data: z.union([StaffPayoutUpdateInputObjectSchema, StaffPayoutUncheckedUpdateInputObjectSchema]), where: StaffPayoutWhereUniqueInputObjectSchema }).strict();