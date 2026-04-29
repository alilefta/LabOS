import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema';
import { InvoiceCreateWithoutCasesInputObjectSchema as InvoiceCreateWithoutCasesInputObjectSchema } from './InvoiceCreateWithoutCasesInput.schema';
import { InvoiceUncheckedCreateWithoutCasesInputObjectSchema as InvoiceUncheckedCreateWithoutCasesInputObjectSchema } from './InvoiceUncheckedCreateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvoiceCreateWithoutCasesInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutCasesInputObjectSchema)])
}).strict();
export const InvoiceCreateOrConnectWithoutCasesInputObjectSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCreateOrConnectWithoutCasesInput>;
export const InvoiceCreateOrConnectWithoutCasesInputObjectZodSchema = makeSchema();
