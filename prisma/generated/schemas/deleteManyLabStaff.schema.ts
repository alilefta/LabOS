import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './objects/LabStaffWhereInput.schema';

export const LabStaffDeleteManySchema: z.ZodType<Prisma.LabStaffDeleteManyArgs> = z.object({ where: LabStaffWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffDeleteManyArgs>;

export const LabStaffDeleteManyZodSchema = z.object({ where: LabStaffWhereInputObjectSchema.optional() }).strict();