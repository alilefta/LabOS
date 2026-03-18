import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserSelectObjectSchema as LabUserSelectObjectSchema } from './objects/LabUserSelect.schema';
import { LabUserUpdateManyMutationInputObjectSchema as LabUserUpdateManyMutationInputObjectSchema } from './objects/LabUserUpdateManyMutationInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './objects/LabUserWhereInput.schema';

export const LabUserUpdateManyAndReturnSchema: z.ZodType<Prisma.LabUserUpdateManyAndReturnArgs> = z.object({ select: LabUserSelectObjectSchema.optional(), data: LabUserUpdateManyMutationInputObjectSchema, where: LabUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabUserUpdateManyAndReturnArgs>;

export const LabUserUpdateManyAndReturnZodSchema = z.object({ select: LabUserSelectObjectSchema.optional(), data: LabUserUpdateManyMutationInputObjectSchema, where: LabUserWhereInputObjectSchema.optional() }).strict();