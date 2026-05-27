import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutInvoiceCaseInputObjectSchema as LabUpdateWithoutInvoiceCaseInputObjectSchema } from './LabUpdateWithoutInvoiceCaseInput.schema';
import { LabUncheckedUpdateWithoutInvoiceCaseInputObjectSchema as LabUncheckedUpdateWithoutInvoiceCaseInputObjectSchema } from './LabUncheckedUpdateWithoutInvoiceCaseInput.schema';
import { LabCreateWithoutInvoiceCaseInputObjectSchema as LabCreateWithoutInvoiceCaseInputObjectSchema } from './LabCreateWithoutInvoiceCaseInput.schema';
import { LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema as LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema } from './LabUncheckedCreateWithoutInvoiceCaseInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvoiceCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutInvoiceCaseInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutInvoiceCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutInvoiceCaseInput>;
export const LabUpsertWithoutInvoiceCaseInputObjectZodSchema = makeSchema();
