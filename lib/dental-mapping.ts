// 1 = UR, 2 = UL, 3 = LR, 4 = LL

import { ToothPosition } from "@/schema/base/tooth-position.base";

// Index 0 = Central Incisor (1), Index 7 = 3rd Molar (8)
export const QUADRANT_TO_ENUM_MAP: Record<number, ToothPosition[]> = {
	1: [
		// Upper Right (UR)
		"UpperRightCentralIncisor",
		"UpperRightLateralIncisor",
		"UpperRightCanine",
		"UpperRightFirstPremolar",
		"UpperRightSecondPremolar",
		"UpperRightFirstMolar",
		"UpperRightSecondMolar",
		"UpperRightThirdMolar",
	],
	2: [
		// Upper Left (UL)
		"UpperLeftCentralIncisor",
		"UpperLeftLateralIncisor",
		"UpperLeftCanine",
		"UpperLeftFirstPremolar",
		"UpperLeftSecondPremolar",
		"UpperLeftFirstMolar",
		"UpperLeftSecondMolar",
		"UpperLeftThirdMolar",
	],
	3: [
		// Lower Right (LR) - Note: In physical charts, Q3 is usually LL, but matching library's transform
		"LowerRightCentralIncisor",
		"LowerRightLateralIncisor",
		"LowerRightCanine",
		"LowerRightFirstPremolar",
		"LowerRightSecondPremolar",
		"LowerRightFirstMolar",
		"LowerRightSecondMolar",
		"LowerRightThirdMolar",
	],
	4: [
		// Lower Left (LL)
		"LowerLeftCentralIncisor",
		"LowerLeftLateralIncisor",
		"LowerLeftCanine",
		"LowerLeftFirstPremolar",
		"LowerLeftSecondPremolar",
		"LowerLeftFirstMolar",
		"LowerLeftSecondMolar",
		"LowerLeftThirdMolar",
	],
};

// Extracted from react-odontogram (The "square" layout quadrants)
export const DENTAL_QUADRANTS = [
	{ id: 1, transform: "", label: "Upper Right", isUpper: true },
	{ id: 2, transform: "translate(840, 0) scale(-1, 1) translate(-55,0)", label: "Upper Left", isUpper: true },
	{ id: 3, transform: "scale(1, -1) translate(0, -150)", label: "Lower Right", isUpper: false },
	{ id: 4, transform: "translate(840, 0) scale(-1, -1) translate(-55,-150)", label: "Lower Left", isUpper: false },
];
