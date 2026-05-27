import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseUpdateWithoutLabInputObjectSchema as InvoiceCaseUpdateWithoutLabInputObjectSchema } from './InvoiceCaseUpdateWithoutLabInput.schema';
import { InvoiceCaseUncheckedUpdateWithoutLabInputObjectSchema as InvoiceCaseUncheckedUpdateWithoutLabInputObjectSchema } from './InvoiceCaseUncheckedUpdateWithoutLabInput.schema';
import { InvoiceCaseCreateWithoutLabInputObjectSchema as InvoiceCaseCreateWithoutLabInputObjectSchema } from './InvoiceCaseCreateWithoutLabInput.schema';
import { InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema as InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InvoiceCaseUpdateWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutLabInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const InvoiceCaseUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUpsertWithWhereUniqueWithoutLabInput>;
export const InvoiceCaseUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
