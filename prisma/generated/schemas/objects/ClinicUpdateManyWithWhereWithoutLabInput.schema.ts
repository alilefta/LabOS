import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicScalarWhereInputObjectSchema as ClinicScalarWhereInputObjectSchema } from './ClinicScalarWhereInput.schema';
import { ClinicUpdateManyMutationInputObjectSchema as ClinicUpdateManyMutationInputObjectSchema } from './ClinicUpdateManyMutationInput.schema';
import { ClinicUncheckedUpdateManyWithoutLabInputObjectSchema as ClinicUncheckedUpdateManyWithoutLabInputObjectSchema } from './ClinicUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ClinicUpdateManyMutationInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const ClinicUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.ClinicUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpdateManyWithWhereWithoutLabInput>;
export const ClinicUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
