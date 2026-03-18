import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutSalesRepsInputObjectSchema as LabCreateNestedOneWithoutSalesRepsInputObjectSchema } from './LabCreateNestedOneWithoutSalesRepsInput.schema'

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
  Lab: z.lazy(() => LabCreateNestedOneWithoutSalesRepsInputObjectSchema)
}).strict();
export const SalesRepresentativeCreateWithoutCasesInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeCreateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeCreateWithoutCasesInput>;
export const SalesRepresentativeCreateWithoutCasesInputObjectZodSchema = makeSchema();
