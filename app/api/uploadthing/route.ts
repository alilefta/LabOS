import { createRouteHandler } from "uploadthing/next";
import { labOSUploadRouter } from "@/app/api/uploadthing/core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
	router: labOSUploadRouter,

	// Apply an (optional) custom config:
	// config: { ... },
});
