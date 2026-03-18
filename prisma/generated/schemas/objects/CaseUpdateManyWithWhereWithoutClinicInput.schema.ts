import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema';
import { CaseUpdateManyMutationInputObjectSchema as CaseUpdateManyMutationInputObjectSchema } from './CaseUpdateManyMutationInput.schema';
import { CaseUncheckedUpdateManyWithoutClinicInputObjectSchema as CaseUncheckedUpdateManyWithoutClinicInputObjectSchema } from './CaseUncheckedUpdateManyWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateManyMutationInputObjectSchema), z.lazy(() => CaseUncheckedUpdateManyWithoutClinicInputObjectSchema)])
}).strict();
export const CaseUpdateManyWithWhereWithoutClinicInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutClinicInput>;
export const CaseUpdateManyWithWhereWithoutClinicInputObjectZodSchema = makeSchema();
