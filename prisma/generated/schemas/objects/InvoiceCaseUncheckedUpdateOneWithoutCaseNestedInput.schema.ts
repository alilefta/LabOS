import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseCreateWithoutCaseInputObjectSchema as InvoiceCaseCreateWithoutCaseInputObjectSchema } from './InvoiceCaseCreateWithoutCaseInput.schema';
import { InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema as InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema } from './InvoiceCaseUncheckedCreateWithoutCaseInput.schema';
import { InvoiceCaseCreateOrConnectWithoutCaseInputObjectSchema as InvoiceCaseCreateOrConnectWithoutCaseInputObjectSchema } from './InvoiceCaseCreateOrConnectWithoutCaseInput.schema';
import { InvoiceCaseUpsertWithoutCaseInputObjectSchema as InvoiceCaseUpsertWithoutCaseInputObjectSchema } from './InvoiceCaseUpsertWithoutCaseInput.schema';
import { InvoiceCaseWhereInputObjectSchema as InvoiceCaseWhereInputObjectSchema } from './InvoiceCaseWhereInput.schema';
import { InvoiceCaseWhereUniqueInputObjectSchema as InvoiceCaseWhereUniqueInputObjectSchema } from './InvoiceCaseWhereUniqueInput.schema';
import { InvoiceCaseUpdateToOneWithWhereWithoutCaseInputObjectSchema as InvoiceCaseUpdateToOneWithWhereWithoutCaseInputObjectSchema } from './InvoiceCaseUpdateToOneWithWhereWithoutCaseInput.schema';
import { InvoiceCaseUpdateWithoutCaseInputObjectSchema as InvoiceCaseUpdateWithoutCaseInputObjectSchema } from './InvoiceCaseUpdateWithoutCaseInput.schema';
import { InvoiceCaseUncheckedUpdateWithoutCaseInputObjectSchema as InvoiceCaseUncheckedUpdateWithoutCaseInputObjectSchema } from './InvoiceCaseUncheckedUpdateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvoiceCaseCreateWithoutCaseInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedCreateWithoutCaseInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCaseCreateOrConnectWithoutCaseInputObjectSchema).optional(),
  upsert: z.lazy(() => InvoiceCaseUpsertWithoutCaseInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => InvoiceCaseWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => InvoiceCaseWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => InvoiceCaseWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => InvoiceCaseUpdateToOneWithWhereWithoutCaseInputObjectSchema), z.lazy(() => InvoiceCaseUpdateWithoutCaseInputObjectSchema), z.lazy(() => InvoiceCaseUncheckedUpdateWithoutCaseInputObjectSchema)]).optional()
}).strict();
export const InvoiceCaseUncheckedUpdateOneWithoutCaseNestedInputObjectSchema: z.ZodType<Prisma.InvoiceCaseUncheckedUpdateOneWithoutCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseUncheckedUpdateOneWithoutCaseNestedInput>;
export const InvoiceCaseUncheckedUpdateOneWithoutCaseNestedInputObjectZodSchema = makeSchema();
