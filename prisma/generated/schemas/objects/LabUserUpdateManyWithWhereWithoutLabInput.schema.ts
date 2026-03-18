import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserScalarWhereInputObjectSchema as LabUserScalarWhereInputObjectSchema } from './LabUserScalarWhereInput.schema';
import { LabUserUpdateManyMutationInputObjectSchema as LabUserUpdateManyMutationInputObjectSchema } from './LabUserUpdateManyMutationInput.schema';
import { LabUserUncheckedUpdateManyWithoutLabInputObjectSchema as LabUserUncheckedUpdateManyWithoutLabInputObjectSchema } from './LabUserUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabUserScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => LabUserUpdateManyMutationInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const LabUserUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.LabUserUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUpdateManyWithWhereWithoutLabInput>;
export const LabUserUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
