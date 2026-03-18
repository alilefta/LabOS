import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeCountOutputTypeSelectObjectSchema as SalesRepresentativeCountOutputTypeSelectObjectSchema } from './SalesRepresentativeCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => SalesRepresentativeCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const SalesRepresentativeCountOutputTypeArgsObjectSchema = makeSchema();
export const SalesRepresentativeCountOutputTypeArgsObjectZodSchema = makeSchema();
