import { usePathname } from "next/navigation";
import {
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Chip
} from "@nextui-org/react";
import { nav_ui } from "@/app/_components/ui/Icons";

export type NavItemType = {
  label: string;
  href: string;
  sub?: Array<{ label: string; href: string; decs: string, isAvailable: boolean }>;
  isAvailable: boolean;
};

export const NavItem = ({ label, href, sub, isAvailable }: NavItemType) => {
  const pathname = usePathname();
  const active = href === pathname;
  return (
    <Dropdown>
      <Badge
        isInvisible={isAvailable}
        content={"unavailable"}
        color="warning"
        size="sm"
      >
        <NavbarItem isActive={active}>
          {!sub?.length && href ? (
            <Button as={Link} href={href} variant="light">
              {href === "/" ? nav_ui.home : label}
            </Button>
          ) : (
            <DropdownTrigger>
              <Button variant="light">{label}</Button>
            </DropdownTrigger>
          )}
        </NavbarItem>
      </Badge>
      {sub?.length && (
        <DropdownMenu className="max-w-[300px]">
          {sub.map((item, index) => (
            <DropdownItem
              key={`${item.label}-${index}`}
              description={item.decs}
              href={item.href}
              className="hover:bg-gray-100"
              as={Link}
            >  
              {item.label}
              {!item.isAvailable && (
                <Chip className="ml-3" color="warning" size="sm" variant="flat">
                  unavailable
                </Chip>
              )}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </Dropdown>
  );
};
