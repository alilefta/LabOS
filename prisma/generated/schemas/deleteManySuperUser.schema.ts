import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './objects/SuperUserWhereInput.schema';

export const SuperUserDeleteManySchema: z.ZodType<Prisma.SuperUserDeleteManyArgs> = z.object({ where: SuperUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SuperUserDeleteManyArgs>;

export const SuperUserDeleteManyZodSchema = z.object({ where: SuperUserWhereInputObjectSchema.optional() }).strict();