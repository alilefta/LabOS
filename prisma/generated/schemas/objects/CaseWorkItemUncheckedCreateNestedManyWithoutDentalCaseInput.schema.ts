import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutDentalCaseInputObjectSchema as CaseWorkItemCreateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemCreateWithoutDentalCaseInput.schema';
import { CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutDentalCaseInput.schema';
import { CaseWorkItemCreateOrConnectWithoutDentalCaseInputObjectSchema as CaseWorkItemCreateOrConnectWithoutDentalCaseInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutDentalCaseInput.schema';
import { CaseWorkItemCreateManyDentalCaseInputEnvelopeObjectSchema as CaseWorkItemCreateManyDentalCaseInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyDentalCaseInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutDentalCaseInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutDentalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutDentalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyDentalCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInput>;
export const CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInputObjectZodSchema = makeSchema();
