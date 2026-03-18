import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicSelectObjectSchema as ClinicSelectObjectSchema } from './objects/ClinicSelect.schema';
import { ClinicIncludeObjectSchema as ClinicIncludeObjectSchema } from './objects/ClinicInclude.schema';
import { ClinicCreateInputObjectSchema as ClinicCreateInputObjectSchema } from './objects/ClinicCreateInput.schema';
import { ClinicUncheckedCreateInputObjectSchema as ClinicUncheckedCreateInputObjectSchema } from './objects/ClinicUncheckedCreateInput.schema';

export const ClinicCreateOneSchema: z.ZodType<Prisma.ClinicCreateArgs> = z.object({ select: ClinicSelectObjectSchema.optional(), include: ClinicIncludeObjectSchema.optional(), data: z.union([ClinicCreateInputObjectSchema, ClinicUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ClinicCreateArgs>;

export const ClinicCreateOneZodSchema = z.object({ select: ClinicSelectObjectSchema.optional(), include: ClinicIncludeObjectSchema.optional(), data: z.union([ClinicCreateInputObjectSchema, ClinicUncheckedCreateInputObjectSchema]) }).strict();