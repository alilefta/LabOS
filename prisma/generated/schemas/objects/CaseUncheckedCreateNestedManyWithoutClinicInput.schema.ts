import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutClinicInputObjectSchema as CaseCreateWithoutClinicInputObjectSchema } from './CaseCreateWithoutClinicInput.schema';
import { CaseUncheckedCreateWithoutClinicInputObjectSchema as CaseUncheckedCreateWithoutClinicInputObjectSchema } from './CaseUncheckedCreateWithoutClinicInput.schema';
import { CaseCreateOrConnectWithoutClinicInputObjectSchema as CaseCreateOrConnectWithoutClinicInputObjectSchema } from './CaseCreateOrConnectWithoutClinicInput.schema';
import { CaseCreateManyClinicInputEnvelopeObjectSchema as CaseCreateManyClinicInputEnvelopeObjectSchema } from './CaseCreateManyClinicInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutClinicInputObjectSchema), z.lazy(() => CaseCreateWithoutClinicInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutClinicInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutClinicInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutClinicInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutClinicInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyClinicInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseUncheckedCreateNestedManyWithoutClinicInputObjectSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutClinicInput>;
export const CaseUncheckedCreateNestedManyWithoutClinicInputObjectZodSchema = makeSchema();
