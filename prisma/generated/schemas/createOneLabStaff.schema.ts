import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffSelectObjectSchema as LabStaffSelectObjectSchema } from './objects/LabStaffSelect.schema';
import { LabStaffIncludeObjectSchema as LabStaffIncludeObjectSchema } from './objects/LabStaffInclude.schema';
import { LabStaffCreateInputObjectSchema as LabStaffCreateInputObjectSchema } from './objects/LabStaffCreateInput.schema';
import { LabStaffUncheckedCreateInputObjectSchema as LabStaffUncheckedCreateInputObjectSchema } from './objects/LabStaffUncheckedCreateInput.schema';

export const LabStaffCreateOneSchema: z.ZodType<Prisma.LabStaffCreateArgs> = z.object({ select: LabStaffSelectObjectSchema.optional(), include: LabStaffIncludeObjectSchema.optional(), data: z.union([LabStaffCreateInputObjectSchema, LabStaffUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.LabStaffCreateArgs>;

export const LabStaffCreateOneZodSchema = z.object({ select: LabStaffSelectObjectSchema.optional(), include: LabStaffIncludeObjectSchema.optional(), data: z.union([LabStaffCreateInputObjectSchema, LabStaffUncheckedCreateInputObjectSchema]) }).strict();