import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceUpsertWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUpsertWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUpsertWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceWhereInputObjectSchema as CaseClinicalUploadEvidenceWhereInputObjectSchema } from './CaseClinicalUploadEvidenceWhereInput.schema';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceUpdateToOneWithWhereWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUpdateToOneWithWhereWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateToOneWithWhereWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseClinicalUploadEvidenceUpsertWithoutUploadGrantInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateToOneWithWhereWithoutUploadGrantInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInputObjectSchema)]).optional()
}).strict();
export const CaseClinicalUploadEvidenceUpdateOneWithoutUploadGrantNestedInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateOneWithoutUploadGrantNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateOneWithoutUploadGrantNestedInput>;
export const CaseClinicalUploadEvidenceUpdateOneWithoutUploadGrantNestedInputObjectZodSchema = makeSchema();
