import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ClinicUpdateOneRequiredWithoutDentistsNestedInputObjectSchema as ClinicUpdateOneRequiredWithoutDentistsNestedInputObjectSchema } from './ClinicUpdateOneRequiredWithoutDentistsNestedInput.schema';
import { CaseUpdateManyWithoutDentistNestedInputObjectSchema as CaseUpdateManyWithoutDentistNestedInputObjectSchema } from './CaseUpdateManyWithoutDentistNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  phoneNumber: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isOwner: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  isDefault: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  clinic: z.lazy(() => ClinicUpdateOneRequiredWithoutDentistsNestedInputObjectSchema).optional(),
  cases: z.lazy(() => CaseUpdateManyWithoutDentistNestedInputObjectSchema).optional()
}).strict();
export const DentistUpdateWithoutLabInputObjectSchema: z.ZodType<Prisma.DentistUpdateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpdateWithoutLabInput>;
export const DentistUpdateWithoutLabInputObjectZodSchema = makeSchema();
