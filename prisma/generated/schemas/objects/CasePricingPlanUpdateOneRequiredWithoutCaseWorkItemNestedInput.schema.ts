import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanCreateWithoutCaseWorkItemInput.schema';
import { CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUncheckedCreateWithoutCaseWorkItemInput.schema';
import { CasePricingPlanCreateOrConnectWithoutCaseWorkItemInputObjectSchema as CasePricingPlanCreateOrConnectWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanCreateOrConnectWithoutCaseWorkItemInput.schema';
import { CasePricingPlanUpsertWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUpsertWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUpsertWithoutCaseWorkItemInput.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanUpdateToOneWithWhereWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUpdateToOneWithWhereWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUpdateToOneWithWhereWithoutCaseWorkItemInput.schema';
import { CasePricingPlanUpdateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUpdateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUpdateWithoutCaseWorkItemInput.schema';
import { CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInputObjectSchema as CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInputObjectSchema } from './CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CasePricingPlanCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedCreateWithoutCaseWorkItemInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CasePricingPlanCreateOrConnectWithoutCaseWorkItemInputObjectSchema).optional(),
  upsert: z.lazy(() => CasePricingPlanUpsertWithoutCaseWorkItemInputObjectSchema).optional(),
  connect: z.lazy(() => CasePricingPlanWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CasePricingPlanUpdateToOneWithWhereWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CasePricingPlanUpdateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CasePricingPlanUncheckedUpdateWithoutCaseWorkItemInputObjectSchema)]).optional()
}).strict();
export const CasePricingPlanUpdateOneRequiredWithoutCaseWorkItemNestedInputObjectSchema: z.ZodType<Prisma.CasePricingPlanUpdateOneRequiredWithoutCaseWorkItemNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanUpdateOneRequiredWithoutCaseWorkItemNestedInput>;
export const CasePricingPlanUpdateOneRequiredWithoutCaseWorkItemNestedInputObjectZodSchema = makeSchema();
