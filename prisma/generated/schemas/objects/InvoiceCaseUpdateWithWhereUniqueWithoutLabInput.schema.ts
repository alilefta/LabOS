import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseUpdateWithoutLabInputObjectSchema as InvoiceCaseUpdateWithoutLabInputObjectSchema } from './InvoiceCaseUpdateWithoutLabInput.schema';
import { InvoiceCaseUncheckedUpdateWithoutLabInputObjectSchema as InvoiceCaseUncheckedUpdateWithoutLabInputObjectSchema } from './InvoiceCaseUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InvoiceCaseUpdateWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const InvoiceCaseUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateWithWhereUniqueWithoutLabInput>;
export const InvoiceCaseUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
