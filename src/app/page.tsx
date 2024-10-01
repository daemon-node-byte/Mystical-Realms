import clsx from "clsx";

import { whisper } from "@/global/fonts";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-[1200px] mx-auto">
      <h1 className={clsx(whisper.className, 'text-5xl md:text-7xl xl:text-8xl mb-2 md:mb-4')}>Mystical Realms</h1>
      <p>Discover the mystic in the realm of you</p>
    </div>
  );
}
