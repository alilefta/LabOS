import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationWhereInputObjectSchema as LabInvitationWhereInputObjectSchema } from './LabInvitationWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => LabInvitationWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => LabInvitationWhereInputObjectSchema).optional().nullable()
}).strict();
export const LabInvitationNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.LabInvitationNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationNullableScalarRelationFilter>;
export const LabInvitationNullableScalarRelationFilterObjectZodSchema = makeSchema();
