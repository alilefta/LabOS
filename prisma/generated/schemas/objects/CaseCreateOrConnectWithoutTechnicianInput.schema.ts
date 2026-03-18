import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutTechnicianInputObjectSchema as CaseCreateWithoutTechnicianInputObjectSchema } from './CaseCreateWithoutTechnicianInput.schema';
import { CaseUncheckedCreateWithoutTechnicianInputObjectSchema as CaseUncheckedCreateWithoutTechnicianInputObjectSchema } from './CaseUncheckedCreateWithoutTechnicianInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutTechnicianInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutTechnicianInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutTechnicianInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutTechnicianInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutTechnicianInput>;
export const CaseCreateOrConnectWithoutTechnicianInputObjectZodSchema = makeSchema();
