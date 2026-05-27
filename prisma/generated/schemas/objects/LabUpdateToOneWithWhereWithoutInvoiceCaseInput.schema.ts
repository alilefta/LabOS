import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutInvoiceCaseInputObjectSchema as LabUpdateWithoutInvoiceCaseInputObjectSchema } from './LabUpdateWithoutInvoiceCaseInput.schema';
import { LabUncheckedUpdateWithoutInvoiceCaseInputObjectSchema as LabUncheckedUpdateWithoutInvoiceCaseInputObjectSchema } from './LabUncheckedUpdateWithoutInvoiceCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvoiceCaseInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutInvoiceCaseInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutInvoiceCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutInvoiceCaseInput>;
export const LabUpdateToOneWithWhereWithoutInvoiceCaseInputObjectZodSchema = makeSchema();
