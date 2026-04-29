import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseWhereInputObjectSchema as InvoiceCaseWhereInputObjectSchema } from './InvoiceCaseWhereInput.schema';
import { InvoiceCaseUpdateWithoutCaseInputObjectSchema as InvoiceCaseUpdateWithoutCaseInputObjectSchema } from './InvoiceCaseUpdateWithoutCaseInput.schema';
import { InvoiceCaseUncheckedUpdateWithoutCaseInputObjectSchema as InvoiceCaseUncheckedUpdateWithoutCaseInputObjectSchema } from './InvoiceCaseUncheckedUpdateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceCaseWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => InvoiceCaseUpdateWithoutCaseInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedUpdateWithoutCaseInputObjectSchema)])
}).strict();
export const InvoiceCaseUpdateToOneWithWhereWithoutCaseInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpdateToOneWithWhereWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateToOneWithWhereWithoutCaseInput>;
export const InvoiceCaseUpdateToOneWithWhereWithoutCaseInputObjectZodSchema = makeSchema();
