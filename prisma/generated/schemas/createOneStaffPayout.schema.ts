import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StaffPayoutSelectObjectSchema as StaffPayoutSelectObjectSchema } from './objects/StaffPayoutSelect.schema';
import { StaffPayoutIncludeObjectSchema as StaffPayoutIncludeObjectSchema } from './objects/StaffPayoutInclude.schema';
import { StaffPayoutCreateInputObjectSchema as StaffPayoutCreateInputObjectSchema } from './objects/StaffPayoutCreateInput.schema';
import { StaffPayoutUncheckedCreateInputObjectSchema as StaffPayoutUncheckedCreateInputObjectSchema } from './objects/StaffPayoutUncheckedCreateInput.schema';

export const StaffPayoutCreateOneSchema: z.ZodType<Prisma.StaffPayoutCreateArgs> = z.object({ select: StaffPayoutSelectObjectSchema.optional(), include: StaffPayoutIncludeObjectSchema.optional(), data: z.union([StaffPayoutCreateInputObjectSchema, StaffPayoutUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.StaffPayoutCreateArgs>;

export const StaffPayoutCreateOneZodSchema = z.object({ select: StaffPayoutSelectObjectSchema.optional(), include: StaffPayoutIncludeObjectSchema.optional(), data: z.union([StaffPayoutCreateInputObjectSchema, StaffPayoutUncheckedCreateInputObjectSchema]) }).strict();