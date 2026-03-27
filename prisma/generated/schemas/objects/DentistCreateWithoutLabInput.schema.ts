import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateNestedOneWithoutDentistsInputObjectSchema as ClinicCreateNestedOneWithoutDentistsInputObjectSchema } from './ClinicCreateNestedOneWithoutDentistsInput.schema';
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
  clinic: z.lazy(() => ClinicCreateNestedOneWithoutDentistsInputObjectSchema),
  cases: z.lazy(() => CaseCreateNestedManyWithoutDentistInputObjectSchema).optional()
}).strict();
export const DentistCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.DentistCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistCreateWithoutLabInput>;
export const DentistCreateWithoutLabInputObjectZodSchema = makeSchema();
