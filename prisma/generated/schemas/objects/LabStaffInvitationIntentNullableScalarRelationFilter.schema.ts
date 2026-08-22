import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './LabStaffInvitationIntentWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema).optional().nullable()
}).strict();
export const LabStaffInvitationIntentNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentNullableScalarRelationFilter>;
export const LabStaffInvitationIntentNullableScalarRelationFilterObjectZodSchema = makeSchema();
