import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutInvoiceCaseInputObjectSchema as LabCreateWithoutInvoiceCaseInputObjectSchema } from './LabCreateWithoutInvoiceCaseInput.schema';
import { LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema as LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema } from './LabUncheckedCreateWithoutInvoiceCaseInput.schema';
import { LabCreateOrConnectWithoutInvoiceCaseInputObjectSchema as LabCreateOrConnectWithoutInvoiceCaseInputObjectSchema } from './LabCreateOrConnectWithoutInvoiceCaseInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoiceCaseInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutInvoiceCaseInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutInvoiceCaseInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutInvoiceCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutInvoiceCaseInput>;
export const LabCreateNestedOneWithoutInvoiceCaseInputObjectZodSchema = makeSchema();
