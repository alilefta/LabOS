import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistCreateWithoutCasesInputObjectSchema as DentistCreateWithoutCasesInputObjectSchema } from './DentistCreateWithoutCasesInput.schema';
import { DentistUncheckedCreateWithoutCasesInputObjectSchema as DentistUncheckedCreateWithoutCasesInputObjectSchema } from './DentistUncheckedCreateWithoutCasesInput.schema';
import { DentistCreateOrConnectWithoutCasesInputObjectSchema as DentistCreateOrConnectWithoutCasesInputObjectSchema } from './DentistCreateOrConnectWithoutCasesInput.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DentistCreateWithoutCasesInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => DentistCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => DentistWhereUniqueInputObjectSchema).optional()
}).strict();
export const DentistCreateNestedOneWithoutCasesInputObjectSchema: z.ZodType<Prisma.DentistCreateNestedOneWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistCreateNestedOneWithoutCasesInput>;
export const DentistCreateNestedOneWithoutCasesInputObjectZodSchema = makeSchema();
