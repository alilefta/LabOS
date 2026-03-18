import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutCaseItemsInputObjectSchema as CaseCreateWithoutCaseItemsInputObjectSchema } from './CaseCreateWithoutCaseItemsInput.schema';
import { CaseUncheckedCreateWithoutCaseItemsInputObjectSchema as CaseUncheckedCreateWithoutCaseItemsInputObjectSchema } from './CaseUncheckedCreateWithoutCaseItemsInput.schema';
import { CaseCreateOrConnectWithoutCaseItemsInputObjectSchema as CaseCreateOrConnectWithoutCaseItemsInputObjectSchema } from './CaseCreateOrConnectWithoutCaseItemsInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCaseItemsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutCaseItemsInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseCreateNestedOneWithoutCaseItemsInputObjectSchema: z.ZodType<Prisma.CaseCreateNestedOneWithoutCaseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateNestedOneWithoutCaseItemsInput>;
export const CaseCreateNestedOneWithoutCaseItemsInputObjectZodSchema = makeSchema();
