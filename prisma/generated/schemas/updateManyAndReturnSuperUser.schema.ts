import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserSelectObjectSchema as SuperUserSelectObjectSchema } from './objects/SuperUserSelect.schema';
import { SuperUserUpdateManyMutationInputObjectSchema as SuperUserUpdateManyMutationInputObjectSchema } from './objects/SuperUserUpdateManyMutationInput.schema';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './objects/SuperUserWhereInput.schema';

export const SuperUserUpdateManyAndReturnSchema: z.ZodType<Prisma.SuperUserUpdateManyAndReturnArgs> = z.object({ select: SuperUserSelectObjectSchema.optional(), data: SuperUserUpdateManyMutationInputObjectSchema, where: SuperUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SuperUserUpdateManyAndReturnArgs>;

export const SuperUserUpdateManyAndReturnZodSchema = z.object({ select: SuperUserSelectObjectSchema.optional(), data: SuperUserUpdateManyMutationInputObjectSchema, where: SuperUserWhereInputObjectSchema.optional() }).strict();