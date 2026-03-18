import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema';
import { CaseUpdateManyMutationInputObjectSchema as CaseUpdateManyMutationInputObjectSchema } from './CaseUpdateManyMutationInput.schema';
import { CaseUncheckedUpdateManyWithoutLabInputObjectSchema as CaseUncheckedUpdateManyWithoutLabInputObjectSchema } from './CaseUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateManyMutationInputObjectSchema), z.lazy(() => CaseUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const CaseUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutLabInput>;
export const CaseUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
