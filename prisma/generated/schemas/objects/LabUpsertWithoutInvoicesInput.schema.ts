import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutInvoicesInputObjectSchema as LabUpdateWithoutInvoicesInputObjectSchema } from './LabUpdateWithoutInvoicesInput.schema';
import { LabUncheckedUpdateWithoutInvoicesInputObjectSchema as LabUncheckedUpdateWithoutInvoicesInputObjectSchema } from './LabUncheckedUpdateWithoutInvoicesInput.schema';
import { LabCreateWithoutInvoicesInputObjectSchema as LabCreateWithoutInvoicesInputObjectSchema } from './LabCreateWithoutInvoicesInput.schema';
import { LabUncheckedCreateWithoutInvoicesInputObjectSchema as LabUncheckedCreateWithoutInvoicesInputObjectSchema } from './LabUncheckedCreateWithoutInvoicesInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutInvoicesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvoicesInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutInvoicesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoicesInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutInvoicesInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutInvoicesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutInvoicesInput>;
export const LabUpsertWithoutInvoicesInputObjectZodSchema = makeSchema();
