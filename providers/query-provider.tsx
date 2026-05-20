// /components/providers/query-provider.tsx
"use client";
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "./get-query-client";
import { useState } from "react";

// ============ newer implementation ================
// that consider the server components usage of queryClient! without having to re create new QueryClient() each time which is anti-pattern for server components
// The reason is, server components can't use useQueryClient().

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => getQueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			{children} <ReactQueryDevtools initialIsOpen={false} position="left" />
		</QueryClientProvider>
	);
}

// =============== old implementation ==============
// export function QueryProvider({ children }: { children: React.ReactNode }) {
// 	// ✅ Create client in component (per-user instance)
// 	const [queryClient] = useState(
// 		() =>
// 			new QueryClient({
// 				defaultOptions: {
// 					queries: {
// 						staleTime: 60 * 1000, // 1 minute
// 						refetchOnWindowFocus: false,
// 					},
// 				},
// 			}),
// 	);

// 	return (
// 		<QueryClientProvider client={queryClient}>
// 			{children}
// 			<ReactQueryDevtools initialIsOpen={false} position="left" />
// 		</QueryClientProvider>
// 	);
// }
