import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutDentistsInputObjectSchema as LabCreateNestedOneWithoutDentistsInputObjectSchema } from './LabCreateNestedOneWithoutDentistsInput.schema';
import { CaseCreateNestedManyWithoutDentistInputObjectSchema as CaseCreateNestedManyWithoutDentistInputObjectSchema } from './CaseCreateNestedManyWithoutDentistInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  isOwner: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutDentistsInputObjectSchema),
  cases: z.lazy(() => CaseCreateNestedManyWithoutDentistInputObjectSchema).optional()
}).strict();
export const DentistCreateWithoutClinicInputObjectSchema: z.ZodType<Prisma.DentistCreateWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistCreateWithoutClinicInput>;
export const DentistCreateWithoutClinicInputObjectZodSchema = makeSchema();
