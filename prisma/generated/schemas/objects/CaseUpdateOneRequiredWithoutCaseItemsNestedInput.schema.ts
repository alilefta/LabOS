import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutCaseItemsInputObjectSchema as CaseCreateWithoutCaseItemsInputObjectSchema } from './CaseCreateWithoutCaseItemsInput.schema';
import { CaseUncheckedCreateWithoutCaseItemsInputObjectSchema as CaseUncheckedCreateWithoutCaseItemsInputObjectSchema } from './CaseUncheckedCreateWithoutCaseItemsInput.schema';
import { CaseCreateOrConnectWithoutCaseItemsInputObjectSchema as CaseCreateOrConnectWithoutCaseItemsInputObjectSchema } from './CaseCreateOrConnectWithoutCaseItemsInput.schema';
import { CaseUpsertWithoutCaseItemsInputObjectSchema as CaseUpsertWithoutCaseItemsInputObjectSchema } from './CaseUpsertWithoutCaseItemsInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateToOneWithWhereWithoutCaseItemsInputObjectSchema as CaseUpdateToOneWithWhereWithoutCaseItemsInputObjectSchema } from './CaseUpdateToOneWithWhereWithoutCaseItemsInput.schema';
import { CaseUpdateWithoutCaseItemsInputObjectSchema as CaseUpdateWithoutCaseItemsInputObjectSchema } from './CaseUpdateWithoutCaseItemsInput.schema';
import { CaseUncheckedUpdateWithoutCaseItemsInputObjectSchema as CaseUncheckedUpdateWithoutCaseItemsInputObjectSchema } from './CaseUncheckedUpdateWithoutCaseItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCaseItemsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutCaseItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseUpsertWithoutCaseItemsInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseUpdateToOneWithWhereWithoutCaseItemsInputObjectSchema), z.lazy(() => CaseUpdateWithoutCaseItemsInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutCaseItemsInputObjectSchema)]).optional()
}).strict();
export const CaseUpdateOneRequiredWithoutCaseItemsNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateOneRequiredWithoutCaseItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateOneRequiredWithoutCaseItemsNestedInput>;
export const CaseUpdateOneRequiredWithoutCaseItemsNestedInputObjectZodSchema = makeSchema();
