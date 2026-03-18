import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema';
import { CaseUpdateManyMutationInputObjectSchema as CaseUpdateManyMutationInputObjectSchema } from './CaseUpdateManyMutationInput.schema';
import { CaseUncheckedUpdateManyWithoutPatientInputObjectSchema as CaseUncheckedUpdateManyWithoutPatientInputObjectSchema } from './CaseUncheckedUpdateManyWithoutPatientInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateManyMutationInputObjectSchema), z.lazy(() => CaseUncheckedUpdateManyWithoutPatientInputObjectSchema)])
}).strict();
export const CaseUpdateManyWithWhereWithoutPatientInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutPatientInput>;
export const CaseUpdateManyWithWhereWithoutPatientInputObjectZodSchema = makeSchema();
