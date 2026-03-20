import { NextRequest, NextResponse, ProxyConfig } from "next/server";

export default function proxy(request: NextRequest) {
	console.log("Recieved call to Proxy");

	// const isLabIdExists = request.cookies.has("labId");
	// const sessionCookie = request.cookies.getAll();

	// console.log("Session Cookie", sessionCookie);

	// if (!isLabIdExists) {
	// 	return NextResponse.redirect(new URL("/onboarding", request.url));
	// }

	// return NextResponse.redirect(new URL("/dashboard", request.url));
}

// export const config: ProxyConfig = {
// 	matcher: [
// 		{
// 			source: "/api/:path*",
// 			locale: false,
// 			has: [
// 				{ type: "header", key: "Authorization", value: "Bearer Token" },
// 				{ type: "query", key: "userId", value: "123" },

// 			],
// 			missing: [{ type: "cookie", key: "session", value: "active" }],
// 		},
// 	],
// };
