import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCountOutputTypeCountFileUploadGrantsArgsObjectSchema as MemberCountOutputTypeCountFileUploadGrantsArgsObjectSchema } from './MemberCountOutputTypeCountFileUploadGrantsArgs.schema'

const makeSchema = () => z.object({
  fileUploadGrants: z.union([z.boolean(), z.lazy(() => MemberCountOutputTypeCountFileUploadGrantsArgsObjectSchema)]).optional()
}).strict();
export const MemberCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.MemberCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.MemberCountOutputTypeSelect>;
export const MemberCountOutputTypeSelectObjectZodSchema = makeSchema();
