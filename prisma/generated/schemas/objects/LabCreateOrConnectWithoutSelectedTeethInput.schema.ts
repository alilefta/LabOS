import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutSelectedTeethInputObjectSchema as LabCreateWithoutSelectedTeethInputObjectSchema } from './LabCreateWithoutSelectedTeethInput.schema';
import { LabUncheckedCreateWithoutSelectedTeethInputObjectSchema as LabUncheckedCreateWithoutSelectedTeethInputObjectSchema } from './LabUncheckedCreateWithoutSelectedTeethInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutSelectedTeethInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSelectedTeethInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutSelectedTeethInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutSelectedTeethInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutSelectedTeethInput>;
export const LabCreateOrConnectWithoutSelectedTeethInputObjectZodSchema = makeSchema();
