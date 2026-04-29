import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUpdateWithoutInvoiceCaseInputObjectSchema as CaseUpdateWithoutInvoiceCaseInputObjectSchema } from './CaseUpdateWithoutInvoiceCaseInput.schema';
import { CaseUncheckedUpdateWithoutInvoiceCaseInputObjectSchema as CaseUncheckedUpdateWithoutInvoiceCaseInputObjectSchema } from './CaseUncheckedUpdateWithoutInvoiceCaseInput.schema';
import { CaseCreateWithoutInvoiceCaseInputObjectSchema as CaseCreateWithoutInvoiceCaseInputObjectSchema } from './CaseCreateWithoutInvoiceCaseInput.schema';
import { CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema as CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema } from './CaseUncheckedCreateWithoutInvoiceCaseInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseUpdateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutInvoiceCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema)]),
  where: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const CaseUpsertWithoutInvoiceCaseInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithoutInvoiceCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithoutInvoiceCaseInput>;
export const CaseUpsertWithoutInvoiceCaseInputObjectZodSchema = makeSchema();
