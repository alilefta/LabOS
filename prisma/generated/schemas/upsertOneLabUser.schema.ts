import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserSelectObjectSchema as LabUserSelectObjectSchema } from './objects/LabUserSelect.schema';
import { LabUserIncludeObjectSchema as LabUserIncludeObjectSchema } from './objects/LabUserInclude.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './objects/LabUserWhereUniqueInput.schema';
import { LabUserCreateInputObjectSchema as LabUserCreateInputObjectSchema } from './objects/LabUserCreateInput.schema';
import { LabUserUncheckedCreateInputObjectSchema as LabUserUncheckedCreateInputObjectSchema } from './objects/LabUserUncheckedCreateInput.schema';
import { LabUserUpdateInputObjectSchema as LabUserUpdateInputObjectSchema } from './objects/LabUserUpdateInput.schema';
import { LabUserUncheckedUpdateInputObjectSchema as LabUserUncheckedUpdateInputObjectSchema } from './objects/LabUserUncheckedUpdateInput.schema';

export const LabUserUpsertOneSchema: z.ZodType<Prisma.LabUserUpsertArgs> = z.object({ select: LabUserSelectObjectSchema.optional(), include: LabUserIncludeObjectSchema.optional(), where: LabUserWhereUniqueInputObjectSchema, create: z.union([ LabUserCreateInputObjectSchema, LabUserUncheckedCreateInputObjectSchema ]), update: z.union([ LabUserUpdateInputObjectSchema, LabUserUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.LabUserUpsertArgs>;

export const LabUserUpsertOneZodSchema = z.object({ select: LabUserSelectObjectSchema.optional(), include: LabUserIncludeObjectSchema.optional(), where: LabUserWhereUniqueInputObjectSchema, create: z.union([ LabUserCreateInputObjectSchema, LabUserUncheckedCreateInputObjectSchema ]), update: z.union([ LabUserUpdateInputObjectSchema, LabUserUncheckedUpdateInputObjectSchema ]) }).strict();