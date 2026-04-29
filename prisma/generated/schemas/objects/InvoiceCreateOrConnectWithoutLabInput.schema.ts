import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema';
import { InvoiceCreateWithoutLabInputObjectSchema as InvoiceCreateWithoutLabInputObjectSchema } from './InvoiceCreateWithoutLabInput.schema';
import { InvoiceUncheckedCreateWithoutLabInputObjectSchema as InvoiceUncheckedCreateWithoutLabInputObjectSchema } from './InvoiceUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvoiceCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const InvoiceCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCreateOrConnectWithoutLabInput>;
export const InvoiceCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
