import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonCreateWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInput>;
export const CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
