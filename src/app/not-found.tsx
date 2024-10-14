import PageWrapper from "./_components/common/PageWrapper";
import clsx from "clsx";
import { themeFont1 } from "@/styles/fonts";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function NotFound() {
  return (
    <PageWrapper>
      <main className="relative top-0 flex min-h-screen flex-col items-center justify-center space-y-4 px-6 text-center">
        <h1 className={clsx(themeFont1.className, "mb-8 text-3xl")}>
          404 | Resource Not Found
        </h1>
        <h2>We&apos;re having trouble locating that page.</h2>
        <p>
          This is likely because we&apos;re still working to deliver the best
          experience.
        </p>
        <p className='pb-12'>
          Please check here again soon, we are rolling out updates frequently
        </p>
        <Button
          as={Link}
          variant="ghost"
          size="lg"
          className="text-xl text-primary"
          href="/"
        >
          Return to Home
        </Button>
      </main>
    </PageWrapper>
  );
}
