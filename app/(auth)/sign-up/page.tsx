import { SignupForm } from "@/components/auth/sign-up-form";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
	const session = await getServerSession();
	if (!session?.session) {
		redirect("/dashboard");
	}
	return (
		<main className="w-full flex items-center justify-center h-screen">
			<SignupForm />
		</main>
	);
}
