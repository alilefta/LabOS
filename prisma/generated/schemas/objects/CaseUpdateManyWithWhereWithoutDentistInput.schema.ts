import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseScalarWhereInputObjectSchema as CaseScalarWhereInputObjectSchema } from './CaseScalarWhereInput.schema';
import { CaseUpdateManyMutationInputObjectSchema as CaseUpdateManyMutationInputObjectSchema } from './CaseUpdateManyMutationInput.schema';
import { CaseUncheckedUpdateManyWithoutDentistInputObjectSchema as CaseUncheckedUpdateManyWithoutDentistInputObjectSchema } from './CaseUncheckedUpdateManyWithoutDentistInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateManyMutationInputObjectSchema), z.lazy(() => CaseUncheckedUpdateManyWithoutDentistInputObjectSchema)])
}).strict();
export const CaseUpdateManyWithWhereWithoutDentistInputObjectSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutDentistInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutDentistInput>;
export const CaseUpdateManyWithWhereWithoutDentistInputObjectZodSchema = makeSchema();
