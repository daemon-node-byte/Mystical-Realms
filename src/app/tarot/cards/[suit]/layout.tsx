import React from "react";
import type { Metadata } from "next";
import PageWrapper from "@/app/_components/common/PageWrapper";
import { api, HydrateClient } from "@/trpc/server";
import "./globals.css";


export const metadata: Metadata = {
  title: "Create Next App",
  description:
    "Create Next App with TypeScript, Tailwind CSS, NextAuth, Prisma, tRPC, and more.",
};

type Props = {
	children: React.ReactNode;
	params: {
		suit: string;
	}
}

export default async function Layout({ children, params }: Props) {
	const { suit } = params;
	const cards = await api.cards.getCardsBySuit({ suit });

  return (
      <HydrateClient>
    <PageWrapper>
				{ React.cloneElement(children as React.ReactElement, { cards }) }
    </PageWrapper>
				</HydrateClient>
  );
}
