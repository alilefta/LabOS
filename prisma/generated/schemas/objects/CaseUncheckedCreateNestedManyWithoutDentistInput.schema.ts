import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutDentistInputObjectSchema as CaseCreateWithoutDentistInputObjectSchema } from './CaseCreateWithoutDentistInput.schema';
import { CaseUncheckedCreateWithoutDentistInputObjectSchema as CaseUncheckedCreateWithoutDentistInputObjectSchema } from './CaseUncheckedCreateWithoutDentistInput.schema';
import { CaseCreateOrConnectWithoutDentistInputObjectSchema as CaseCreateOrConnectWithoutDentistInputObjectSchema } from './CaseCreateOrConnectWithoutDentistInput.schema';
import { CaseCreateManyDentistInputEnvelopeObjectSchema as CaseCreateManyDentistInputEnvelopeObjectSchema } from './CaseCreateManyDentistInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutDentistInputObjectSchema), z.lazy(() => CaseCreateWithoutDentistInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutDentistInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutDentistInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutDentistInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutDentistInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyDentistInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseUncheckedCreateNestedManyWithoutDentistInputObjectSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutDentistInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutDentistInput>;
export const CaseUncheckedCreateNestedManyWithoutDentistInputObjectZodSchema = makeSchema();
