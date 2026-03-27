import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SubscriptionTierSchema } from '../enums/SubscriptionTier.schema'

const makeSchema = () => z.object({
  set: SubscriptionTierSchema.optional()
}).strict();
export const EnumSubscriptionTierFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumSubscriptionTierFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumSubscriptionTierFieldUpdateOperationsInput>;
export const EnumSubscriptionTierFieldUpdateOperationsInputObjectZodSchema = makeSchema();
