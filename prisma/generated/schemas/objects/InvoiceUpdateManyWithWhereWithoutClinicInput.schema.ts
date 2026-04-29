import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceScalarWhereInputObjectSchema as InvoiceScalarWhereInputObjectSchema } from './InvoiceScalarWhereInput.schema';
import { InvoiceUpdateManyMutationInputObjectSchema as InvoiceUpdateManyMutationInputObjectSchema } from './InvoiceUpdateManyMutationInput.schema';
import { InvoiceUncheckedUpdateManyWithoutClinicInputObjectSchema as InvoiceUncheckedUpdateManyWithoutClinicInputObjectSchema } from './InvoiceUncheckedUpdateManyWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InvoiceUpdateManyMutationInputObjectSchema), z.lazy(() => InvoiceUncheckedUpdateManyWithoutClinicInputObjectSchema)])
}).strict();
export const InvoiceUpdateManyWithWhereWithoutClinicInputObjectSchema: z.ZodType<Prisma.InvoiceUpdateManyWithWhereWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUpdateManyWithWhereWithoutClinicInput>;
export const InvoiceUpdateManyWithWhereWithoutClinicInputObjectZodSchema = makeSchema();
