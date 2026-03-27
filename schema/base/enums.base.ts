import * as z from "zod";

// ========== Case Status ===========
export const CaseStatusSchema = z.enum(["NEW", "ASSIGNED", "PROCESSING", "COMPLETED", "FAILED", "DELIVERED", "DRAFT"]);
export type CaseStatus = z.infer<typeof CaseStatusSchema>;

// ========== Asset File Type ===========
export const AssetFileTypeSchema = z.enum(["IMAGE", "VIDEO", "SCANNERFILE"]);
export type AssetFileType = z.infer<typeof AssetFileTypeSchema>;

// ========== Auth User Role ===========
export const AuthUserRoleSchema = z.enum(["SYSTEM_USER", "LAB_USER"]);
export type AuthUserRole = z.infer<typeof AuthUserRoleSchema>;

// ========== Pricing Strategy ===========
export const PricingStrategySchema = z.enum(["BULK", "PERTOOTH", "CUSTOM"]);
export type PricingStrategy = z.infer<typeof PricingStrategySchema>;

// ========== Lab User Role ===========
export const LabRoleSchema = z.enum(["OWNER", "MANAGER", "ADMIN", "STAFF"]);
export type LabRole = z.infer<typeof LabRoleSchema>;

// ========== Jaw Type ============
export const JawTypeSchema = z.enum(["UPPER", "LOWER", "OTHER"]);
export type JawType = z.infer<typeof JawTypeSchema>;

// ========== Clinic Status ============
export const ClinicStatusSchema = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);
export type ClinicStatus = z.infer<typeof ClinicStatusSchema>;

// ========== Clinic Type ============
export const ClinicTypeSchema = z.enum(["SOLO", "CLINIC", "HOSPITAL", "UNIVERSITY"]);
export type ClinicType = z.infer<typeof ClinicTypeSchema>;

// ========== Patient Gender ============
export const PatientGenderSchema = z.enum(["MALE", "FEMALE", "OTHER"]);
export type PatientGender = z.infer<typeof PatientGenderSchema>;

// ========== Subscription Tier ============
export const SubscriptionTierSchema = z.enum(["FREE", "STARTER", "PROFESSIONAL", "ENTERPRISE"]);
export type SubscriptionTier = z.infer<typeof SubscriptionTierSchema>;
