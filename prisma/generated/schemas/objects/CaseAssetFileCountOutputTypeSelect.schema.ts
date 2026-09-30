import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCountOutputTypeCountVersionsArgsObjectSchema as CaseAssetFileCountOutputTypeCountVersionsArgsObjectSchema } from './CaseAssetFileCountOutputTypeCountVersionsArgs.schema'

const makeSchema = () => z.object({
  versions: z.union([z.boolean(), z.lazy(() => CaseAssetFileCountOutputTypeCountVersionsArgsObjectSchema)]).optional()
}).strict();
export const CaseAssetFileCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CaseAssetFileCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCountOutputTypeSelect>;
export const CaseAssetFileCountOutputTypeSelectObjectZodSchema = makeSchema();
