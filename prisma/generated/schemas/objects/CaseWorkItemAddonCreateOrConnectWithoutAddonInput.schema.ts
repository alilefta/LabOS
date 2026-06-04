import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonCreateWithoutAddonInputObjectSchema as CaseWorkItemAddonCreateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonCreateWithoutAddonInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutAddonInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema)])
}).strict();
export const CaseWorkItemAddonCreateOrConnectWithoutAddonInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateOrConnectWithoutAddonInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateOrConnectWithoutAddonInput>;
export const CaseWorkItemAddonCreateOrConnectWithoutAddonInputObjectZodSchema = makeSchema();
