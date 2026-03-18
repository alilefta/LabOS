import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const SelectedToothWhereUniqueInputObjectSchema: z.ZodType<Prisma.SelectedToothWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothWhereUniqueInput>;
export const SelectedToothWhereUniqueInputObjectZodSchema = makeSchema();
