import { LoadingDotsSVG } from "./_components/_ui/LoadingDots.component"

export default function Loading() {
	return <div className="flex items-center justify-center h-screen">
		<div className="text-center">
			<h1 className="text-6xl">Loading</h1>
			<LoadingDotsSVG />
		</div>
	</div>
}
