import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema';
import { InvoiceUpdateWithoutClinicInputObjectSchema as InvoiceUpdateWithoutClinicInputObjectSchema } from './InvoiceUpdateWithoutClinicInput.schema';
import { InvoiceUncheckedUpdateWithoutClinicInputObjectSchema as InvoiceUncheckedUpdateWithoutClinicInputObjectSchema } from './InvoiceUncheckedUpdateWithoutClinicInput.schema';
import { InvoiceCreateWithoutClinicInputObjectSchema as InvoiceCreateWithoutClinicInputObjectSchema } from './InvoiceCreateWithoutClinicInput.schema';
import { InvoiceUncheckedCreateWithoutClinicInputObjectSchema as InvoiceUncheckedCreateWithoutClinicInputObjectSchema } from './InvoiceUncheckedCreateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InvoiceUpdateWithoutClinicInputObjectSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutClinicInputObjectSchema)]),
  create: z.union([z.lazy(() => InvoiceCreateWithoutClinicInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutClinicInputObjectSchema)])
}).strict();
export const InvoiceUpsertWithWhereUniqueWithoutClinicInputObjectSchema: z.ZodType<Prisma.InvoiceUpsertWithWhereUniqueWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceUpsertWithWhereUniqueWithoutClinicInput>;
export const InvoiceUpsertWithWhereUniqueWithoutClinicInputObjectZodSchema = makeSchema();
