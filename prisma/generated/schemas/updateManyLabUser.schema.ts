import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserUpdateManyMutationInputObjectSchema as LabUserUpdateManyMutationInputObjectSchema } from './objects/LabUserUpdateManyMutationInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './objects/LabUserWhereInput.schema';

export const LabUserUpdateManySchema: z.ZodType<Prisma.LabUserUpdateManyArgs> = z.object({ data: LabUserUpdateManyMutationInputObjectSchema, where: LabUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabUserUpdateManyArgs>;

export const LabUserUpdateManyZodSchema = z.object({ data: LabUserUpdateManyMutationInputObjectSchema, where: LabUserWhereInputObjectSchema.optional() }).strict();