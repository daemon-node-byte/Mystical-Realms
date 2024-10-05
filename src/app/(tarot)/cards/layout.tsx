export default function Layout({
	children,
}: {
	readonly children: React.ReactNode
}) {
	return (
		<main>{children}</main>
	)
}
