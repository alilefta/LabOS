import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceUpdateWithoutCasesInputObjectSchema as InvoiceUpdateWithoutCasesInputObjectSchema } from './InvoiceUpdateWithoutCasesInput.schema';
import { InvoiceUncheckedUpdateWithoutCasesInputObjectSchema as InvoiceUncheckedUpdateWithoutCasesInputObjectSchema } from './InvoiceUncheckedUpdateWithoutCasesInput.schema';
import { InvoiceCreateWithoutCasesInputObjectSchema as InvoiceCreateWithoutCasesInputObjectSchema } from './InvoiceCreateWithoutCasesInput.schema';
import { InvoiceUncheckedCreateWithoutCasesInputObjectSchema as InvoiceUncheckedCreateWithoutCasesInputObjectSchema } from './InvoiceUncheckedCreateWithoutCasesInput.schema';
import { InvoiceWhereInputObjectSchema as InvoiceWhereInputObjectSchema } from './InvoiceWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => InvoiceUpdateWithoutCasesInputObjectSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutCasesInputObjectSchema)]),
  create: z.union([z.lazy(() => InvoiceCreateWithoutCasesInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutCasesInputObjectSchema)]),
  where: z.lazy(() => InvoiceWhereInputObjectSchema).optional()
}).strict();
export const InvoiceUpsertWithoutCasesInputObjectSchema: z.ZodType<Prisma.InvoiceUpsertWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUpsertWithoutCasesInput>;
export const InvoiceUpsertWithoutCasesInputObjectZodSchema = makeSchema();
