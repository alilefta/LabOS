import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutInvoiceCaseInputObjectSchema as LabCreateWithoutInvoiceCaseInputObjectSchema } from './LabCreateWithoutInvoiceCaseInput.schema';
import { LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema as LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema } from './LabUncheckedCreateWithoutInvoiceCaseInput.schema';
import { LabCreateOrConnectWithoutInvoiceCaseInputObjectSchema as LabCreateOrConnectWithoutInvoiceCaseInputObjectSchema } from './LabCreateOrConnectWithoutInvoiceCaseInput.schema';
import { LabUpsertWithoutInvoiceCaseInputObjectSchema as LabUpsertWithoutInvoiceCaseInputObjectSchema } from './LabUpsertWithoutInvoiceCaseInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutInvoiceCaseInputObjectSchema as LabUpdateToOneWithWhereWithoutInvoiceCaseInputObjectSchema } from './LabUpdateToOneWithWhereWithoutInvoiceCaseInput.schema';
import { LabUpdateWithoutInvoiceCaseInputObjectSchema as LabUpdateWithoutInvoiceCaseInputObjectSchema } from './LabUpdateWithoutInvoiceCaseInput.schema';
import { LabUncheckedUpdateWithoutInvoiceCaseInputObjectSchema as LabUncheckedUpdateWithoutInvoiceCaseInputObjectSchema } from './LabUncheckedUpdateWithoutInvoiceCaseInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutInvoiceCaseInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutInvoiceCaseInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutInvoiceCaseInputObjectSchema), z.lazy(() => LabUpdateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvoiceCaseInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutInvoiceCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutInvoiceCaseNestedInput>;
export const LabUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectZodSchema = makeSchema();
