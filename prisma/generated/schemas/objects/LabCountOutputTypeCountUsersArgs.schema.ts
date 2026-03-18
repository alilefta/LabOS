import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabUserWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountUsersArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountUsersArgsObjectZodSchema = makeSchema();
