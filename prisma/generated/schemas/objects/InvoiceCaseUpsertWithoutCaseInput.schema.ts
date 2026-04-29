import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseUpdateWithoutCaseInputObjectSchema as InvoiceCaseUpdateWithoutCaseInputObjectSchema } from './InvoiceCaseUpdateWithoutCaseInput.schema';
import { InvoiceCaseUncheckedUpdateWithoutCaseInputObjectSchema as InvoiceCaseUncheckedUpdateWithoutCaseInputObjectSchema } from './InvoiceCaseUncheckedUpdateWithoutCaseInput.schema';
import { InvoiceCaseCreateWithoutCaseInputObjectSchema as InvoiceCaseCreateWithoutCaseInputObjectSchema } from './InvoiceCaseCreateWithoutCaseInput.schema';
import { InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema as InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutCaseInput.schema';
import { InvoiceCaseWhereInputObjectSchema as InvoiceCaseWhereInputObjectSchema } from './InvoiceCaseWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => InvoiceCaseUpdateWithoutCaseInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedUpdateWithoutCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutCaseInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema)]),
  where: z.lazy(() => InvoiceCaseWhereInputObjectSchema).optional()
}).strict();
export const InvoiceCaseUpsertWithoutCaseInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpsertWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpsertWithoutCaseInput>;
export const InvoiceCaseUpsertWithoutCaseInputObjectZodSchema = makeSchema();
