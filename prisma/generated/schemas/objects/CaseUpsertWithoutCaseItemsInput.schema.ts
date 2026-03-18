import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUpdateWithoutCaseItemsInputObjectSchema as CaseUpdateWithoutCaseItemsInputObjectSchema } from './CaseUpdateWithoutCaseItemsInput.schema';
import { CaseUncheckedUpdateWithoutCaseItemsInputObjectSchema as CaseUncheckedUpdateWithoutCaseItemsInputObjectSchema } from './CaseUncheckedUpdateWithoutCaseItemsInput.schema';
import { CaseCreateWithoutCaseItemsInputObjectSchema as CaseCreateWithoutCaseItemsInputObjectSchema } from './CaseCreateWithoutCaseItemsInput.schema';
import { CaseUncheckedCreateWithoutCaseItemsInputObjectSchema as CaseUncheckedCreateWithoutCaseItemsInputObjectSchema } from './CaseUncheckedCreateWithoutCaseItemsInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseUpdateWithoutCaseItemsInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutCaseItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutCaseItemsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseItemsInputObjectSchema)]),
  where: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const CaseUpsertWithoutCaseItemsInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithoutCaseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithoutCaseItemsInput>;
export const CaseUpsertWithoutCaseItemsInputObjectZodSchema = makeSchema();
