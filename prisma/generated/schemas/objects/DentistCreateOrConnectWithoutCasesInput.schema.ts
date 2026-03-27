import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema';
import { DentistCreateWithoutCasesInputObjectSchema as DentistCreateWithoutCasesInputObjectSchema } from './DentistCreateWithoutCasesInput.schema';
import { DentistUncheckedCreateWithoutCasesInputObjectSchema as DentistUncheckedCreateWithoutCasesInputObjectSchema } from './DentistUncheckedCreateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DentistWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => DentistCreateWithoutCasesInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutCasesInputObjectSchema)])
}).strict();
export const DentistCreateOrConnectWithoutCasesInputObjectSchema: z.ZodType<Prisma.DentistCreateOrConnectWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistCreateOrConnectWithoutCasesInput>;
export const DentistCreateOrConnectWithoutCasesInputObjectZodSchema = makeSchema();
