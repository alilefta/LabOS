import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogCreateWithoutActorInputObjectSchema as CaseActivityLogCreateWithoutActorInputObjectSchema } from './CaseActivityLogCreateWithoutActorInput.schema';
import { CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema as CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const CaseActivityLogCreateOrConnectWithoutActorInputObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateOrConnectWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateOrConnectWithoutActorInput>;
export const CaseActivityLogCreateOrConnectWithoutActorInputObjectZodSchema = makeSchema();
