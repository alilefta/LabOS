import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogScalarWhereInputObjectSchema as CaseActivityLogScalarWhereInputObjectSchema } from './CaseActivityLogScalarWhereInput.schema';
import { CaseActivityLogUpdateManyMutationInputObjectSchema as CaseActivityLogUpdateManyMutationInputObjectSchema } from './CaseActivityLogUpdateManyMutationInput.schema';
import { CaseActivityLogUncheckedUpdateManyWithoutActorInputObjectSchema as CaseActivityLogUncheckedUpdateManyWithoutActorInputObjectSchema } from './CaseActivityLogUncheckedUpdateManyWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseActivityLogUpdateManyMutationInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateManyWithoutActorInputObjectSchema)])
}).strict();
export const CaseActivityLogUpdateManyWithWhereWithoutActorInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpdateManyWithWhereWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateManyWithWhereWithoutActorInput>;
export const CaseActivityLogUpdateManyWithWhereWithoutActorInputObjectZodSchema = makeSchema();
