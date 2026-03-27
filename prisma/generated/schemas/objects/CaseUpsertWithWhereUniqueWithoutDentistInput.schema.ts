import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutDentistInputObjectSchema as CaseUpdateWithoutDentistInputObjectSchema } from './CaseUpdateWithoutDentistInput.schema';
import { CaseUncheckedUpdateWithoutDentistInputObjectSchema as CaseUncheckedUpdateWithoutDentistInputObjectSchema } from './CaseUncheckedUpdateWithoutDentistInput.schema';
import { CaseCreateWithoutDentistInputObjectSchema as CaseCreateWithoutDentistInputObjectSchema } from './CaseCreateWithoutDentistInput.schema';
import { CaseUncheckedCreateWithoutDentistInputObjectSchema as CaseUncheckedCreateWithoutDentistInputObjectSchema } from './CaseUncheckedCreateWithoutDentistInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseUpdateWithoutDentistInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutDentistInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutDentistInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutDentistInputObjectSchema)])
}).strict();
export const CaseUpsertWithWhereUniqueWithoutDentistInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutDentistInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutDentistInput>;
export const CaseUpsertWithWhereUniqueWithoutDentistInputObjectZodSchema = makeSchema();
