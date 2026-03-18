import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SuperUserSelectObjectSchema as SuperUserSelectObjectSchema } from './objects/SuperUserSelect.schema';
import { SuperUserCreateInputObjectSchema as SuperUserCreateInputObjectSchema } from './objects/SuperUserCreateInput.schema';
import { SuperUserUncheckedCreateInputObjectSchema as SuperUserUncheckedCreateInputObjectSchema } from './objects/SuperUserUncheckedCreateInput.schema';

export const SuperUserCreateOneSchema: z.ZodType<Prisma.SuperUserCreateArgs> = z.object({ select: SuperUserSelectObjectSchema.optional(),  data: z.union([SuperUserCreateInputObjectSchema, SuperUserUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.SuperUserCreateArgs>;

export const SuperUserCreateOneZodSchema = z.object({ select: SuperUserSelectObjectSchema.optional(),  data: z.union([SuperUserCreateInputObjectSchema, SuperUserUncheckedCreateInputObjectSchema]) }).strict();