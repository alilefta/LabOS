import { ThemeToggle } from "@/components/ui/custom/theme-toggle";
import { UserAvatar } from "@/components/user/user-avatar";
import { getServerSession } from "@/lib/get-session";

export default async function Home() {
	const session = await getServerSession();
	const user = session?.user;

	return (
		<div className="h-dvh  px-8  w-screen">
			<header className="flex items-center justify-between py-5">
				<h2 className="text-2xl font-mono">LabOS</h2>
				<ThemeToggle />
				{user && <UserAvatar />}
			</header>
			<main className="px-5 w-full flex items-center justify-center h-full">
				<h1 className="text-3xl font-sans">Landing Page</h1>
			</main>
		</div>
	);
}
