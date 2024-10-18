import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import clsx from "clsx";
import type { Session } from "next-auth";

type Props = {
  session: Session;
};

export default function AuthAvatar({ session }: Readonly<Props>) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar src={session.user.image ?? ""} isBordered />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem className={clsx('text-center', 'border-b-1 space-y-2')}>
            <p>Signed in as</p>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
        </DropdownItem>
        <DropdownItem>My Profile</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
