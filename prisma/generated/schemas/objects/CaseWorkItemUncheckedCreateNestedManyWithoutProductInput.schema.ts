import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutProductInputObjectSchema as CaseWorkItemCreateWithoutProductInputObjectSchema } from './CaseWorkItemCreateWithoutProductInput.schema';
import { CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema as CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutProductInput.schema';
import { CaseWorkItemCreateOrConnectWithoutProductInputObjectSchema as CaseWorkItemCreateOrConnectWithoutProductInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutProductInput.schema';
import { CaseWorkItemCreateManyProductInputEnvelopeObjectSchema as CaseWorkItemCreateManyProductInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyProductInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutProductInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyProductInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemUncheckedCreateNestedManyWithoutProductInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUncheckedCreateNestedManyWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUncheckedCreateNestedManyWithoutProductInput>;
export const CaseWorkItemUncheckedCreateNestedManyWithoutProductInputObjectZodSchema = makeSchema();
