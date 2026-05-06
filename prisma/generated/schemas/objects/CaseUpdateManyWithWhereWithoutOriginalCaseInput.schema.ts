import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema';
import { CaseUpdateManyMutationInputObjectSchema as CaseUpdateManyMutationInputObjectSchema } from './CaseUpdateManyMutationInput.schema';
import { CaseUncheckedUpdateManyWithoutOriginalCaseInputObjectSchema as CaseUncheckedUpdateManyWithoutOriginalCaseInputObjectSchema } from './CaseUncheckedUpdateManyWithoutOriginalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateManyMutationInputObjectSchema), z.lazy(() => CaseUncheckedUpdateManyWithoutOriginalCaseInputObjectSchema)])
}).strict();
export const CaseUpdateManyWithWhereWithoutOriginalCaseInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutOriginalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutOriginalCaseInput>;
export const CaseUpdateManyWithWhereWithoutOriginalCaseInputObjectZodSchema = makeSchema();
