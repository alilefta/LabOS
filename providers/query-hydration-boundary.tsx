// providers/query-hydration-boundary.tsx
// "use client";

import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface Props {
	state: DehydratedState;
	children: ReactNode;
}

export function QueryHydrationBoundary({ state, children }: Props) {
	return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
