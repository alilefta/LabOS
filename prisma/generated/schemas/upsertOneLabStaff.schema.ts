import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffSelectObjectSchema as LabStaffSelectObjectSchema } from './objects/LabStaffSelect.schema';
import { LabStaffIncludeObjectSchema as LabStaffIncludeObjectSchema } from './objects/LabStaffInclude.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './objects/LabStaffWhereUniqueInput.schema';
import { LabStaffCreateInputObjectSchema as LabStaffCreateInputObjectSchema } from './objects/LabStaffCreateInput.schema';
import { LabStaffUncheckedCreateInputObjectSchema as LabStaffUncheckedCreateInputObjectSchema } from './objects/LabStaffUncheckedCreateInput.schema';
import { LabStaffUpdateInputObjectSchema as LabStaffUpdateInputObjectSchema } from './objects/LabStaffUpdateInput.schema';
import { LabStaffUncheckedUpdateInputObjectSchema as LabStaffUncheckedUpdateInputObjectSchema } from './objects/LabStaffUncheckedUpdateInput.schema';

export const LabStaffUpsertOneSchema: z.ZodType<Prisma.LabStaffUpsertArgs> = z.object({ select: LabStaffSelectObjectSchema.optional(), include: LabStaffIncludeObjectSchema.optional(), where: LabStaffWhereUniqueInputObjectSchema, create: z.union([ LabStaffCreateInputObjectSchema, LabStaffUncheckedCreateInputObjectSchema ]), update: z.union([ LabStaffUpdateInputObjectSchema, LabStaffUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.LabStaffUpsertArgs>;

export const LabStaffUpsertOneZodSchema = z.object({ select: LabStaffSelectObjectSchema.optional(), include: LabStaffIncludeObjectSchema.optional(), where: LabStaffWhereUniqueInputObjectSchema, create: z.union([ LabStaffCreateInputObjectSchema, LabStaffUncheckedCreateInputObjectSchema ]), update: z.union([ LabStaffUpdateInputObjectSchema, LabStaffUncheckedUpdateInputObjectSchema ]) }).strict();