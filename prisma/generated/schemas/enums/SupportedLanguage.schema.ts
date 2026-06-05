import * as z from 'zod';

export const SupportedLanguageSchema = z.enum(['EN', 'AR', 'KU'])

export type SupportedLanguage = z.infer<typeof SupportedLanguageSchema>;