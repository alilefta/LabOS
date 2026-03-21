import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { labOSUploadRouter } from "@/app/api/uploadthing/core";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const jetBrainMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "LabOS",
	description: "AI Dashboard For Dental Labs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
			<body className={` ${jetBrainMono.variable} ${inter.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<NextSSRPlugin routerConfig={extractRouterConfig(labOSUploadRouter)} />
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
