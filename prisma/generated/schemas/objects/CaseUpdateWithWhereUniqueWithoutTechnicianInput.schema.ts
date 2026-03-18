import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutTechnicianInputObjectSchema as CaseUpdateWithoutTechnicianInputObjectSchema } from './CaseUpdateWithoutTechnicianInput.schema';
import { CaseUncheckedUpdateWithoutTechnicianInputObjectSchema as CaseUncheckedUpdateWithoutTechnicianInputObjectSchema } from './CaseUncheckedUpdateWithoutTechnicianInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateWithoutTechnicianInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutTechnicianInputObjectSchema)])
}).strict();
export const CaseUpdateWithWhereUniqueWithoutTechnicianInputObjectSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutTechnicianInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutTechnicianInput>;
export const CaseUpdateWithWhereUniqueWithoutTechnicianInputObjectZodSchema = makeSchema();
