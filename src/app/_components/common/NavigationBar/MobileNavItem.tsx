import { Fragment } from "react";
import Link from "next/link";
import { NavbarMenuItem, Chip } from "@nextui-org/react";
import { type NavItemType } from "./NavItem";
import { nav_ui } from "@/app/_components/ui/Icons";
export const MobileNavItem = ({
  href,
  label,
  sub,
  isAvailable,
}: NavItemType) => {
  return (
    <Fragment>
      <NavbarMenuItem>
        <Link className="text-2xl" href={href}>
          <span>{label === "Home" && nav_ui.home}</span>
          {label}
        </Link>
        {!isAvailable && (
          <Chip className="ml-3" color="warning" variant="flat" size="sm">
            unavailable
          </Chip>
        )}
      </NavbarMenuItem>
      {sub &&
        sub.length > 0 &&
        sub.map((subItem, index) => (
          <NavbarMenuItem key={`${index * 6}-${subItem.label}`}>
            <Link href={subItem.href}>{subItem.label}</Link>
            {!subItem.isAvailable && (
              <Chip className="ml-3" color="warning" variant="flat" size="sm">
                unavailable
              </Chip>
            )}
            <p className="p-2 text-xs">{subItem.decs}</p>
          </NavbarMenuItem>
        ))}
    </Fragment>
  );
};
