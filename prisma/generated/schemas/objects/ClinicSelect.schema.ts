import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { DentistFindManySchema as DentistFindManySchema } from '../findManyDentist.schema';
import { CasePricingPlanFindManySchema as CasePricingPlanFindManySchema } from '../findManyCasePricingPlan.schema';
import { ClinicCountOutputTypeArgsObjectSchema as ClinicCountOutputTypeArgsObjectSchema } from './ClinicCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  website: z.boolean().optional(),
  notes: z.boolean().optional(),
  status: z.boolean().optional(),
  type: z.boolean().optional(),
  city: z.boolean().optional(),
  zipcode: z.boolean().optional(),
  address1: z.boolean().optional(),
  address2: z.boolean().optional(),
  email: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  billingEmail: z.boolean().optional(),
  billingPhoneNumber: z.boolean().optional(),
  taxNumber: z.boolean().optional(),
  discount: z.boolean().optional(),
  creditLimit: z.boolean().optional(),
  currentBalance: z.boolean().optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  dentists: z.union([z.boolean(), z.lazy(() => DentistFindManySchema)]).optional(),
  casePricingPlans: z.union([z.boolean(), z.lazy(() => CasePricingPlanFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => ClinicCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ClinicSelectObjectSchema: z.ZodType<Prisma.ClinicSelect> = makeSchema() as unknown as z.ZodType<Prisma.ClinicSelect>;
export const ClinicSelectObjectZodSchema = makeSchema();
