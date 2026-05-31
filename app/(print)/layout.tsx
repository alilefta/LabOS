// app/(print)/layout.tsx

export default function PrintLayout({ children }: { children: React.ReactNode }) {
	return (
		// A completely clean, full-screen blank canvas for document rendering [1]
		<div className="min-h-screen w-full bg-white text-black p-0">{children}</div>
	);
}
