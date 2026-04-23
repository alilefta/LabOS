import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithoutActorInputObjectSchema as CaseActivityLogUpdateWithoutActorInputObjectSchema } from './CaseActivityLogUpdateWithoutActorInput.schema';
import { CaseActivityLogUncheckedUpdateWithoutActorInputObjectSchema as CaseActivityLogUncheckedUpdateWithoutActorInputObjectSchema } from './CaseActivityLogUncheckedUpdateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseActivityLogUpdateWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateWithoutActorInputObjectSchema)])
}).strict();
export const CaseActivityLogUpdateWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpdateWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateWithWhereUniqueWithoutActorInput>;
export const CaseActivityLogUpdateWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
