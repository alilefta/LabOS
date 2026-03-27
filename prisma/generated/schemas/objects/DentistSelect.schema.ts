import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicArgsObjectSchema as ClinicArgsObjectSchema } from './ClinicArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { DentistCountOutputTypeArgsObjectSchema as DentistCountOutputTypeArgsObjectSchema } from './DentistCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  clinicId: z.boolean().optional(),
  clinic: z.union([z.boolean(), z.lazy(() => ClinicArgsObjectSchema)]).optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  isOwner: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  notes: z.boolean().optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => DentistCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const DentistSelectObjectSchema: z.ZodType<Prisma.DentistSelect> = makeSchema() as unknown as z.ZodType<Prisma.DentistSelect>;
export const DentistSelectObjectZodSchema = makeSchema();
