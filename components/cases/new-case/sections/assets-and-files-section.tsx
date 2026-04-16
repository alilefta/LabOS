"use client";
import { memo } from "react";
import { CaseFileUploadZone } from "../../case/case-inputs/case-file-upload-zone";
import { ClinicalAssetPreview } from "../../case/clinical-assets-preview";
import { CreateCaseAssetFilesInput } from "@/schema/composed/case-asset-file.details";
import { Control, UseFormGetValues } from "react-hook-form";
import { CreateCaseInput } from "@/schema/composed/case.details";

interface Props {
	onUploadFiles: (UploadedFiles: CreateCaseAssetFilesInput[]) => void;
	control: Control<CreateCaseInput>;
	getValues: UseFormGetValues<CreateCaseInput>;
}
export const AssetsAndFilesSection = memo(function AssetsAndFilesSection({ onUploadFiles, control, getValues }: Props) {
	return (
		<section className="space-y-8">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Technical Assets</h2>
			</div>

			<div className="grid grid-cols-1 gap-12">
				<CaseFileUploadZone onUploadFiles={onUploadFiles} />
				<ClinicalAssetPreview control={control} getValues={getValues} />
			</div>
		</section>
	);
});
