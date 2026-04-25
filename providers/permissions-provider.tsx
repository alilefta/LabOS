"use client";

import { createContext, useContext, ReactNode } from "react";
import { getPermissions, UserContext } from "@/lib/permissions/access-control";

type PermissionFlags = ReturnType<typeof getPermissions>;

const PermissionsContext = createContext<PermissionFlags | null>(null);

export function PermissionsProvider({ children, userContext }: { children: ReactNode; userContext: UserContext }) {
	const permissions = getPermissions(userContext);

	return <PermissionsContext.Provider value={permissions}>{children}</PermissionsContext.Provider>;
}

export const usePermissions = () => {
	const context = useContext(PermissionsContext);
	if (!context) throw new Error("usePermissions must be used within PermissionsProvider");
	return context;
};
