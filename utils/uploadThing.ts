import { generateReactHelpers, generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

import type { LabOSUploadRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<LabOSUploadRouter>();
export const UploadDropzone = generateUploadDropzone<LabOSUploadRouter>();
export const { useUploadThing } = generateReactHelpers<LabOSUploadRouter>();
