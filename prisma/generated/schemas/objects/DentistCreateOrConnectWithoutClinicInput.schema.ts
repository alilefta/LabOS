import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema';
import { DentistCreateWithoutClinicInputObjectSchema as DentistCreateWithoutClinicInputObjectSchema } from './DentistCreateWithoutClinicInput.schema';
import { DentistUncheckedCreateWithoutClinicInputObjectSchema as DentistUncheckedCreateWithoutClinicInputObjectSchema } from './DentistUncheckedCreateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DentistWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => DentistCreateWithoutClinicInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutClinicInputObjectSchema)])
}).strict();
export const DentistCreateOrConnectWithoutClinicInputObjectSchema: z.ZodType<Prisma.DentistCreateOrConnectWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistCreateOrConnectWithoutClinicInput>;
export const DentistCreateOrConnectWithoutClinicInputObjectZodSchema = makeSchema();
