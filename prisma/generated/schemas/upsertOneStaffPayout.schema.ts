import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StaffPayoutSelectObjectSchema as StaffPayoutSelectObjectSchema } from './objects/StaffPayoutSelect.schema';
import { StaffPayoutIncludeObjectSchema as StaffPayoutIncludeObjectSchema } from './objects/StaffPayoutInclude.schema';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './objects/StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutCreateInputObjectSchema as StaffPayoutCreateInputObjectSchema } from './objects/StaffPayoutCreateInput.schema';
import { StaffPayoutUncheckedCreateInputObjectSchema as StaffPayoutUncheckedCreateInputObjectSchema } from './objects/StaffPayoutUncheckedCreateInput.schema';
import { StaffPayoutUpdateInputObjectSchema as StaffPayoutUpdateInputObjectSchema } from './objects/StaffPayoutUpdateInput.schema';
import { StaffPayoutUncheckedUpdateInputObjectSchema as StaffPayoutUncheckedUpdateInputObjectSchema } from './objects/StaffPayoutUncheckedUpdateInput.schema';

export const StaffPayoutUpsertOneSchema: z.ZodType<Prisma.StaffPayoutUpsertArgs> = z.object({ select: StaffPayoutSelectObjectSchema.optional(), include: StaffPayoutIncludeObjectSchema.optional(), where: StaffPayoutWhereUniqueInputObjectSchema, create: z.union([ StaffPayoutCreateInputObjectSchema, StaffPayoutUncheckedCreateInputObjectSchema ]), update: z.union([ StaffPayoutUpdateInputObjectSchema, StaffPayoutUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.StaffPayoutUpsertArgs>;

export const StaffPayoutUpsertOneZodSchema = z.object({ select: StaffPayoutSelectObjectSchema.optional(), include: StaffPayoutIncludeObjectSchema.optional(), where: StaffPayoutWhereUniqueInputObjectSchema, create: z.union([ StaffPayoutCreateInputObjectSchema, StaffPayoutUncheckedCreateInputObjectSchema ]), update: z.union([ StaffPayoutUpdateInputObjectSchema, StaffPayoutUncheckedUpdateInputObjectSchema ]) }).strict();