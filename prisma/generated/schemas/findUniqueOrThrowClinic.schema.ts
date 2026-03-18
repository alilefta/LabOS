import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicSelectObjectSchema as ClinicSelectObjectSchema } from './objects/ClinicSelect.schema';
import { ClinicIncludeObjectSchema as ClinicIncludeObjectSchema } from './objects/ClinicInclude.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './objects/ClinicWhereUniqueInput.schema';

export const ClinicFindUniqueOrThrowSchema: z.ZodType<Prisma.ClinicFindUniqueOrThrowArgs> = z.object({ select: ClinicSelectObjectSchema.optional(), include: ClinicIncludeObjectSchema.optional(), where: ClinicWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ClinicFindUniqueOrThrowArgs>;

export const ClinicFindUniqueOrThrowZodSchema = z.object({ select: ClinicSelectObjectSchema.optional(), include: ClinicIncludeObjectSchema.optional(), where: ClinicWhereUniqueInputObjectSchema }).strict();