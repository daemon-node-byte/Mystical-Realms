import { LoadingDotsSVG } from "@/app/_components/ui/LoadingDots.component";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl">Loading</h1>
        <LoadingDotsSVG />
      </div>
    </div>
  );
}
