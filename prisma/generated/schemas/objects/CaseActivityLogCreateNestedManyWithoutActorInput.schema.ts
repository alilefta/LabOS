import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateWithoutActorInputObjectSchema as CaseActivityLogCreateWithoutActorInputObjectSchema } from './CaseActivityLogCreateWithoutActorInput.schema';
import { CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema as CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutActorInput.schema';
import { CaseActivityLogCreateOrConnectWithoutActorInputObjectSchema as CaseActivityLogCreateOrConnectWithoutActorInputObjectSchema } from './CaseActivityLogCreateOrConnectWithoutActorInput.schema';
import { CaseActivityLogCreateManyActorInputEnvelopeObjectSchema as CaseActivityLogCreateManyActorInputEnvelopeObjectSchema } from './CaseActivityLogCreateManyActorInputEnvelope.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogCreateWithoutActorInputObjectSchema).array(), z.lazy(() => CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseActivityLogCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseActivityLogCreateManyActorInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseActivityLogCreateNestedManyWithoutActorInputObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateNestedManyWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateNestedManyWithoutActorInput>;
export const CaseActivityLogCreateNestedManyWithoutActorInputObjectZodSchema = makeSchema();
