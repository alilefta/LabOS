import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { MemberArgsObjectSchema as MemberArgsObjectSchema } from './MemberArgs.schema'

const makeSchema = () => z.object({
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  createdByMember: z.union([z.boolean(), z.lazy(() => MemberArgsObjectSchema)]).optional()
}).strict();
export const FileUploadGrantIncludeObjectSchema: z.ZodType<Prisma.FileUploadGrantInclude> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantInclude>;
export const FileUploadGrantIncludeObjectZodSchema = makeSchema();
