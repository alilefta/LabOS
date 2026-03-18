import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutPatientInputObjectSchema as CaseCreateWithoutPatientInputObjectSchema } from './CaseCreateWithoutPatientInput.schema';
import { CaseUncheckedCreateWithoutPatientInputObjectSchema as CaseUncheckedCreateWithoutPatientInputObjectSchema } from './CaseUncheckedCreateWithoutPatientInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutPatientInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutPatientInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutPatientInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutPatientInput>;
export const CaseCreateOrConnectWithoutPatientInputObjectZodSchema = makeSchema();
