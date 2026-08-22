import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const labstaffinvitationintentscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => LabStaffInvitationIntentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => LabStaffInvitationIntentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabStaffInvitationIntentScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabStaffInvitationIntentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => LabStaffInvitationIntentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  invitationId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labStaffId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const LabStaffInvitationIntentScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentScalarWhereWithAggregatesInput> = labstaffinvitationintentscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.LabStaffInvitationIntentScalarWhereWithAggregatesInput>;
export const LabStaffInvitationIntentScalarWhereWithAggregatesInputObjectZodSchema = labstaffinvitationintentscalarwherewithaggregatesinputSchema;
