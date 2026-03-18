import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutWorkTypesInputObjectSchema as LabCreateWithoutWorkTypesInputObjectSchema } from './LabCreateWithoutWorkTypesInput.schema';
import { LabUncheckedCreateWithoutWorkTypesInputObjectSchema as LabUncheckedCreateWithoutWorkTypesInputObjectSchema } from './LabUncheckedCreateWithoutWorkTypesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutWorkTypesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutWorkTypesInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutWorkTypesInput>;
export const LabCreateOrConnectWithoutWorkTypesInputObjectZodSchema = makeSchema();
