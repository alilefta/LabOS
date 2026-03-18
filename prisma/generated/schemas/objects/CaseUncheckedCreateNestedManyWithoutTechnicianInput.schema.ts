import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutTechnicianInputObjectSchema as CaseCreateWithoutTechnicianInputObjectSchema } from './CaseCreateWithoutTechnicianInput.schema';
import { CaseUncheckedCreateWithoutTechnicianInputObjectSchema as CaseUncheckedCreateWithoutTechnicianInputObjectSchema } from './CaseUncheckedCreateWithoutTechnicianInput.schema';
import { CaseCreateOrConnectWithoutTechnicianInputObjectSchema as CaseCreateOrConnectWithoutTechnicianInputObjectSchema } from './CaseCreateOrConnectWithoutTechnicianInput.schema';
import { CaseCreateManyTechnicianInputEnvelopeObjectSchema as CaseCreateManyTechnicianInputEnvelopeObjectSchema } from './CaseCreateManyTechnicianInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutTechnicianInputObjectSchema), z.lazy(() => CaseCreateWithoutTechnicianInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutTechnicianInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutTechnicianInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutTechnicianInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutTechnicianInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyTechnicianInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseUncheckedCreateNestedManyWithoutTechnicianInputObjectSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutTechnicianInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutTechnicianInput>;
export const CaseUncheckedCreateNestedManyWithoutTechnicianInputObjectZodSchema = makeSchema();
