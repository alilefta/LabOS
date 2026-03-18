import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutClinicInputObjectSchema as CaseCreateWithoutClinicInputObjectSchema } from './CaseCreateWithoutClinicInput.schema';
import { CaseUncheckedCreateWithoutClinicInputObjectSchema as CaseUncheckedCreateWithoutClinicInputObjectSchema } from './CaseUncheckedCreateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutClinicInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutClinicInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutClinicInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutClinicInput>;
export const CaseCreateOrConnectWithoutClinicInputObjectZodSchema = makeSchema();
