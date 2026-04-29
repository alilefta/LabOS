import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseCreateWithoutCaseInputObjectSchema as InvoiceCaseCreateWithoutCaseInputObjectSchema } from './InvoiceCaseCreateWithoutCaseInput.schema';
import { InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema as InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutCaseInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const InvoiceCaseCreateOrConnectWithoutCaseInputObjectSchema: z.ZodType<Prisma.InvoiceCaseCreateOrConnectWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseCreateOrConnectWithoutCaseInput>;
export const InvoiceCaseCreateOrConnectWithoutCaseInputObjectZodSchema = makeSchema();
