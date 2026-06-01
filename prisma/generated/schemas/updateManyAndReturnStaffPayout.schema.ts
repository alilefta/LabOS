import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StaffPayoutSelectObjectSchema as StaffPayoutSelectObjectSchema } from './objects/StaffPayoutSelect.schema';
import { StaffPayoutUpdateManyMutationInputObjectSchema as StaffPayoutUpdateManyMutationInputObjectSchema } from './objects/StaffPayoutUpdateManyMutationInput.schema';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './objects/StaffPayoutWhereInput.schema';

export const StaffPayoutUpdateManyAndReturnSchema: z.ZodType<Prisma.StaffPayoutUpdateManyAndReturnArgs> = z.object({ select: StaffPayoutSelectObjectSchema.optional(), data: StaffPayoutUpdateManyMutationInputObjectSchema, where: StaffPayoutWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.StaffPayoutUpdateManyAndReturnArgs>;

export const StaffPayoutUpdateManyAndReturnZodSchema = z.object({ select: StaffPayoutSelectObjectSchema.optional(), data: StaffPayoutUpdateManyMutationInputObjectSchema, where: StaffPayoutWhereInputObjectSchema.optional() }).strict();