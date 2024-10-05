import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

type ItemIconType = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

type MenuItemType = {
  label: string;
  href: string;
  desc?: string;
  icon?: ItemIconType;
};

type NavItemDataType = {
  labelName: string;
  order: number;
  href?: string;
  icon?: React.ReactNode;
  sub: MenuItemType[];
};

const navItemHeaderData: NavItemDataType[] = [
  {
    labelName: "Home",
    order: 0,
    href: "/",
    sub: [],
  },
  {
    labelName: "Tarot",
    order: 1,
    sub: [
      {
        label: "The Card Catalog",
        href: "/cards",
        desc: "Browse the tarot deck. See images and checkout meanings for each card",
      },
      {
        label: "Spread Catalog",
        href: "/spreads",
        desc: "Look though our catalog of spreads and placement meanings.",
      },
      {
        label: "Online Journal",
        href: "/journal",
        desc: "Record and save your readings either from input or from an online one from us.",
      },
    ],
  },
];

const NavItemContent = ({
  children,
  isDropMenu,
  href,
}: {
  children: React.ReactNode;
  isDropMenu: boolean;
  href?: string;
}) =>
  !isDropMenu ? (
    <Link href={href ?? "#"}>{children}</Link>
  ) : (
    <DropdownTrigger>{children}</DropdownTrigger>
  );

const NavigationItem = ({ labelName, href, sub }: NavItemDataType) => {
  if (!href && sub.length === 0) {
    throw new Error("Either 'href' or 'sub' must be provided");
  }
  if (href && sub.length > 0) {
    throw new Error("Only one of 'href' or 'sub' can be provided");
  }

  return (
    <Dropdown>
      <NavbarItem>
        <NavItemContent
          isDropMenu={((sub?.length ?? [].length) > 0)}
          href={href}
        >
          <Button variant="light">{labelName}</Button>
        </NavItemContent>
      </NavbarItem>
      {sub.length > 0 && (
        <DropdownMenu>
          {sub.map((item, index) => (
            <DropdownItem
              key={`${item.label}-${index + 42}`}
              textValue={item.label}
              description={item.desc ?? ""}
              as={Link}
              href={item.href}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered position="sticky">
      <NavbarContent className="flex sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="start">
        {navItemHeaderData.map((navItem, index) => {
          return (
            <NavigationItem
              key={`${navItem.labelName}-${index + 56}`}
              order={navItem.order}
              labelName={navItem.labelName}
              href={navItem.href}
              sub={navItem.sub}
            />
          );
        })}
      </NavbarContent>

      <NavbarContent className="flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">Mystical Realms</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {navItemHeaderData.map((item, index) => (
          <React.Fragment key={`${item.labelName}-${index}`}>
            <NavbarMenuItem>
              <Link href={item.href ?? "#"}>{item.labelName}</Link>
            </NavbarMenuItem>
            {item.sub.length > 0 && (
              <div className="pl-3 mt-2 space-y-4">
                {item.sub.map((subItem, subIndex) => (
                  <NavbarItem key={`${subItem.label}-${subIndex + 57}`} className="pl-6">
                    <Link href={subItem.href}>{subItem.label}</Link>
                  </NavbarItem>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
