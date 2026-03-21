import { getLabInfo } from "@/data/lab";
import { getServerSession } from "@/lib/get-session";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const session = await getServerSession();

	if (!session) redirect("/sign-in");

	const lab = await getLabInfo();

	if (!lab) {
		throw new Error("No Lab Exists!");
	}

	return (
		<main className="w-full px-8 py-4">
			<h1 className="text-4xl">Welcome to Dashboard of {lab.title}</h1>
			{lab.brandAvatarUrl && <Image src={lab.brandAvatarUrl} width={800} height={800} alt={lab.title} />}
		</main>
	);
}
