import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceWhereInputObjectSchema as InvoiceWhereInputObjectSchema } from './InvoiceWhereInput.schema';
import { InvoiceUpdateWithoutCasesInputObjectSchema as InvoiceUpdateWithoutCasesInputObjectSchema } from './InvoiceUpdateWithoutCasesInput.schema';
import { InvoiceUncheckedUpdateWithoutCasesInputObjectSchema as InvoiceUncheckedUpdateWithoutCasesInputObjectSchema } from './InvoiceUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => InvoiceUpdateWithoutCasesInputObjectSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutCasesInputObjectSchema)])
}).strict();
export const InvoiceUpdateToOneWithWhereWithoutCasesInputObjectSchema: z.ZodType<Prisma.InvoiceUpdateToOneWithWhereWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUpdateToOneWithWhereWithoutCasesInput>;
export const InvoiceUpdateToOneWithWhereWithoutCasesInputObjectZodSchema = makeSchema();
