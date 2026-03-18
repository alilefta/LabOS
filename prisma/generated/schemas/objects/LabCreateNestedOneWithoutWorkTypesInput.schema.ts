import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutWorkTypesInputObjectSchema as LabCreateWithoutWorkTypesInputObjectSchema } from './LabCreateWithoutWorkTypesInput.schema';
import { LabUncheckedCreateWithoutWorkTypesInputObjectSchema as LabUncheckedCreateWithoutWorkTypesInputObjectSchema } from './LabUncheckedCreateWithoutWorkTypesInput.schema';
import { LabCreateOrConnectWithoutWorkTypesInputObjectSchema as LabCreateOrConnectWithoutWorkTypesInputObjectSchema } from './LabCreateOrConnectWithoutWorkTypesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutWorkTypesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutWorkTypesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutWorkTypesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutWorkTypesInput>;
export const LabCreateNestedOneWithoutWorkTypesInputObjectZodSchema = makeSchema();
