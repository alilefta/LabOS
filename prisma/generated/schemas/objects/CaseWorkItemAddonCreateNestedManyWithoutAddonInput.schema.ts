import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonCreateWithoutAddonInputObjectSchema as CaseWorkItemAddonCreateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonCreateWithoutAddonInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutAddonInput.schema';
import { CaseWorkItemAddonCreateOrConnectWithoutAddonInputObjectSchema as CaseWorkItemAddonCreateOrConnectWithoutAddonInputObjectSchema } from './CaseWorkItemAddonCreateOrConnectWithoutAddonInput.schema';
import { CaseWorkItemAddonCreateManyAddonInputEnvelopeObjectSchema as CaseWorkItemAddonCreateManyAddonInputEnvelopeObjectSchema } from './CaseWorkItemAddonCreateManyAddonInputEnvelope.schema';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateWithoutAddonInputObjectSchema).array(), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutAddonInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemAddonCreateManyAddonInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemAddonCreateNestedManyWithoutAddonInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateNestedManyWithoutAddonInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateNestedManyWithoutAddonInput>;
export const CaseWorkItemAddonCreateNestedManyWithoutAddonInputObjectZodSchema = makeSchema();
