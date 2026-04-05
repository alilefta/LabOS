import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffSelectObjectSchema as LabStaffSelectObjectSchema } from './objects/LabStaffSelect.schema';
import { LabStaffIncludeObjectSchema as LabStaffIncludeObjectSchema } from './objects/LabStaffInclude.schema';
import { LabStaffUpdateInputObjectSchema as LabStaffUpdateInputObjectSchema } from './objects/LabStaffUpdateInput.schema';
import { LabStaffUncheckedUpdateInputObjectSchema as LabStaffUncheckedUpdateInputObjectSchema } from './objects/LabStaffUncheckedUpdateInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './objects/LabStaffWhereUniqueInput.schema';

export const LabStaffUpdateOneSchema: z.ZodType<Prisma.LabStaffUpdateArgs> = z.object({ select: LabStaffSelectObjectSchema.optional(), include: LabStaffIncludeObjectSchema.optional(), data: z.union([LabStaffUpdateInputObjectSchema, LabStaffUncheckedUpdateInputObjectSchema]), where: LabStaffWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabStaffUpdateArgs>;

export const LabStaffUpdateOneZodSchema = z.object({ select: LabStaffSelectObjectSchema.optional(), include: LabStaffIncludeObjectSchema.optional(), data: z.union([LabStaffUpdateInputObjectSchema, LabStaffUncheckedUpdateInputObjectSchema]), where: LabStaffWhereUniqueInputObjectSchema }).strict();