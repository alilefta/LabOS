import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutInvoicesInputObjectSchema as LabUpdateWithoutInvoicesInputObjectSchema } from './LabUpdateWithoutInvoicesInput.schema';
import { LabUncheckedUpdateWithoutInvoicesInputObjectSchema as LabUncheckedUpdateWithoutInvoicesInputObjectSchema } from './LabUncheckedUpdateWithoutInvoicesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutInvoicesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvoicesInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutInvoicesInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutInvoicesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutInvoicesInput>;
export const LabUpdateToOneWithWhereWithoutInvoicesInputObjectZodSchema = makeSchema();
