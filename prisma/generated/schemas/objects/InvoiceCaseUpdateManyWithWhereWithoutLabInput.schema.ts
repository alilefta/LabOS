import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseScalarWhereInputObjectSchema as InvoiceCaseScalarWhereInputObjectSchema } from './InvoiceCaseScalarWhereInput.schema';
import { InvoiceCaseUpdateManyMutationInputObjectSchema as InvoiceCaseUpdateManyMutationInputObjectSchema } from './InvoiceCaseUpdateManyMutationInput.schema';
import { InvoiceCaseUncheckedUpdateManyWithoutLabInputObjectSchema as InvoiceCaseUncheckedUpdateManyWithoutLabInputObjectSchema } from './InvoiceCaseUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceCaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InvoiceCaseUpdateManyMutationInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const InvoiceCaseUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpdateManyWithWhereWithoutLabInput>;
export const InvoiceCaseUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
