import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCountOutputTypeSelectObjectSchema as MemberCountOutputTypeSelectObjectSchema } from './MemberCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => MemberCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const MemberCountOutputTypeArgsObjectSchema = makeSchema();
export const MemberCountOutputTypeArgsObjectZodSchema = makeSchema();
