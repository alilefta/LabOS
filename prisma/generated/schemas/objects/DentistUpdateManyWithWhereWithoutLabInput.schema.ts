import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistScalarWhereInputObjectSchema as DentistScalarWhereInputObjectSchema } from './DentistScalarWhereInput.schema';
import { DentistUpdateManyMutationInputObjectSchema as DentistUpdateManyMutationInputObjectSchema } from './DentistUpdateManyMutationInput.schema';
import { DentistUncheckedUpdateManyWithoutLabInputObjectSchema as DentistUncheckedUpdateManyWithoutLabInputObjectSchema } from './DentistUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DentistScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => DentistUpdateManyMutationInputObjectSchema), z.lazy(() => DentistUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const DentistUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.DentistUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpdateManyWithWhereWithoutLabInput>;
export const DentistUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
