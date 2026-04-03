import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadedFileData } from "uploadthing/types";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "@/lib/get-session";

const f = createUploadthing();

const auth = async (req: Request) => {
	const session = await getServerSession();

	if (!session) throw new UploadThingError("Unauthorized");

	const labId = session.user.labId;
	if (!labId) throw new UploadThingError("No lab associated with this account");

	return {
		userId: session.user.id,
		labId, // ← pass it through
	};
};

type UploadCompleteResults = {
	data: {
		metadata: {
			userId: string;
			labId: string;
		};
		file: UploadedFileData;
	};
	fileRouteName: string;
};

const uploadComplete = ({ data, fileRouteName }: UploadCompleteResults) => {
	const { metadata, file } = data;
	// This code RUNS ON YOUR SERVER after upload
	console.log(`Upload ${fileRouteName} complete for userId:`, metadata.userId);

	console.log("file url", file.ufsUrl);

	// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
	return { uploadedBy: metadata.userId, labId: metadata.labId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const labOSUploadRouter = {
	labLogoImage: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		.middleware(({ req }) => auth(req))
		.onUploadComplete((data) => uploadComplete({ data, fileRouteName: "Lab Logo Image" })),

	userAvatarPicture: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => auth(req))
		.onUploadComplete(async (data) => uploadComplete({ data, fileRouteName: "User Avatar Picture" })),

	categoryIconAvatar: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => auth(req))
		.onUploadComplete(async (data) => uploadComplete({ data, fileRouteName: "Case Category Icon Avatar" })),

	genericAvatar: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => auth(req))
		.onUploadComplete(async (data) => uploadComplete({ data, fileRouteName: "Generic Avatar Icon" })),

	caseAssetsRoute: f({
		image: {
			maxFileSize: "16MB",
			maxFileCount: 1,
		},

		video: {
			maxFileSize: "256MB",
			maxFileCount: 1,
		},

		blob: {
			maxFileSize: "256MB",
			maxFileCount: 1,
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => auth(req))
		.onUploadComplete(async (data) => uploadComplete({ data, fileRouteName: "Case Assets Route" })),

	// messageFile: f({
	// 	image: { maxFileSize: "8MB", maxFileCount: 5 },
	// 	pdf: { maxFileSize: "8MB", maxFileCount: 5 },
	// 	text: { maxFileSize: "64KB", maxFileCount: 5 }, // Keep text files small
	// 	video: { maxFileSize: "32MB", maxFileCount: 2 },
	// })
	// 	.middleware(({ req }) => auth(req))
	// 	.onUploadComplete((data) => uploadComplete({ data, fileRouteName: "Message File Attachement" })),
} satisfies FileRouter;

export type LabOSUploadRouter = typeof labOSUploadRouter;
