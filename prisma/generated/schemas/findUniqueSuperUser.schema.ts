import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserSelectObjectSchema as SuperUserSelectObjectSchema } from './objects/SuperUserSelect.schema';
import { SuperUserWhereUniqueInputObjectSchema as SuperUserWhereUniqueInputObjectSchema } from './objects/SuperUserWhereUniqueInput.schema';

export const SuperUserFindUniqueSchema: z.ZodType<Prisma.SuperUserFindUniqueArgs> = z.object({ select: SuperUserSelectObjectSchema.optional(),  where: SuperUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SuperUserFindUniqueArgs>;

export const SuperUserFindUniqueZodSchema = z.object({ select: SuperUserSelectObjectSchema.optional(),  where: SuperUserWhereUniqueInputObjectSchema }).strict();