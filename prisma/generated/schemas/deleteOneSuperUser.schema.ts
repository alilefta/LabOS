import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserSelectObjectSchema as SuperUserSelectObjectSchema } from './objects/SuperUserSelect.schema';
import { SuperUserWhereUniqueInputObjectSchema as SuperUserWhereUniqueInputObjectSchema } from './objects/SuperUserWhereUniqueInput.schema';

export const SuperUserDeleteOneSchema: z.ZodType<Prisma.SuperUserDeleteArgs> = z.object({ select: SuperUserSelectObjectSchema.optional(),  where: SuperUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SuperUserDeleteArgs>;

export const SuperUserDeleteOneZodSchema = z.object({ select: SuperUserSelectObjectSchema.optional(),  where: SuperUserWhereUniqueInputObjectSchema }).strict();