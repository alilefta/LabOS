import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogScalarWhereInputObjectSchema as CaseActivityLogScalarWhereInputObjectSchema } from './CaseActivityLogScalarWhereInput.schema';
import { CaseActivityLogUpdateManyMutationInputObjectSchema as CaseActivityLogUpdateManyMutationInputObjectSchema } from './CaseActivityLogUpdateManyMutationInput.schema';
import { CaseActivityLogUncheckedUpdateManyWithoutCaseInputObjectSchema as CaseActivityLogUncheckedUpdateManyWithoutCaseInputObjectSchema } from './CaseActivityLogUncheckedUpdateManyWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseActivityLogUpdateManyMutationInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateManyWithoutCaseInputObjectSchema)])
}).strict();
export const CaseActivityLogUpdateManyWithWhereWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpdateManyWithWhereWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateManyWithWhereWithoutCaseInput>;
export const CaseActivityLogUpdateManyWithWhereWithoutCaseInputObjectZodSchema = makeSchema();
