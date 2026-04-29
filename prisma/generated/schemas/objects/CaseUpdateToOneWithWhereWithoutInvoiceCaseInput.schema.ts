import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { CaseUpdateWithoutInvoiceCaseInputObjectSchema as CaseUpdateWithoutInvoiceCaseInputObjectSchema } from './CaseUpdateWithoutInvoiceCaseInput.schema';
import { CaseUncheckedUpdateWithoutInvoiceCaseInputObjectSchema as CaseUncheckedUpdateWithoutInvoiceCaseInputObjectSchema } from './CaseUncheckedUpdateWithoutInvoiceCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseUpdateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutInvoiceCaseInputObjectSchema)])
}).strict();
export const CaseUpdateToOneWithWhereWithoutInvoiceCaseInputObjectSchema: z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutInvoiceCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutInvoiceCaseInput>;
export const CaseUpdateToOneWithWhereWithoutInvoiceCaseInputObjectZodSchema = makeSchema();
