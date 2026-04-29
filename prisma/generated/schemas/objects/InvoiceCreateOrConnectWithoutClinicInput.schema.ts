import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceWhereUniqueInputObjectSchema as InvoiceWhereUniqueInputObjectSchema } from './InvoiceWhereUniqueInput.schema';
import { InvoiceCreateWithoutClinicInputObjectSchema as InvoiceCreateWithoutClinicInputObjectSchema } from './InvoiceCreateWithoutClinicInput.schema';
import { InvoiceUncheckedCreateWithoutClinicInputObjectSchema as InvoiceUncheckedCreateWithoutClinicInputObjectSchema } from './InvoiceUncheckedCreateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvoiceCreateWithoutClinicInputObjectSchema), z.lazy(() => InvoiceUncheckedCreateWithoutClinicInputObjectSchema)])
}).strict();
export const InvoiceCreateOrConnectWithoutClinicInputObjectSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCreateOrConnectWithoutClinicInput>;
export const InvoiceCreateOrConnectWithoutClinicInputObjectZodSchema = makeSchema();
