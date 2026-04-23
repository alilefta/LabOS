import z from "zod";
import { LabUserBaseSchema } from "../base/lab-user.base";
import { LabBaseSchema } from "../base/lab.base";
import { AuthUserBaseSchema } from "../base/auth.base";
import { LabStaffBaseSchema } from "../base/lab-staff.base";
import { CaseActivityLogBaseSchema } from "../base/case-activity-logs.base";
import { LabRoleSchema } from "../base/enums.base";

export const LabUserDetailsSchema = LabUserBaseSchema.extend({
	activityLogs: z.array(CaseActivityLogBaseSchema),
	labStaff: LabStaffBaseSchema.nullable(),
	authUser: AuthUserBaseSchema,
	lab: LabBaseSchema,
});

export type LabUserDetails = z.infer<typeof LabUserDetailsSchema>;

export const LabUserDetailsUISchema = LabUserBaseSchema.extend({
	activityLogs: z.array(CaseActivityLogBaseSchema).nullable(),
	labStaff: LabStaffBaseSchema.nullable(),
	authUser: AuthUserBaseSchema.nullable(),
	lab: LabBaseSchema.nullable(),
});

export type LabUserDetailsUI = z.infer<typeof LabUserDetailsUISchema>;

const emptyToUndefined = (v: string) => (v === "" ? undefined : v); // used inside transform(emptyToUndefined)

const optionalEmail = z
	.string()
	.trim()
	.transform(emptyToUndefined)
	.optional()
	.pipe(z.email({ message: "Please enter a valid email address." }).optional());

const optionalLogo = z
	.string()
	.trim()
	.transform(emptyToUndefined)
	.optional()
	.pipe(z.url({ message: "Avatar must be a valid URL." }).optional());

export const CreateLabUserInputSchema = z.object({
	// "name" removed - we get this from ctx.user (AuthUser)

	avatarUrl: optionalLogo,
	address1: z.string({ error: "Street address is required." }).min(5, { message: "Please enter a valid street address." }),
	address2: z.string().optional(),
	city: z.string({ error: "City is required." }).min(2, { message: "City name must be at least 2 characters." }),
	role: LabRoleSchema,
	phoneNumber: z.string({ error: "Phone number is required." }).min(7, { message: "Please enter a valid phone number." }),
	secondaryEmail: optionalEmail,
	zipcode: z.string({ error: "Zip code is required." }).min(3, { message: "Please enter a valid zip code." }),
});

export type CreateLabUserInput = z.infer<typeof CreateLabUserInputSchema>;
