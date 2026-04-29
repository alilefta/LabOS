import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutInvoicesInputObjectSchema as LabCreateWithoutInvoicesInputObjectSchema } from './LabCreateWithoutInvoicesInput.schema';
import { LabUncheckedCreateWithoutInvoicesInputObjectSchema as LabUncheckedCreateWithoutInvoicesInputObjectSchema } from './LabUncheckedCreateWithoutInvoicesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutInvoicesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvoicesInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutInvoicesInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutInvoicesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutInvoicesInput>;
export const LabCreateOrConnectWithoutInvoicesInputObjectZodSchema = makeSchema();
