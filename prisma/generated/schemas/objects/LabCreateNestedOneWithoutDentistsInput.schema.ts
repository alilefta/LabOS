import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutDentistsInputObjectSchema as LabCreateWithoutDentistsInputObjectSchema } from './LabCreateWithoutDentistsInput.schema';
import { LabUncheckedCreateWithoutDentistsInputObjectSchema as LabUncheckedCreateWithoutDentistsInputObjectSchema } from './LabUncheckedCreateWithoutDentistsInput.schema';
import { LabCreateOrConnectWithoutDentistsInputObjectSchema as LabCreateOrConnectWithoutDentistsInputObjectSchema } from './LabCreateOrConnectWithoutDentistsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutDentistsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutDentistsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutDentistsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutDentistsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutDentistsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutDentistsInput>;
export const LabCreateNestedOneWithoutDentistsInputObjectZodSchema = makeSchema();
