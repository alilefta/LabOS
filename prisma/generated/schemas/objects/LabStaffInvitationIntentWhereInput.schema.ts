import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { InvitationScalarRelationFilterObjectSchema as InvitationScalarRelationFilterObjectSchema } from './InvitationScalarRelationFilter.schema';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './InvitationWhereInput.schema';
import { LabStaffScalarRelationFilterObjectSchema as LabStaffScalarRelationFilterObjectSchema } from './LabStaffScalarRelationFilter.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const labstaffinvitationintentwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema), z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema), z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  invitationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labStaffId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  invitation: z.union([z.lazy(() => InvitationScalarRelationFilterObjectSchema), z.lazy(() => InvitationWhereInputObjectSchema)]).optional(),
  labStaff: z.union([z.lazy(() => LabStaffScalarRelationFilterObjectSchema), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional()
}).strict();
export const LabStaffInvitationIntentWhereInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentWhereInput> = labstaffinvitationintentwhereinputSchema as unknown as z.ZodType<Prisma.LabStaffInvitationIntentWhereInput>;
export const LabStaffInvitationIntentWhereInputObjectZodSchema = labstaffinvitationintentwhereinputSchema;
