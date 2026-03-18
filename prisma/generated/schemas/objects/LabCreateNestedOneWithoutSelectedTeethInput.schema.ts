import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutSelectedTeethInputObjectSchema as LabCreateWithoutSelectedTeethInputObjectSchema } from './LabCreateWithoutSelectedTeethInput.schema';
import { LabUncheckedCreateWithoutSelectedTeethInputObjectSchema as LabUncheckedCreateWithoutSelectedTeethInputObjectSchema } from './LabUncheckedCreateWithoutSelectedTeethInput.schema';
import { LabCreateOrConnectWithoutSelectedTeethInputObjectSchema as LabCreateOrConnectWithoutSelectedTeethInputObjectSchema } from './LabCreateOrConnectWithoutSelectedTeethInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutSelectedTeethInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSelectedTeethInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutSelectedTeethInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutSelectedTeethInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutSelectedTeethInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutSelectedTeethInput>;
export const LabCreateNestedOneWithoutSelectedTeethInputObjectZodSchema = makeSchema();
