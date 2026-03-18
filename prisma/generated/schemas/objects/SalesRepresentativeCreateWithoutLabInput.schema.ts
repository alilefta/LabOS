import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateNestedManyWithoutSalesRepsInputObjectSchema as CaseCreateNestedManyWithoutSalesRepsInputObjectSchema } from './CaseCreateNestedManyWithoutSalesRepsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  email: z.string(),
  phoneNumber: z.string(),
  avatarUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutSalesRepsInputObjectSchema).optional()
}).strict();
export const SalesRepresentativeCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeCreateWithoutLabInput>;
export const SalesRepresentativeCreateWithoutLabInputObjectZodSchema = makeSchema();
