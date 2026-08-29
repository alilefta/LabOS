// providers/query-hydration-boundary.tsx
'use client'

import {
	HydrationBoundary,
	QueryClientProvider,
	type DehydratedState,
} from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getQueryClient } from "./get-query-client";

interface Props {
	state: DehydratedState;
	children: ReactNode;
}

export function QueryHydrationBoundary({ state, children }: Props) {
	return (
		<QueryClientProvider client={getQueryClient()}>
			<HydrationBoundary state={state}>{children}</HydrationBoundary>
		</QueryClientProvider>
	);
}
