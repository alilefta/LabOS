import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemCreateWithoutDentalCaseInputObjectSchema as CaseWorkItemCreateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemCreateWithoutDentalCaseInput.schema';
import { CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseWorkItemCreateOrConnectWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutDentalCaseInput>;
export const CaseWorkItemCreateOrConnectWithoutDentalCaseInputObjectZodSchema = makeSchema();
