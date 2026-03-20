import { SignInForm } from "@/components/auth/sign-in-form";

export default async function SignInPage() {
	return (
		<main className="w-full flex items-center justify-center h-screen">
			<SignInForm />
		</main>
	);
}
