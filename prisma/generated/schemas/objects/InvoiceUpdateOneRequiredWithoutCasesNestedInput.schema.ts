import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCreateWithoutCasesInputObjectSchema as InvoiceCreateWithoutCasesInputObjectSchema } from './InvoiceCreateWithoutCasesInput.schema';
import { InvoiceUncheckedCreateWithoutCasesInputObjectSchema as InvoiceUncheckedCreateWithoutCasesInputObjectSchema } from './InvoiceUncheckedCreateWithoutCasesInput.schema';
import { InvoiceCreateOrConnectWithoutCasesInputObjectSchema as InvoiceCreateOrConnectWithoutCasesInputObjectSchema } from './InvoiceCreateOrConnectWithoutCasesInput.schema';
import { InvoiceUpsertWithoutCasesInputObjectSchema as InvoiceUpsertWithoutCasesInputObjectSchema } from './InvoiceUpsertWithoutCasesInput.schema';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema';
import { InvoiceUpdateToOneWithWhereWithoutCasesInputObjectSchema as InvoiceUpdateToOneWithWhereWithoutCasesInputObjectSchema } from './InvoiceUpdateToOneWithWhereWithoutCasesInput.schema';
import { InvoiceUpdateWithoutCasesInputObjectSchema as InvoiceUpdateWithoutCasesInputObjectSchema } from './InvoiceUpdateWithoutCasesInput.schema';
import { InvoiceUncheckedUpdateWithoutCasesInputObjectSchema as InvoiceUncheckedUpdateWithoutCasesInputObjectSchema } from './InvoiceUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCreateWithoutCasesInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  upsert: z.lazy(() => InvoiceUpsertWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => InvoiceUpdateToOneWithWhereWithoutCasesInputObjectSchema), z.lazy(() => InvoiceUpdateWithoutCasesInputObjectSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutCasesInputObjectSchema)]).optional()
}).strict();
export const InvoiceUpdateOneRequiredWithoutCasesNestedInputObjectSchema: z.ZodType<Prisma.InvoiceUpdateOneRequiredWithoutCasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUpdateOneRequiredWithoutCasesNestedInput>;
export const InvoiceUpdateOneRequiredWithoutCasesNestedInputObjectZodSchema = makeSchema();
