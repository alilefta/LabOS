import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonCreateWithoutLabInputObjectSchema as CaseWorkItemAddonCreateWithoutLabInputObjectSchema } from './CaseWorkItemAddonCreateWithoutLabInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateOrConnectWithoutLabInput>;
export const CaseWorkItemAddonCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
