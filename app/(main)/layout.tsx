import { Icon, LucideIcon, PersonStanding, TrendingUp } from "lucide-react";
import { ReactNode } from "react";

interface MainLayoutProps {
	children: ReactNode;
}

const sideBarItems = [
	{
		title: "Action Item",
		icon: <TrendingUp />,
	},
	{
		title: "Action Item",
		icon: <PersonStanding />,
	},
	{
		title: "Action Item",
		icon: <PersonStanding />,
	},
	{
		title: "Action Item",
		icon: <PersonStanding />,
	},
];
export default async function MainLayout({ children }: MainLayoutProps) {
	return (
		<div className="bg-background font-sans w-full h-screen flex">
			<aside className="w-72 bg-sidebar px-8 py-8">
				<div className="text-4xl font-sans tracking-tighter">LabOS</div>
				<div className="mt-6 flex flex-col gap-4">
					{sideBarItems.map((item, i) => (
						<SidebarItem key={`${item.title}_${i}`} title={item.title} icon={item.icon} />
					))}
				</div>
			</aside>

			<div className="flex-1 ">
				<div className="h-16 flex items-center px-4 py-2 bg-zinc-400">
					<h2>Dashboard heading</h2>
				</div>
				{children}
			</div>
		</div>
	);
}

function SidebarItem({ icon, title }: { icon: ReactNode; title: string }) {
	return (
		<div className="flex gap-4 bg-sidebar-accent px-4 py-2 rounded-2xl">
			{icon}
			<span>{title}</span>
		</div>
	);
}
