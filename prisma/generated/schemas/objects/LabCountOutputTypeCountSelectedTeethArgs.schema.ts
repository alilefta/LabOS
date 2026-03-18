import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothWhereInputObjectSchema as SelectedToothWhereInputObjectSchema } from './SelectedToothWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SelectedToothWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountSelectedTeethArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountSelectedTeethArgsObjectZodSchema = makeSchema();
