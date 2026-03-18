import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientScalarWhereInputObjectSchema as PatientScalarWhereInputObjectSchema } from './PatientScalarWhereInput.schema';
import { PatientUpdateManyMutationInputObjectSchema as PatientUpdateManyMutationInputObjectSchema } from './PatientUpdateManyMutationInput.schema';
import { PatientUncheckedUpdateManyWithoutLabInputObjectSchema as PatientUncheckedUpdateManyWithoutLabInputObjectSchema } from './PatientUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PatientScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PatientUpdateManyMutationInputObjectSchema), z.lazy(() => PatientUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const PatientUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.PatientUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUpdateManyWithWhereWithoutLabInput>;
export const PatientUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
