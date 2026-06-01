import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutLabIdPayoutNumberCompoundUniqueInputObjectSchema as StaffPayoutLabIdPayoutNumberCompoundUniqueInputObjectSchema } from './StaffPayoutLabIdPayoutNumberCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  labId_payoutNumber: z.lazy(() => StaffPayoutLabIdPayoutNumberCompoundUniqueInputObjectSchema).optional()
}).strict();
export const StaffPayoutWhereUniqueInputObjectSchema: z.ZodType<Prisma.StaffPayoutWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutWhereUniqueInput>;
export const StaffPayoutWhereUniqueInputObjectZodSchema = makeSchema();
