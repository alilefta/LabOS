import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutDentalCaseInputObjectSchema as CaseWorkItemUpdateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUpdateWithoutDentalCaseInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutDentalCaseInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemUpdateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutDentalCaseInput>;
export const CaseWorkItemUpdateWithWhereUniqueWithoutDentalCaseInputObjectZodSchema = makeSchema();
