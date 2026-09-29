import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "@/lib/get-session";
import {
	authorizeCatalogCategoryImageStage,
	CatalogCategoryImageStageInputSchema,
} from "@/modules/labos-files/catalog-category-upload.contract";
import {
	authorizeCatalogWorkTypeImageStage,
	CatalogWorkTypeImageStageInputSchema,
} from '@/modules/labos-files/catalog-worktype-upload.contract'
import {
	authorizeCatalogProductImageStage,
	CatalogProductImageStageInputSchema,
} from '@/modules/labos-files/catalog-product-upload.contract'
import {
	authorizeDentistAvatarStage,
	DentistAvatarStageInputSchema,
} from '@/modules/labos-files/dentist-avatar-upload.contract'
import { createUploadCompletionDTO } from "@/modules/labos-files/upload-completion.dto";
import { labOSUploadGrantService } from "@/modules/labos-files/upload-grants";
import {
	requireTenantContext,
	TenantContextError,
} from "@/platform/organizations/tenant-context";

const f = createUploadthing();

/**
 * Enhanced Auth Helper
 * @param requireLab - Set to true for operational assets, false for onboarding assets
 */
const handleAuth = async (requireLab: boolean = true) => {
	const session = await getServerSession();

	// 1. Basic Auth check - Must always be logged in
	if (!session || !session.user) throw new UploadThingError("Unauthorized");

	let labId = "onboarding_pending";
	if (requireLab) {
		try {
			const tenant = await requireTenantContext();
			if (tenant.userId !== session.user.id) throw new UploadThingError("Unauthorized");
			labId = tenant.labId;
		} catch (error) {
			if (error instanceof UploadThingError) throw error;
			if (error instanceof TenantContextError) {
				throw new UploadThingError("Action requires an active Lab Workspace");
			}
			throw error;
		}
	}

	return {
		userId: session.user.id,
		labId,
	};
};
const uploadComplete = () => createUploadCompletionDTO();

// FileRouter for your app, can contain multiple FileRoutes
export const labOSUploadRouter = {
	labLogoImage: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		.middleware(async () => await handleAuth(false))
		.onUploadComplete(uploadComplete),

	userAvatarPicture: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async () => await handleAuth(false))
		.onUploadComplete(uploadComplete),
	staffUserAvatarPicture: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async () => await handleAuth(true))
		.onUploadComplete(uploadComplete),

	categoryIconAvatar: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		.input(CatalogCategoryImageStageInputSchema)
		.middleware(async ({ input }) => {
			try {
				const tenant = await requireTenantContext();
				return await authorizeCatalogCategoryImageStage({ tenant, stage: input });
			} catch (error) {
				if (error instanceof TenantContextError) {
					throw new UploadThingError("Action requires an active Lab Workspace");
				}
				throw error;
			}
		})
		.onUploadComplete(async ({ metadata, file }) => {
			const result = await labOSUploadGrantService.completeVerifiedProviderCallback({
				metadata,
				file: { key: file.key, url: file.ufsUrl },
			});
			return { uploadGrantId: result.uploadGrantId };
		}),

	workTypeIconAvatar: f({
		image: {
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
	})
		.input(CatalogWorkTypeImageStageInputSchema)
		.middleware(async ({ input }) => {
			try {
				const tenant = await requireTenantContext()
				return await authorizeCatalogWorkTypeImageStage({ tenant, stage: input })
			} catch (error) {
				if (error instanceof TenantContextError) {
					throw new UploadThingError('Action requires an active Lab Workspace')
				}
				throw error
			}
		})
		.onUploadComplete(async ({ metadata, file }) => {
			const result = await labOSUploadGrantService.completeVerifiedProviderCallback({
				metadata,
				file: { key: file.key, url: file.ufsUrl },
			})
			return { uploadGrantId: result.uploadGrantId }
		}),

	productIconAvatar: f({
		image: {
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
	})
		.input(CatalogProductImageStageInputSchema)
		.middleware(async ({ input }) => {
			try {
				const tenant = await requireTenantContext()
				return await authorizeCatalogProductImageStage({ tenant, stage: input })
			} catch (error) {
				if (error instanceof TenantContextError) {
					throw new UploadThingError('Action requires an active Lab Workspace')
				}
				throw error
			}
		})
		.onUploadComplete(async ({ metadata, file }) => {
			const result = await labOSUploadGrantService.completeVerifiedProviderCallback({
				metadata,
				file: { key: file.key, url: file.ufsUrl },
			})
			return { uploadGrantId: result.uploadGrantId }
		}),

	dentistAvatar: f({
		'image/png': {
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
		'image/jpeg': {
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
		'image/webp': {
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
	})
		.input(DentistAvatarStageInputSchema)
		.middleware(async ({ input, files }) => {
			if (files.length !== 1) {
				throw new UploadThingError('Exactly one Dentist avatar is required')
			}
			try {
				const tenant = await requireTenantContext()
				return await authorizeDentistAvatarStage({ tenant, stage: input })
			} catch (error) {
				if (error instanceof TenantContextError) {
					throw new UploadThingError('Action requires an active Lab Workspace')
				}
				throw error
			}
		})
		.onUploadComplete(async ({ metadata, file }) => {
			const result = await labOSUploadGrantService.completeVerifiedProviderCallback({
				metadata,
				file: { key: file.key, url: file.ufsUrl },
			})
			return { uploadGrantId: result.uploadGrantId }
		}),

	genericAvatar: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async () => await handleAuth(true))
		.onUploadComplete(uploadComplete),

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
		.middleware(async () => await handleAuth(true))
		.onUploadComplete(uploadComplete),

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
