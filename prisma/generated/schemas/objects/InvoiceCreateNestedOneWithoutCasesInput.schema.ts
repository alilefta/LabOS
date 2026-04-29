import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCreateWithoutCasesInputObjectSchema as InvoiceCreateWithoutCasesInputObjectSchema } from './InvoiceCreateWithoutCasesInput.schema';
import { InvoiceUncheckedCreateWithoutCasesInputObjectSchema as InvoiceUncheckedCreateWithoutCasesInputObjectSchema } from './InvoiceUncheckedCreateWithoutCasesInput.schema';
import { InvoiceCreateOrConnectWithoutCasesInputObjectSchema as InvoiceCreateOrConnectWithoutCasesInputObjectSchema } from './InvoiceCreateOrConnectWithoutCasesInput.schema';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCreateWithoutCasesInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputObjectSchema).optional()
}).strict();
export const InvoiceCreateNestedOneWithoutCasesInputObjectSchema: z.ZodType<Prisma.InvoiceCreateNestedOneWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCreateNestedOneWithoutCasesInput>;
export const InvoiceCreateNestedOneWithoutCasesInputObjectZodSchema = makeSchema();
