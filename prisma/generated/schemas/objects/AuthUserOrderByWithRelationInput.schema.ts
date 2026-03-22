import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { SessionOrderByRelationAggregateInputObjectSchema as SessionOrderByRelationAggregateInputObjectSchema } from './SessionOrderByRelationAggregateInput.schema';
import { AccountOrderByRelationAggregateInputObjectSchema as AccountOrderByRelationAggregateInputObjectSchema } from './AccountOrderByRelationAggregateInput.schema';
import { LabUserOrderByWithRelationInputObjectSchema as LabUserOrderByWithRelationInputObjectSchema } from './LabUserOrderByWithRelationInput.schema';
import { SuperUserOrderByWithRelationInputObjectSchema as SuperUserOrderByWithRelationInputObjectSchema } from './SuperUserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  emailVerified: SortOrderSchema.optional(),
  image: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  labId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputObjectSchema).optional(),
  labUser: z.lazy(() => LabUserOrderByWithRelationInputObjectSchema).optional(),
  superUser: z.lazy(() => SuperUserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const AuthUserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AuthUserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserOrderByWithRelationInput>;
export const AuthUserOrderByWithRelationInputObjectZodSchema = makeSchema();
