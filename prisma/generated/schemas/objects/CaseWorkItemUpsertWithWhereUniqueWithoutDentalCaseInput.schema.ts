import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutDentalCaseInputObjectSchema as CaseWorkItemUpdateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUpdateWithoutDentalCaseInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutDentalCaseInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutDentalCaseInput.schema';
import { CaseWorkItemCreateWithoutDentalCaseInputObjectSchema as CaseWorkItemCreateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemCreateWithoutDentalCaseInput.schema';
import { CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutDentalCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseWorkItemUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutDentalCaseInput>;
export const CaseWorkItemUpsertWithWhereUniqueWithoutDentalCaseInputObjectZodSchema = makeSchema();
