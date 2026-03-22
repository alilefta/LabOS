import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { generalPrisma } from "./prisma";
import { LabUserBase } from "@/schema/base/lab-user.base";
import { SuperUserBase } from "@/schema/base/super-user.base";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
	database: prismaAdapter(generalPrisma, {
		provider: "postgresql",
	}),
	secret: process.env.BETTER_AUTH_SECRET,
	baseURL: process.env.BETTER_AUTH_URL,

	emailAndPassword: {
		enabled: true,
	},
	user: {
		modelName: "AuthUser",
		// proposed move to user instead of session to be able to access it when user have multiple sessions (logged in from different browsers)
		additionalFields: {
			labId: {
				type: "string",
				required: false,
			},
			role: {
				type: ["LAB_USER", "SYSTEM_USER"],
				defaultValue: "LAB_USER",
				required: true,
			},
		},
	},

	plugins: [nextCookies()],
});

export type AuthUser = typeof auth.$Infer.Session.user & { labUser: LabUserBase | undefined; superUser: SuperUserBase | undefined };
// type SessionX = typeof auth.$Infer.Session.session;
export type Session = typeof auth.$Infer.Session;
