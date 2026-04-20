import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogScalarWhereInputObjectSchema as CaseActivityLogScalarWhereInputObjectSchema } from './CaseActivityLogScalarWhereInput.schema';
import { CaseActivityLogUpdateManyMutationInputObjectSchema as CaseActivityLogUpdateManyMutationInputObjectSchema } from './CaseActivityLogUpdateManyMutationInput.schema';
import { CaseActivityLogUncheckedUpdateManyWithoutLabInputObjectSchema as CaseActivityLogUncheckedUpdateManyWithoutLabInputObjectSchema } from './CaseActivityLogUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseActivityLogUpdateManyMutationInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const CaseActivityLogUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateManyWithWhereWithoutLabInput>;
export const CaseActivityLogUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
