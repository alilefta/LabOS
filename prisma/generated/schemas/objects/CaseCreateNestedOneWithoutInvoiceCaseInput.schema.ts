import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutInvoiceCaseInputObjectSchema as CaseCreateWithoutInvoiceCaseInputObjectSchema } from './CaseCreateWithoutInvoiceCaseInput.schema';
import { CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema as CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema } from './CaseUncheckedCreateWithoutInvoiceCaseInput.schema';
import { CaseCreateOrConnectWithoutInvoiceCaseInputObjectSchema as CaseCreateOrConnectWithoutInvoiceCaseInputObjectSchema } from './CaseCreateOrConnectWithoutInvoiceCaseInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutInvoiceCaseInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseCreateNestedOneWithoutInvoiceCaseInputObjectSchema: z.ZodType<Prisma.CaseCreateNestedOneWithoutInvoiceCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateNestedOneWithoutInvoiceCaseInput>;
export const CaseCreateNestedOneWithoutInvoiceCaseInputObjectZodSchema = makeSchema();
