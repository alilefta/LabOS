import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserSelectObjectSchema as SuperUserSelectObjectSchema } from './objects/SuperUserSelect.schema';
import { SuperUserIncludeObjectSchema as SuperUserIncludeObjectSchema } from './objects/SuperUserInclude.schema';
import { SuperUserUpdateInputObjectSchema as SuperUserUpdateInputObjectSchema } from './objects/SuperUserUpdateInput.schema';
import { SuperUserUncheckedUpdateInputObjectSchema as SuperUserUncheckedUpdateInputObjectSchema } from './objects/SuperUserUncheckedUpdateInput.schema';
import { SuperUserWhereUniqueInputObjectSchema as SuperUserWhereUniqueInputObjectSchema } from './objects/SuperUserWhereUniqueInput.schema';

export const SuperUserUpdateOneSchema: z.ZodType<Prisma.SuperUserUpdateArgs> = z.object({ select: SuperUserSelectObjectSchema.optional(), include: SuperUserIncludeObjectSchema.optional(), data: z.union([SuperUserUpdateInputObjectSchema, SuperUserUncheckedUpdateInputObjectSchema]), where: SuperUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SuperUserUpdateArgs>;

export const SuperUserUpdateOneZodSchema = z.object({ select: SuperUserSelectObjectSchema.optional(), include: SuperUserIncludeObjectSchema.optional(), data: z.union([SuperUserUpdateInputObjectSchema, SuperUserUncheckedUpdateInputObjectSchema]), where: SuperUserWhereUniqueInputObjectSchema }).strict();