import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseCreateWithoutCaseInputObjectSchema as InvoiceCaseCreateWithoutCaseInputObjectSchema } from './InvoiceCaseCreateWithoutCaseInput.schema';
import { InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema as InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutCaseInput.schema';
import { InvoiceCaseCreateOrConnectWithoutCaseInputObjectSchema as InvoiceCaseCreateOrConnectWithoutCaseInputObjectSchema } from './InvoiceCaseCreateOrConnectWithoutCaseInput.schema';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutCaseInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCaseCreateOrConnectWithoutCaseInputObjectSchema).optional(),
  connect: z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).optional()
}).strict();
export const InvoiceCaseUncheckedCreateNestedOneWithoutCaseInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUncheckedCreateNestedOneWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUncheckedCreateNestedOneWithoutCaseInput>;
export const InvoiceCaseUncheckedCreateNestedOneWithoutCaseInputObjectZodSchema = makeSchema();
