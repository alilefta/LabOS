import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffSelectObjectSchema as LabStaffSelectObjectSchema } from './objects/LabStaffSelect.schema';
import { LabStaffUpdateManyMutationInputObjectSchema as LabStaffUpdateManyMutationInputObjectSchema } from './objects/LabStaffUpdateManyMutationInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './objects/LabStaffWhereInput.schema';

export const LabStaffUpdateManyAndReturnSchema: z.ZodType<Prisma.LabStaffUpdateManyAndReturnArgs> = z.object({ select: LabStaffSelectObjectSchema.optional(), data: LabStaffUpdateManyMutationInputObjectSchema, where: LabStaffWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffUpdateManyAndReturnArgs>;

export const LabStaffUpdateManyAndReturnZodSchema = z.object({ select: LabStaffSelectObjectSchema.optional(), data: LabStaffUpdateManyMutationInputObjectSchema, where: LabStaffWhereInputObjectSchema.optional() }).strict();