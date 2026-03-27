import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutDentistsInputObjectSchema as LabCreateWithoutDentistsInputObjectSchema } from './LabCreateWithoutDentistsInput.schema';
import { LabUncheckedCreateWithoutDentistsInputObjectSchema as LabUncheckedCreateWithoutDentistsInputObjectSchema } from './LabUncheckedCreateWithoutDentistsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutDentistsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutDentistsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutDentistsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutDentistsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutDentistsInput>;
export const LabCreateOrConnectWithoutDentistsInputObjectZodSchema = makeSchema();
