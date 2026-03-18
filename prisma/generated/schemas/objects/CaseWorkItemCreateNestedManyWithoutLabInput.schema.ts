import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutLabInputObjectSchema as CaseWorkItemCreateWithoutLabInputObjectSchema } from './CaseWorkItemCreateWithoutLabInput.schema';
import { CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema as CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutLabInput.schema';
import { CaseWorkItemCreateOrConnectWithoutLabInputObjectSchema as CaseWorkItemCreateOrConnectWithoutLabInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutLabInput.schema';
import { CaseWorkItemCreateManyLabInputEnvelopeObjectSchema as CaseWorkItemCreateManyLabInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyLabInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateNestedManyWithoutLabInput>;
export const CaseWorkItemCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
