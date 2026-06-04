import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ProductAddonWhereUniqueInputObjectSchema: z.ZodType<Prisma.ProductAddonWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonWhereUniqueInput>;
export const ProductAddonWhereUniqueInputObjectZodSchema = makeSchema();
