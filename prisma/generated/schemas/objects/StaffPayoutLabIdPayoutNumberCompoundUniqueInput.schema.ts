import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  labId: z.string(),
  payoutNumber: z.string()
}).strict();
export const StaffPayoutLabIdPayoutNumberCompoundUniqueInputObjectSchema: z.ZodType<Prisma.StaffPayoutLabIdPayoutNumberCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutLabIdPayoutNumberCompoundUniqueInput>;
export const StaffPayoutLabIdPayoutNumberCompoundUniqueInputObjectZodSchema = makeSchema();
