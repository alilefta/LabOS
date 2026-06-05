import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsIncludeObjectSchema as LabSettingsIncludeObjectSchema } from './objects/LabSettingsInclude.schema';
import { LabSettingsOrderByWithRelationInputObjectSchema as LabSettingsOrderByWithRelationInputObjectSchema } from './objects/LabSettingsOrderByWithRelationInput.schema';
import { LabSettingsWhereInputObjectSchema as LabSettingsWhereInputObjectSchema } from './objects/LabSettingsWhereInput.schema';
import { LabSettingsWhereUniqueInputObjectSchema as LabSettingsWhereUniqueInputObjectSchema } from './objects/LabSettingsWhereUniqueInput.schema';
import { LabSettingsScalarFieldEnumSchema } from './enums/LabSettingsScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const LabSettingsFindFirstSelectSchema: z.ZodType<Prisma.LabSettingsSelect> = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    currency: z.boolean().optional(),
    language: z.boolean().optional(),
    timezone: z.boolean().optional(),
    taxRatePercentage: z.boolean().optional(),
    invoicePrefix: z.boolean().optional(),
    requirePaymentToDeliver: z.boolean().optional(),
    autoSendWhatsAppOnCompletion: z.boolean().optional(),
    autoEmailInvoices: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.LabSettingsSelect>;

export const LabSettingsFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    currency: z.boolean().optional(),
    language: z.boolean().optional(),
    timezone: z.boolean().optional(),
    taxRatePercentage: z.boolean().optional(),
    invoicePrefix: z.boolean().optional(),
    requirePaymentToDeliver: z.boolean().optional(),
    autoSendWhatsAppOnCompletion: z.boolean().optional(),
    autoEmailInvoices: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const LabSettingsFindFirstSchema: z.ZodType<Prisma.LabSettingsFindFirstArgs> = z.object({ select: LabSettingsFindFirstSelectSchema.optional(), include: z.lazy(() => LabSettingsIncludeObjectSchema.optional()), orderBy: z.union([LabSettingsOrderByWithRelationInputObjectSchema, LabSettingsOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabSettingsWhereInputObjectSchema.optional(), cursor: LabSettingsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabSettingsScalarFieldEnumSchema, LabSettingsScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.LabSettingsFindFirstArgs>;

export const LabSettingsFindFirstZodSchema = z.object({ select: LabSettingsFindFirstSelectSchema.optional(), include: z.lazy(() => LabSettingsIncludeObjectSchema.optional()), orderBy: z.union([LabSettingsOrderByWithRelationInputObjectSchema, LabSettingsOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabSettingsWhereInputObjectSchema.optional(), cursor: LabSettingsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabSettingsScalarFieldEnumSchema, LabSettingsScalarFieldEnumSchema.array()]).optional() }).strict();