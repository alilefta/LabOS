import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUncheckedCreateNestedManyWithoutSalesRepsInputObjectSchema as CaseUncheckedCreateNestedManyWithoutSalesRepsInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutSalesRepsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  labId: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  avatarUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutSalesRepsInputObjectSchema).optional()
}).strict();
export const SalesRepresentativeUncheckedCreateInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeUncheckedCreateInput>;
export const SalesRepresentativeUncheckedCreateInputObjectZodSchema = makeSchema();
