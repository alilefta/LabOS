import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutInvoicesInputObjectSchema as LabCreateWithoutInvoicesInputObjectSchema } from './LabCreateWithoutInvoicesInput.schema';
import { LabUncheckedCreateWithoutInvoicesInputObjectSchema as LabUncheckedCreateWithoutInvoicesInputObjectSchema } from './LabUncheckedCreateWithoutInvoicesInput.schema';
import { LabCreateOrConnectWithoutInvoicesInputObjectSchema as LabCreateOrConnectWithoutInvoicesInputObjectSchema } from './LabCreateOrConnectWithoutInvoicesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutInvoicesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoicesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutInvoicesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutInvoicesInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutInvoicesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutInvoicesInput>;
export const LabCreateNestedOneWithoutInvoicesInputObjectZodSchema = makeSchema();
