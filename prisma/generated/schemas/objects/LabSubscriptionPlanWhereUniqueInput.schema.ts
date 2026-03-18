import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string().optional()
}).strict();
export const LabSubscriptionPlanWhereUniqueInputObjectSchema: z.ZodType<Prisma.LabSubscriptionPlanWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSubscriptionPlanWhereUniqueInput>;
export const LabSubscriptionPlanWhereUniqueInputObjectZodSchema = makeSchema();
