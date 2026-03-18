import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianScalarWhereInputObjectSchema as TechnicianScalarWhereInputObjectSchema } from './TechnicianScalarWhereInput.schema';
import { TechnicianUpdateManyMutationInputObjectSchema as TechnicianUpdateManyMutationInputObjectSchema } from './TechnicianUpdateManyMutationInput.schema';
import { TechnicianUncheckedUpdateManyWithoutLabInputObjectSchema as TechnicianUncheckedUpdateManyWithoutLabInputObjectSchema } from './TechnicianUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TechnicianScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => TechnicianUpdateManyMutationInputObjectSchema), z.lazy(() => TechnicianUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const TechnicianUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.TechnicianUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianUpdateManyWithWhereWithoutLabInput>;
export const TechnicianUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
