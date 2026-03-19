import { ReactNode } from "react";

interface MainLayoutProps {
	children: ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
	return (
		<div>
			<h2>This is the main layout</h2>
			{children}
		</div>
	);
}
