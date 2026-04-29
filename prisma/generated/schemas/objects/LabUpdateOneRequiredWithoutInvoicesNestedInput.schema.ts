import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutInvoicesInputObjectSchema as LabCreateWithoutInvoicesInputObjectSchema } from './LabCreateWithoutInvoicesInput.schema';
import { LabUncheckedCreateWithoutInvoicesInputObjectSchema as LabUncheckedCreateWithoutInvoicesInputObjectSchema } from './LabUncheckedCreateWithoutInvoicesInput.schema';
import { LabCreateOrConnectWithoutInvoicesInputObjectSchema as LabCreateOrConnectWithoutInvoicesInputObjectSchema } from './LabCreateOrConnectWithoutInvoicesInput.schema';
import { LabUpsertWithoutInvoicesInputObjectSchema as LabUpsertWithoutInvoicesInputObjectSchema } from './LabUpsertWithoutInvoicesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutInvoicesInputObjectSchema as LabUpdateToOneWithWhereWithoutInvoicesInputObjectSchema } from './LabUpdateToOneWithWhereWithoutInvoicesInput.schema';
import { LabUpdateWithoutInvoicesInputObjectSchema as LabUpdateWithoutInvoicesInputObjectSchema } from './LabUpdateWithoutInvoicesInput.schema';
import { LabUncheckedUpdateWithoutInvoicesInputObjectSchema as LabUncheckedUpdateWithoutInvoicesInputObjectSchema } from './LabUncheckedUpdateWithoutInvoicesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutInvoicesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoicesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutInvoicesInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutInvoicesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutInvoicesInputObjectSchema), z.lazy(() => LabUpdateWithoutInvoicesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvoicesInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutInvoicesNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutInvoicesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutInvoicesNestedInput>;
export const LabUpdateOneRequiredWithoutInvoicesNestedInputObjectZodSchema = makeSchema();
