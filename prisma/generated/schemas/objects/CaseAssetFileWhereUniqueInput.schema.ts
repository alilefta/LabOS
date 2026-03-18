import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const CaseAssetFileWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseAssetFileWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileWhereUniqueInput>;
export const CaseAssetFileWhereUniqueInputObjectZodSchema = makeSchema();
