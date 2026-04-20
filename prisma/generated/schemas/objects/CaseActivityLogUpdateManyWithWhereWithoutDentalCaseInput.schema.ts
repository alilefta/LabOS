import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogScalarWhereInputObjectSchema as CaseActivityLogScalarWhereInputObjectSchema } from './CaseActivityLogScalarWhereInput.schema';
import { CaseActivityLogUpdateManyMutationInputObjectSchema as CaseActivityLogUpdateManyMutationInputObjectSchema } from './CaseActivityLogUpdateManyMutationInput.schema';
import { CaseActivityLogUncheckedUpdateManyWithoutDentalCaseInputObjectSchema as CaseActivityLogUncheckedUpdateManyWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUncheckedUpdateManyWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseActivityLogUpdateManyMutationInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateManyWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseActivityLogUpdateManyWithWhereWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpdateManyWithWhereWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateManyWithWhereWithoutDentalCaseInput>;
export const CaseActivityLogUpdateManyWithWhereWithoutDentalCaseInputObjectZodSchema = makeSchema();
