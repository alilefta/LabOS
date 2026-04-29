import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutInvoiceCaseInputObjectSchema as CaseCreateWithoutInvoiceCaseInputObjectSchema } from './CaseCreateWithoutInvoiceCaseInput.schema';
import { CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema as CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema } from './CaseUncheckedCreateWithoutInvoiceCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutInvoiceCaseInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutInvoiceCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutInvoiceCaseInput>;
export const CaseCreateOrConnectWithoutInvoiceCaseInputObjectZodSchema = makeSchema();
