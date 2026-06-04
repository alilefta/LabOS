import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonCreateWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelopeObjectSchema as CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelopeObjectSchema } from './CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelope.schema';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema).array(), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemAddonCreateNestedManyWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateNestedManyWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateNestedManyWithoutCaseWorkItemInput>;
export const CaseWorkItemAddonCreateNestedManyWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
