import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutWorkTypeInputObjectSchema as CaseWorkItemCreateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemCreateWithoutWorkTypeInput.schema';
import { CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema as CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutWorkTypeInput.schema';
import { CaseWorkItemCreateOrConnectWithoutWorkTypeInputObjectSchema as CaseWorkItemCreateOrConnectWithoutWorkTypeInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutWorkTypeInput.schema';
import { CaseWorkItemCreateManyWorkTypeInputEnvelopeObjectSchema as CaseWorkItemCreateManyWorkTypeInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyWorkTypeInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutWorkTypeInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutWorkTypeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyWorkTypeInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInput>;
export const CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInputObjectZodSchema = makeSchema();
