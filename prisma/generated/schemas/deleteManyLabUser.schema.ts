import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './objects/LabUserWhereInput.schema';

export const LabUserDeleteManySchema: z.ZodType<Prisma.LabUserDeleteManyArgs> = z.object({ where: LabUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabUserDeleteManyArgs>;

export const LabUserDeleteManyZodSchema = z.object({ where: LabUserWhereInputObjectSchema.optional() }).strict();