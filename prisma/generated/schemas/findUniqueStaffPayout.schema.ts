import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StaffPayoutSelectObjectSchema as StaffPayoutSelectObjectSchema } from './objects/StaffPayoutSelect.schema';
import { StaffPayoutIncludeObjectSchema as StaffPayoutIncludeObjectSchema } from './objects/StaffPayoutInclude.schema';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './objects/StaffPayoutWhereUniqueInput.schema';

export const StaffPayoutFindUniqueSchema: z.ZodType<Prisma.StaffPayoutFindUniqueArgs> = z.object({ select: StaffPayoutSelectObjectSchema.optional(), include: StaffPayoutIncludeObjectSchema.optional(), where: StaffPayoutWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.StaffPayoutFindUniqueArgs>;

export const StaffPayoutFindUniqueZodSchema = z.object({ select: StaffPayoutSelectObjectSchema.optional(), include: StaffPayoutIncludeObjectSchema.optional(), where: StaffPayoutWhereUniqueInputObjectSchema }).strict();