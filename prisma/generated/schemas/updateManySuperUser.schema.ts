import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserUpdateManyMutationInputObjectSchema as SuperUserUpdateManyMutationInputObjectSchema } from './objects/SuperUserUpdateManyMutationInput.schema';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './objects/SuperUserWhereInput.schema';

export const SuperUserUpdateManySchema: z.ZodType<Prisma.SuperUserUpdateManyArgs> = z.object({ data: SuperUserUpdateManyMutationInputObjectSchema, where: SuperUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SuperUserUpdateManyArgs>;

export const SuperUserUpdateManyZodSchema = z.object({ data: SuperUserUpdateManyMutationInputObjectSchema, where: SuperUserWhereInputObjectSchema.optional() }).strict();