import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseFindManySchema as CaseFindManySchema } from '../findManyCase.schema';
import { TechnicianCountOutputTypeArgsObjectSchema as TechnicianCountOutputTypeArgsObjectSchema } from './TechnicianCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  city: z.boolean().optional(),
  zipcode: z.boolean().optional(),
  address1: z.boolean().optional(),
  address2: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  email: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  cases: z.union([z.boolean(), z.lazy(() => CaseFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => TechnicianCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const TechnicianSelectObjectSchema: z.ZodType<Prisma.TechnicianSelect> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianSelect>;
export const TechnicianSelectObjectZodSchema = makeSchema();
