import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianCreateWithoutCasesInputObjectSchema as TechnicianCreateWithoutCasesInputObjectSchema } from './TechnicianCreateWithoutCasesInput.schema';
import { TechnicianUncheckedCreateWithoutCasesInputObjectSchema as TechnicianUncheckedCreateWithoutCasesInputObjectSchema } from './TechnicianUncheckedCreateWithoutCasesInput.schema';
import { TechnicianCreateOrConnectWithoutCasesInputObjectSchema as TechnicianCreateOrConnectWithoutCasesInputObjectSchema } from './TechnicianCreateOrConnectWithoutCasesInput.schema';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './TechnicianWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TechnicianCreateWithoutCasesInputObjectSchema), z.lazy(() => TechnicianUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => TechnicianCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => TechnicianWhereUniqueInputObjectSchema).optional()
}).strict();
export const TechnicianCreateNestedOneWithoutCasesInputObjectSchema: z.ZodType<Prisma.TechnicianCreateNestedOneWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianCreateNestedOneWithoutCasesInput>;
export const TechnicianCreateNestedOneWithoutCasesInputObjectZodSchema = makeSchema();
