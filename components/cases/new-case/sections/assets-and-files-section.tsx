"use client";
import { memo } from "react";
import { CaseFileUploadZone } from "../../case/case-inputs/case-file-upload-zone";
import { ClinicalAssetPreview } from "../../case/clinical-assets-preview";
import { useFormContext } from "react-hook-form";
import { CaseFormModeType, UpdateCaseAssetFilesInput } from "@/schema/composed/case.details";
import { AssetFileType } from "@/schema/base/enums.base";
import { CreateCaseAssetFilesInput } from "@/schema/composed/case-asset-file.details";

// Unified type that satisfies both Create and Update schemas safely
export interface UnifiedAssetFile {
	id?: string;
	isNew?: boolean;
	title: string | null;
	description: string | null;
	documentUrl: string;
	assetFileType: AssetFileType;
	fileExtension: string;
}

interface Props {
	mode: CaseFormModeType;
	onUploadFiles: (UploadedFiles: CreateCaseAssetFilesInput[] | UpdateCaseAssetFilesInput[]) => void;
}

export const AssetsAndFilesSection = memo(function AssetsAndFilesSection({ onUploadFiles, mode }: Props) {
	const { control, getValues } = useFormContext<{ caseAssetFiles: UnifiedAssetFile[] }>();
	return (
		<section className="space-y-8">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Technical Assets</h2>
			</div>

			<div className="grid grid-cols-1 gap-12">
				<CaseFileUploadZone mode={mode} onUploadFiles={onUploadFiles} />
				<ClinicalAssetPreview mode={mode} control={control} getValues={getValues} />
			</div>
		</section>
	);
});
