import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserSelectObjectSchema as SuperUserSelectObjectSchema } from './objects/SuperUserSelect.schema';
import { SuperUserIncludeObjectSchema as SuperUserIncludeObjectSchema } from './objects/SuperUserInclude.schema';
import { SuperUserWhereUniqueInputObjectSchema as SuperUserWhereUniqueInputObjectSchema } from './objects/SuperUserWhereUniqueInput.schema';
import { SuperUserCreateInputObjectSchema as SuperUserCreateInputObjectSchema } from './objects/SuperUserCreateInput.schema';
import { SuperUserUncheckedCreateInputObjectSchema as SuperUserUncheckedCreateInputObjectSchema } from './objects/SuperUserUncheckedCreateInput.schema';
import { SuperUserUpdateInputObjectSchema as SuperUserUpdateInputObjectSchema } from './objects/SuperUserUpdateInput.schema';
import { SuperUserUncheckedUpdateInputObjectSchema as SuperUserUncheckedUpdateInputObjectSchema } from './objects/SuperUserUncheckedUpdateInput.schema';

export const SuperUserUpsertOneSchema: z.ZodType<Prisma.SuperUserUpsertArgs> = z.object({ select: SuperUserSelectObjectSchema.optional(), include: SuperUserIncludeObjectSchema.optional(), where: SuperUserWhereUniqueInputObjectSchema, create: z.union([ SuperUserCreateInputObjectSchema, SuperUserUncheckedCreateInputObjectSchema ]), update: z.union([ SuperUserUpdateInputObjectSchema, SuperUserUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.SuperUserUpsertArgs>;

export const SuperUserUpsertOneZodSchema = z.object({ select: SuperUserSelectObjectSchema.optional(), include: SuperUserIncludeObjectSchema.optional(), where: SuperUserWhereUniqueInputObjectSchema, create: z.union([ SuperUserCreateInputObjectSchema, SuperUserUncheckedCreateInputObjectSchema ]), update: z.union([ SuperUserUpdateInputObjectSchema, SuperUserUncheckedUpdateInputObjectSchema ]) }).strict();