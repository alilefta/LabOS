import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothWhereInputObjectSchema as SelectedToothWhereInputObjectSchema } from './SelectedToothWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SelectedToothWhereInputObjectSchema).optional()
}).strict();
export const CaseWorkItemCountOutputTypeCountSelectedTeethArgsObjectSchema = makeSchema();
export const CaseWorkItemCountOutputTypeCountSelectedTeethArgsObjectZodSchema = makeSchema();
