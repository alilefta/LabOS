import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutTechnicianInputObjectSchema as CaseUpdateWithoutTechnicianInputObjectSchema } from './CaseUpdateWithoutTechnicianInput.schema';
import { CaseUncheckedUpdateWithoutTechnicianInputObjectSchema as CaseUncheckedUpdateWithoutTechnicianInputObjectSchema } from './CaseUncheckedUpdateWithoutTechnicianInput.schema';
import { CaseCreateWithoutTechnicianInputObjectSchema as CaseCreateWithoutTechnicianInputObjectSchema } from './CaseCreateWithoutTechnicianInput.schema';
import { CaseUncheckedCreateWithoutTechnicianInputObjectSchema as CaseUncheckedCreateWithoutTechnicianInputObjectSchema } from './CaseUncheckedCreateWithoutTechnicianInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseUpdateWithoutTechnicianInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutTechnicianInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutTechnicianInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutTechnicianInputObjectSchema)])
}).strict();
export const CaseUpsertWithWhereUniqueWithoutTechnicianInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutTechnicianInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutTechnicianInput>;
export const CaseUpsertWithWhereUniqueWithoutTechnicianInputObjectZodSchema = makeSchema();
