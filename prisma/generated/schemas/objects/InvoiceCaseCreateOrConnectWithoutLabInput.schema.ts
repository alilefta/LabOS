import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseCreateWithoutLabInputObjectSchema as InvoiceCaseCreateWithoutLabInputObjectSchema } from './InvoiceCaseCreateWithoutLabInput.schema';
import { InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema as InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const InvoiceCaseCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoiceCaseCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseCreateOrConnectWithoutLabInput>;
export const InvoiceCaseCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
