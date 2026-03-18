import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { CaseUpdateWithoutCaseItemsInputObjectSchema as CaseUpdateWithoutCaseItemsInputObjectSchema } from './CaseUpdateWithoutCaseItemsInput.schema';
import { CaseUncheckedUpdateWithoutCaseItemsInputObjectSchema as CaseUncheckedUpdateWithoutCaseItemsInputObjectSchema } from './CaseUncheckedUpdateWithoutCaseItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseUpdateWithoutCaseItemsInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutCaseItemsInputObjectSchema)])
}).strict();
export const CaseUpdateToOneWithWhereWithoutCaseItemsInputObjectSchema: z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutCaseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutCaseItemsInput>;
export const CaseUpdateToOneWithWhereWithoutCaseItemsInputObjectZodSchema = makeSchema();
