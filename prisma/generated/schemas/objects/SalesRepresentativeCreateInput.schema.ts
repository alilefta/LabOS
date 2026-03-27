import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutSalesRepsInputObjectSchema as LabCreateNestedOneWithoutSalesRepsInputObjectSchema } from './LabCreateNestedOneWithoutSalesRepsInput.schema';
import { CaseCreateNestedManyWithoutSalesRepsInputObjectSchema as CaseCreateNestedManyWithoutSalesRepsInputObjectSchema } from './CaseCreateNestedManyWithoutSalesRepsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  zipcode: z.string().optional().nullable(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  email: z.string(),
  phoneNumber: z.string(),
  avatarUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutSalesRepsInputObjectSchema),
  cases: z.lazy(() => CaseCreateNestedManyWithoutSalesRepsInputObjectSchema).optional()
}).strict();
export const SalesRepresentativeCreateInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeCreateInput>;
export const SalesRepresentativeCreateInputObjectZodSchema = makeSchema();
