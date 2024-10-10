// import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
// import NavigationBar from "@/app/_components/_common/NavigationBar";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import PageWrapper from "./_components/_common/PageWrapper";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from jmclain" });
  const session = await getServerAuthSession();
  console.log("🚀 ~ Home ~ session:", session)

  // void api.post.getLatest.prefetch();
 console.log('page on client')
  return (
    <HydrateClient>

      <PageWrapper>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            
            <h1 className="text-5xl">Mystical Realms</h1>
          </div>
    
          </div>
        {/* <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
                </p> */}
        {/* <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                {session ? "Sign out" : "Sign in"}
                </Link> */}

        {/* {session?.user && <LatestPost />} */}
      </PageWrapper>
    </HydrateClient>
  );
}

