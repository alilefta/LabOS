import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutOriginalCaseInputObjectSchema as CaseCreateWithoutOriginalCaseInputObjectSchema } from './CaseCreateWithoutOriginalCaseInput.schema';
import { CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema as CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema } from './CaseUncheckedCreateWithoutOriginalCaseInput.schema';
import { CaseCreateOrConnectWithoutOriginalCaseInputObjectSchema as CaseCreateOrConnectWithoutOriginalCaseInputObjectSchema } from './CaseCreateOrConnectWithoutOriginalCaseInput.schema';
import { CaseCreateManyOriginalCaseInputEnvelopeObjectSchema as CaseCreateManyOriginalCaseInputEnvelopeObjectSchema } from './CaseCreateManyOriginalCaseInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseCreateWithoutOriginalCaseInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutOriginalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyOriginalCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseUncheckedCreateNestedManyWithoutOriginalCaseInputObjectSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutOriginalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutOriginalCaseInput>;
export const CaseUncheckedCreateNestedManyWithoutOriginalCaseInputObjectZodSchema = makeSchema();
