export const metadata = {
	title: 'Products',
};
export default function ProductLayot({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="px-10 py-10">{children}</div>;
}
