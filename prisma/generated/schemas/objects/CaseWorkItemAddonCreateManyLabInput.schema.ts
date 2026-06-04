import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  caseWorkItemId: z.string(),
  addonId: z.string(),
  priceSnapshot: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'priceSnapshot' must be a Decimal",
}),
  createdAt: z.coerce.date().optional()
}).strict();
export const CaseWorkItemAddonCreateManyLabInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateManyLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateManyLabInput>;
export const CaseWorkItemAddonCreateManyLabInputObjectZodSchema = makeSchema();
