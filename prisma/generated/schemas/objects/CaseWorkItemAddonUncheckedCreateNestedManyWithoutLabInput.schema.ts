import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonCreateWithoutLabInputObjectSchema as CaseWorkItemAddonCreateWithoutLabInputObjectSchema } from './CaseWorkItemAddonCreateWithoutLabInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutLabInput.schema';
import { CaseWorkItemAddonCreateOrConnectWithoutLabInputObjectSchema as CaseWorkItemAddonCreateOrConnectWithoutLabInputObjectSchema } from './CaseWorkItemAddonCreateOrConnectWithoutLabInput.schema';
import { CaseWorkItemAddonCreateManyLabInputEnvelopeObjectSchema as CaseWorkItemAddonCreateManyLabInputEnvelopeObjectSchema } from './CaseWorkItemAddonCreateManyLabInputEnvelope.schema';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemAddonCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemAddonUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUncheckedCreateNestedManyWithoutLabInput>;
export const CaseWorkItemAddonUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
