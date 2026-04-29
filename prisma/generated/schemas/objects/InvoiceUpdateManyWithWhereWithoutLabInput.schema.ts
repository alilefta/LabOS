import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceScalarWhereInputObjectSchema as InvoiceScalarWhereInputObjectSchema } from './InvoiceScalarWhereInput.schema';
import { InvoiceUpdateManyMutationInputObjectSchema as InvoiceUpdateManyMutationInputObjectSchema } from './InvoiceUpdateManyMutationInput.schema';
import { InvoiceUncheckedUpdateManyWithoutLabInputObjectSchema as InvoiceUncheckedUpdateManyWithoutLabInputObjectSchema } from './InvoiceUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InvoiceUpdateManyMutationInputObjectSchema), z.lazy(() => InvoiceUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const InvoiceUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoiceUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUpdateManyWithWhereWithoutLabInput>;
export const InvoiceUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
