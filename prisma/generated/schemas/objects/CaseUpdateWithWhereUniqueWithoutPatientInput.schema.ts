import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutPatientInputObjectSchema as CaseUpdateWithoutPatientInputObjectSchema } from './CaseUpdateWithoutPatientInput.schema';
import { CaseUncheckedUpdateWithoutPatientInputObjectSchema as CaseUncheckedUpdateWithoutPatientInputObjectSchema } from './CaseUncheckedUpdateWithoutPatientInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateWithoutPatientInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutPatientInputObjectSchema)])
}).strict();
export const CaseUpdateWithWhereUniqueWithoutPatientInputObjectSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutPatientInput>;
export const CaseUpdateWithWhereUniqueWithoutPatientInputObjectZodSchema = makeSchema();
