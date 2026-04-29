import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutInvoiceCaseInputObjectSchema as CaseCreateWithoutInvoiceCaseInputObjectSchema } from './CaseCreateWithoutInvoiceCaseInput.schema';
import { CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema as CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema } from './CaseUncheckedCreateWithoutInvoiceCaseInput.schema';
import { CaseCreateOrConnectWithoutInvoiceCaseInputObjectSchema as CaseCreateOrConnectWithoutInvoiceCaseInputObjectSchema } from './CaseCreateOrConnectWithoutInvoiceCaseInput.schema';
import { CaseUpsertWithoutInvoiceCaseInputObjectSchema as CaseUpsertWithoutInvoiceCaseInputObjectSchema } from './CaseUpsertWithoutInvoiceCaseInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateToOneWithWhereWithoutInvoiceCaseInputObjectSchema as CaseUpdateToOneWithWhereWithoutInvoiceCaseInputObjectSchema } from './CaseUpdateToOneWithWhereWithoutInvoiceCaseInput.schema';
import { CaseUpdateWithoutInvoiceCaseInputObjectSchema as CaseUpdateWithoutInvoiceCaseInputObjectSchema } from './CaseUpdateWithoutInvoiceCaseInput.schema';
import { CaseUncheckedUpdateWithoutInvoiceCaseInputObjectSchema as CaseUncheckedUpdateWithoutInvoiceCaseInputObjectSchema } from './CaseUncheckedUpdateWithoutInvoiceCaseInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutInvoiceCaseInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutInvoiceCaseInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseUpsertWithoutInvoiceCaseInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseUpdateToOneWithWhereWithoutInvoiceCaseInputObjectSchema), z.lazy(() => CaseUpdateWithoutInvoiceCaseInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutInvoiceCaseInputObjectSchema)]).optional()
}).strict();
export const CaseUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateOneRequiredWithoutInvoiceCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateOneRequiredWithoutInvoiceCaseNestedInput>;
export const CaseUpdateOneRequiredWithoutInvoiceCaseNestedInputObjectZodSchema = makeSchema();
