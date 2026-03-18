import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutPatientInputObjectSchema as CaseCreateWithoutPatientInputObjectSchema } from './CaseCreateWithoutPatientInput.schema';
import { CaseUncheckedCreateWithoutPatientInputObjectSchema as CaseUncheckedCreateWithoutPatientInputObjectSchema } from './CaseUncheckedCreateWithoutPatientInput.schema';
import { CaseCreateOrConnectWithoutPatientInputObjectSchema as CaseCreateOrConnectWithoutPatientInputObjectSchema } from './CaseCreateOrConnectWithoutPatientInput.schema';
import { CaseCreateManyPatientInputEnvelopeObjectSchema as CaseCreateManyPatientInputEnvelopeObjectSchema } from './CaseCreateManyPatientInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutPatientInputObjectSchema), z.lazy(() => CaseCreateWithoutPatientInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutPatientInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutPatientInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutPatientInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutPatientInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyPatientInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseUncheckedCreateNestedManyWithoutPatientInputObjectSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutPatientInput>;
export const CaseUncheckedCreateNestedManyWithoutPatientInputObjectZodSchema = makeSchema();
