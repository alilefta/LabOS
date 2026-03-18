import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutClinicInputObjectSchema as CaseUpdateWithoutClinicInputObjectSchema } from './CaseUpdateWithoutClinicInput.schema';
import { CaseUncheckedUpdateWithoutClinicInputObjectSchema as CaseUncheckedUpdateWithoutClinicInputObjectSchema } from './CaseUncheckedUpdateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateWithoutClinicInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutClinicInputObjectSchema)])
}).strict();
export const CaseUpdateWithWhereUniqueWithoutClinicInputObjectSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutClinicInput>;
export const CaseUpdateWithWhereUniqueWithoutClinicInputObjectZodSchema = makeSchema();
