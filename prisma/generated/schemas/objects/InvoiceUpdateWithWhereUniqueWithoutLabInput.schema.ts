import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema';
import { InvoiceUpdateWithoutLabInputObjectSchema as InvoiceUpdateWithoutLabInputObjectSchema } from './InvoiceUpdateWithoutLabInput.schema';
import { InvoiceUncheckedUpdateWithoutLabInputObjectSchema as InvoiceUncheckedUpdateWithoutLabInputObjectSchema } from './InvoiceUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InvoiceUpdateWithoutLabInputObjectSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const InvoiceUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoiceUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUpdateWithWhereUniqueWithoutLabInput>;
export const InvoiceUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
