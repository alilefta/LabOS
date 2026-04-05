import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffSelectObjectSchema as LabStaffSelectObjectSchema } from './objects/LabStaffSelect.schema';
import { LabStaffIncludeObjectSchema as LabStaffIncludeObjectSchema } from './objects/LabStaffInclude.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './objects/LabStaffWhereUniqueInput.schema';

export const LabStaffDeleteOneSchema: z.ZodType<Prisma.LabStaffDeleteArgs> = z.object({ select: LabStaffSelectObjectSchema.optional(), include: LabStaffIncludeObjectSchema.optional(), where: LabStaffWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabStaffDeleteArgs>;

export const LabStaffDeleteOneZodSchema = z.object({ select: LabStaffSelectObjectSchema.optional(), include: LabStaffIncludeObjectSchema.optional(), where: LabStaffWhereUniqueInputObjectSchema }).strict();