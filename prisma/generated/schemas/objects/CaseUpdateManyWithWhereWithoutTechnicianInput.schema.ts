import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema';
import { CaseUpdateManyMutationInputObjectSchema as CaseUpdateManyMutationInputObjectSchema } from './CaseUpdateManyMutationInput.schema';
import { CaseUncheckedUpdateManyWithoutTechnicianInputObjectSchema as CaseUncheckedUpdateManyWithoutTechnicianInputObjectSchema } from './CaseUncheckedUpdateManyWithoutTechnicianInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateManyMutationInputObjectSchema), z.lazy(() => CaseUncheckedUpdateManyWithoutTechnicianInputObjectSchema)])
}).strict();
export const CaseUpdateManyWithWhereWithoutTechnicianInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutTechnicianInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutTechnicianInput>;
export const CaseUpdateManyWithWhereWithoutTechnicianInputObjectZodSchema = makeSchema();
