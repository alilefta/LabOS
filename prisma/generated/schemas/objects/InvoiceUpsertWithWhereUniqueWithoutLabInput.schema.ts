import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema';
import { InvoiceUpdateWithoutLabInputObjectSchema as InvoiceUpdateWithoutLabInputObjectSchema } from './InvoiceUpdateWithoutLabInput.schema';
import { InvoiceUncheckedUpdateWithoutLabInputObjectSchema as InvoiceUncheckedUpdateWithoutLabInputObjectSchema } from './InvoiceUncheckedUpdateWithoutLabInput.schema';
import { InvoiceCreateWithoutLabInputObjectSchema as InvoiceCreateWithoutLabInputObjectSchema } from './InvoiceCreateWithoutLabInput.schema';
import { InvoiceUncheckedCreateWithoutLabInputObjectSchema as InvoiceUncheckedCreateWithoutLabInputObjectSchema } from './InvoiceUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InvoiceUpdateWithoutLabInputObjectSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => InvoiceCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const InvoiceUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoiceUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUpsertWithWhereUniqueWithoutLabInput>;
export const InvoiceUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
