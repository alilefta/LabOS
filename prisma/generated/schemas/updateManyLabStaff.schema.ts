import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffUpdateManyMutationInputObjectSchema as LabStaffUpdateManyMutationInputObjectSchema } from './objects/LabStaffUpdateManyMutationInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './objects/LabStaffWhereInput.schema';

export const LabStaffUpdateManySchema: z.ZodType<Prisma.LabStaffUpdateManyArgs> = z.object({ data: LabStaffUpdateManyMutationInputObjectSchema, where: LabStaffWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffUpdateManyArgs>;

export const LabStaffUpdateManyZodSchema = z.object({ data: LabStaffUpdateManyMutationInputObjectSchema, where: LabStaffWhereInputObjectSchema.optional() }).strict();