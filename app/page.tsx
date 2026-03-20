import { ThemeToggle } from "@/components/ui/custom/theme-toggle";

export default function Home() {
	return (
		<div className="h-dvh  px-8  w-screen">
			<header className="flex items-center justify-between py-5">
				<h2 className="text-2xl font-mono">LabOS</h2>
				<ThemeToggle />
			</header>
			<main className="px-5 w-full flex items-center justify-center h-full">
				<h1 className="text-3xl font-sans">Landing Page</h1>
			</main>
		</div>
	);
}
