import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistScalarWhereInputObjectSchema as DentistScalarWhereInputObjectSchema } from './DentistScalarWhereInput.schema';
import { DentistUpdateManyMutationInputObjectSchema as DentistUpdateManyMutationInputObjectSchema } from './DentistUpdateManyMutationInput.schema';
import { DentistUncheckedUpdateManyWithoutClinicInputObjectSchema as DentistUncheckedUpdateManyWithoutClinicInputObjectSchema } from './DentistUncheckedUpdateManyWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DentistScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => DentistUpdateManyMutationInputObjectSchema), z.lazy(() => DentistUncheckedUpdateManyWithoutClinicInputObjectSchema)])
}).strict();
export const DentistUpdateManyWithWhereWithoutClinicInputObjectSchema: z.ZodType<Prisma.DentistUpdateManyWithWhereWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpdateManyWithWhereWithoutClinicInput>;
export const DentistUpdateManyWithWhereWithoutClinicInputObjectZodSchema = makeSchema();
