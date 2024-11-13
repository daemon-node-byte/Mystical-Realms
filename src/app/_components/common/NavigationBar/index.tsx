/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { LoginModal } from "../login-modal.component";
import clsx from "clsx";
import { themeFont1 } from "@/styles/fonts";
import { NavItem } from "./NavItem";
import NextImage from "next/image";
import { navLinkData } from "./navLinkData";
import { MobileNavItem } from "./MobileNavItem";
import type { Session } from "next-auth";
import AuthAvatar from "../AuthAvatar";
import LogoSVG from "@/app/_components/ui/CustomIcon/svg/crystal-ball.svg";

export default function NavigationBar({
  session,
}: {
  readonly session: Session | null;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <NextImage
            src={LogoSVG}
            alt="Mystical Realms Logo"
            className="mr-2 w-[36px] h-[36px]"
            width={16}
            height={16}
          />

          <p
            className={clsx(
              themeFont1.className,
              "text-3xl font-bold text-inherit",
            )}
          >
            Mystical Realms
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:flex gap-4 hidden" justify="center">
        <NavbarBrand>
          <NextImage
            src={LogoSVG}
            alt="Mystical Realms Logo"
            className="mr-2 w-[36px] h-[36px]"
            width={16}
            height={16}
          />
          <p
            className={clsx(
              themeFont1.className,
              "text-3xl font-bold text-inherit",
            )}
          >
            Mystical Realms
          </p>
        </NavbarBrand>

        {navLinkData.map((item, index) => (
          <NavItem
            key={`${item.label}-${index}`}
            label={item.label}
            href={item.href}
            sub={item.sub ?? []}
            isAvailable={item.isAvailable}
          />
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex">
          {session ? (
            <Link href="/api/auth/signout">Logout</Link>
          ) : (
            <LoginModal />
          )}
        </NavbarItem>

        <NavbarItem>
          {session && (
            <AuthAvatar session={session} />
          ) }
            
        </NavbarItem>

        {/* <NavbarItem>
          {session ? (
            <AuthAvatar session={session} />
          ) : (
            <Button as={Link} color="warning" href="#" variant="flat">
              Sign Up
            </Button>
          )}
        </NavbarItem>
          */}
      </NavbarContent> 

      <NavbarMenu>
        {navLinkData.map((item, index) => (
          <MobileNavItem
            key={`${item.label}-${index}`}
            href={item.href}
            label={item.label}
            sub={item.sub ?? []}
            isAvailable={item.isAvailable}
          />
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
