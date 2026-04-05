import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffScalarWhereInputObjectSchema as LabStaffScalarWhereInputObjectSchema } from './LabStaffScalarWhereInput.schema';
import { LabStaffUpdateManyMutationInputObjectSchema as LabStaffUpdateManyMutationInputObjectSchema } from './LabStaffUpdateManyMutationInput.schema';
import { LabStaffUncheckedUpdateManyWithoutLabInputObjectSchema as LabStaffUncheckedUpdateManyWithoutLabInputObjectSchema } from './LabStaffUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => LabStaffUpdateManyMutationInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const LabStaffUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateManyWithWhereWithoutLabInput>;
export const LabStaffUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
