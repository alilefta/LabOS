import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { PatientCountOutputTypeArgsObjectSchema as PatientCountOutputTypeArgsObjectSchema } from './PatientCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  city: z.boolean().optional(),
  zipcode: z.boolean().optional(),
  address1: z.boolean().optional(),
  address2: z.boolean().optional(),
  email: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => PatientCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PatientSelectObjectSchema: z.ZodType<Prisma.PatientSelect> = makeSchema() as unknown as z.ZodType<Prisma.PatientSelect>;
export const PatientSelectObjectZodSchema = makeSchema();
