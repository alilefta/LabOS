import z from "zod";
const emptyToUndefined = (v: string) => (v === "" ? undefined : v); // used inside transform(emptyToUndefined)

const optionalEmail = z
	.string()
	.trim()
	.transform(emptyToUndefined)
	.optional()
	.pipe(z.email({ message: "Please enter a valid email address." }).optional());

export const CreateLabUserInputSchema = z.object({
	name: z.string({ error: "Please enter your full name." }).min(2, { message: "Name must be at least 2 characters." }),

	avatarUrl: z.string().url({ message: "Avatar must be a valid URL." }).optional(),
	address1: z.string({ error: "Street address is required." }).min(5, { message: "Please enter a valid street address." }),
	address2: z.string().optional(),
	city: z.string({ error: "City is required." }).min(2, { message: "City name must be at least 2 characters." }),
	role: z.enum(["LAB_ADMIN", "LAB_MANAGER", "LAB_STAFF"], {
		error: "Please select a valid role.",
	}),
	phoneNumber: z.string({ error: "Phone number is required." }).min(7, { message: "Please enter a valid phone number." }),
	secondaryEmail: optionalEmail,
	zipcode: z.string({ error: "Zip code is required." }).min(3, { message: "Please enter a valid zip code." }),
});

export type CreateLabUserInput = z.infer<typeof CreateLabUserInputSchema>;
