import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutCaseItemsInputObjectSchema as CaseCreateWithoutCaseItemsInputObjectSchema } from './CaseCreateWithoutCaseItemsInput.schema';
import { CaseUncheckedCreateWithoutCaseItemsInputObjectSchema as CaseUncheckedCreateWithoutCaseItemsInputObjectSchema } from './CaseUncheckedCreateWithoutCaseItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutCaseItemsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseItemsInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutCaseItemsInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutCaseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutCaseItemsInput>;
export const CaseCreateOrConnectWithoutCaseItemsInputObjectZodSchema = makeSchema();
