import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const InvitationWhereUniqueInputObjectSchema: z.ZodType<Prisma.InvitationWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationWhereUniqueInput>;
export const InvitationWhereUniqueInputObjectZodSchema = makeSchema();
