import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  authUserId: z.string().optional(),
  labStaffId: z.string().optional()
}).strict();
export const LabUserWhereUniqueInputObjectSchema: z.ZodType<Prisma.LabUserWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserWhereUniqueInput>;
export const LabUserWhereUniqueInputObjectZodSchema = makeSchema();
