import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema';
import { InvoiceUpdateWithoutClinicInputObjectSchema as InvoiceUpdateWithoutClinicInputObjectSchema } from './InvoiceUpdateWithoutClinicInput.schema';
import { InvoiceUncheckedUpdateWithoutClinicInputObjectSchema as InvoiceUncheckedUpdateWithoutClinicInputObjectSchema } from './InvoiceUncheckedUpdateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InvoiceUpdateWithoutClinicInputObjectSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutClinicInputObjectSchema)])
}).strict();
export const InvoiceUpdateWithWhereUniqueWithoutClinicInputObjectSchema: z.ZodType<Prisma.InvoiceUpdateWithWhereUniqueWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUpdateWithWhereUniqueWithoutClinicInput>;
export const InvoiceUpdateWithWhereUniqueWithoutClinicInputObjectZodSchema = makeSchema();
