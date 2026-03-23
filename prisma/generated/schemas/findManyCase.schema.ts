import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseIncludeObjectSchema as CaseIncludeObjectSchema } from './objects/CaseInclude.schema';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './objects/CaseOrderByWithRelationInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './objects/CaseWhereInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './objects/CaseWhereUniqueInput.schema';
import { CaseScalarFieldEnumSchema } from './enums/CaseScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseFindManySelectSchema: z.ZodType<Prisma.CaseSelect> = z.object({
    id: z.boolean().optional(),
    patientId: z.boolean().optional(),
    patient: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    salesRepsId: z.boolean().optional(),
    salesReps: z.boolean().optional(),
    caseItems: z.boolean().optional(),
    caseCategoryId: z.boolean().optional(),
    caseCategory: z.boolean().optional(),
    status: z.boolean().optional(),
    grandTotal: z.boolean().optional(),
    clinicId: z.boolean().optional(),
    clinic: z.boolean().optional(),
    technicianId: z.boolean().optional(),
    Technician: z.boolean().optional(),
    caseAssetFiles: z.boolean().optional(),
    deadline: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseSelect>;

export const CaseFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    patientId: z.boolean().optional(),
    patient: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    salesRepsId: z.boolean().optional(),
    salesReps: z.boolean().optional(),
    caseItems: z.boolean().optional(),
    caseCategoryId: z.boolean().optional(),
    caseCategory: z.boolean().optional(),
    status: z.boolean().optional(),
    grandTotal: z.boolean().optional(),
    clinicId: z.boolean().optional(),
    clinic: z.boolean().optional(),
    technicianId: z.boolean().optional(),
    Technician: z.boolean().optional(),
    caseAssetFiles: z.boolean().optional(),
    deadline: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CaseFindManySchema: z.ZodType<Prisma.CaseFindManyArgs> = z.object({ select: CaseFindManySelectSchema.optional(), include: z.lazy(() => CaseIncludeObjectSchema.optional()), orderBy: z.union([CaseOrderByWithRelationInputObjectSchema, CaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWhereInputObjectSchema.optional(), cursor: CaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseScalarFieldEnumSchema, CaseScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseFindManyArgs>;

export const CaseFindManyZodSchema = z.object({ select: CaseFindManySelectSchema.optional(), include: z.lazy(() => CaseIncludeObjectSchema.optional()), orderBy: z.union([CaseOrderByWithRelationInputObjectSchema, CaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWhereInputObjectSchema.optional(), cursor: CaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseScalarFieldEnumSchema, CaseScalarFieldEnumSchema.array()]).optional() }).strict();