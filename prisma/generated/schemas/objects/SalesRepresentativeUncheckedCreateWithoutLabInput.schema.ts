import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUncheckedCreateNestedManyWithoutSalesRepsInputObjectSchema as CaseUncheckedCreateNestedManyWithoutSalesRepsInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutSalesRepsInput.schema'

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
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutSalesRepsInputObjectSchema).optional()
}).strict();
export const SalesRepresentativeUncheckedCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeUncheckedCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeUncheckedCreateWithoutLabInput>;
export const SalesRepresentativeUncheckedCreateWithoutLabInputObjectZodSchema = makeSchema();
