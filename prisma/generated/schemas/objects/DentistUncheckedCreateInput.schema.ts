import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUncheckedCreateNestedManyWithoutDentistInputObjectSchema as CaseUncheckedCreateNestedManyWithoutDentistInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutDentistInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  clinicId: z.string(),
  labId: z.string(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  isOwner: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutDentistInputObjectSchema).optional()
}).strict();
export const DentistUncheckedCreateInputObjectSchema: z.ZodType<Prisma.DentistUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUncheckedCreateInput>;
export const DentistUncheckedCreateInputObjectZodSchema = makeSchema();
