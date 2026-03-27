import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema';
import { DentistCreateWithoutLabInputObjectSchema as DentistCreateWithoutLabInputObjectSchema } from './DentistCreateWithoutLabInput.schema';
import { DentistUncheckedCreateWithoutLabInputObjectSchema as DentistUncheckedCreateWithoutLabInputObjectSchema } from './DentistUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DentistWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => DentistCreateWithoutLabInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const DentistCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.DentistCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistCreateOrConnectWithoutLabInput>;
export const DentistCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
