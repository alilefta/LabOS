import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffSelectObjectSchema as LabStaffSelectObjectSchema } from './objects/LabStaffSelect.schema';
import { LabStaffIncludeObjectSchema as LabStaffIncludeObjectSchema } from './objects/LabStaffInclude.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './objects/LabStaffWhereUniqueInput.schema';

export const LabStaffFindUniqueOrThrowSchema: z.ZodType<Prisma.LabStaffFindUniqueOrThrowArgs> = z.object({ select: LabStaffSelectObjectSchema.optional(), include: LabStaffIncludeObjectSchema.optional(), where: LabStaffWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabStaffFindUniqueOrThrowArgs>;

export const LabStaffFindUniqueOrThrowZodSchema = z.object({ select: LabStaffSelectObjectSchema.optional(), include: LabStaffIncludeObjectSchema.optional(), where: LabStaffWhereUniqueInputObjectSchema }).strict();