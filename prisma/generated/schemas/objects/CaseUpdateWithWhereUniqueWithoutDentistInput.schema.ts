import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutDentistInputObjectSchema as CaseUpdateWithoutDentistInputObjectSchema } from './CaseUpdateWithoutDentistInput.schema';
import { CaseUncheckedUpdateWithoutDentistInputObjectSchema as CaseUncheckedUpdateWithoutDentistInputObjectSchema } from './CaseUncheckedUpdateWithoutDentistInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateWithoutDentistInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutDentistInputObjectSchema)])
}).strict();
export const CaseUpdateWithWhereUniqueWithoutDentistInputObjectSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutDentistInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutDentistInput>;
export const CaseUpdateWithWhereUniqueWithoutDentistInputObjectZodSchema = makeSchema();
