import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './TechnicianWhereUniqueInput.schema';
import { TechnicianCreateWithoutCasesInputObjectSchema as TechnicianCreateWithoutCasesInputObjectSchema } from './TechnicianCreateWithoutCasesInput.schema';
import { TechnicianUncheckedCreateWithoutCasesInputObjectSchema as TechnicianUncheckedCreateWithoutCasesInputObjectSchema } from './TechnicianUncheckedCreateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TechnicianWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => TechnicianCreateWithoutCasesInputObjectSchema), z.lazy(() => TechnicianUncheckedCreateWithoutCasesInputObjectSchema)])
}).strict();
export const TechnicianCreateOrConnectWithoutCasesInputObjectSchema: z.ZodType<Prisma.TechnicianCreateOrConnectWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianCreateOrConnectWithoutCasesInput>;
export const TechnicianCreateOrConnectWithoutCasesInputObjectZodSchema = makeSchema();
