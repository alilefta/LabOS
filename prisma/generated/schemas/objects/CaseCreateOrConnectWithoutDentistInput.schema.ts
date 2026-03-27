import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutDentistInputObjectSchema as CaseCreateWithoutDentistInputObjectSchema } from './CaseCreateWithoutDentistInput.schema';
import { CaseUncheckedCreateWithoutDentistInputObjectSchema as CaseUncheckedCreateWithoutDentistInputObjectSchema } from './CaseUncheckedCreateWithoutDentistInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutDentistInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutDentistInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutDentistInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutDentistInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutDentistInput>;
export const CaseCreateOrConnectWithoutDentistInputObjectZodSchema = makeSchema();
