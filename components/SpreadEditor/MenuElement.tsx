import React, { Key } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  // DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { SharedSelection } from "@nextui-org/system";
import { Icon } from "@iconify/react";

type MenuItems = {
  itemLabel: string;
  actionKey: string;
  className?: string;
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export interface MenuElementProps {
  triggerLabel: string;
  menuItems: MenuItems[];
  actionTrigger?: (key: Key) => void | keyof Key;
  ariaLabel: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "bordered" | "flat" | "light" | "faded" | "shadow";
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
  selectionMode?: "single" | "multiple";
  selectedKeys?: string[];
}

export default function MenuElement({
  triggerLabel,
  ariaLabel,
  menuItems,
  actionTrigger,
  variant,
  size,
  color,
  className,
  selectionMode,
}: MenuElementProps) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));

  const handleSelectionChange = (newSelection: SharedSelection) => {
    if (typeof newSelection === "object") {
      const stringKeys = Array.from(newSelection).map(String);

      setSelectedKeys(new Set<string>(stringKeys));
    }
    // handle other cases like "all"
  };
  // const selectedValue = React.useMemo(
  //   () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
  //   [selectedKeys],
  // );
  const selectedValueArray = React.useMemo(
    () => Array.from(selectedKeys),
    [selectedKeys],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className={className}
          color={color}
          size={size}
          variant={variant}
        >
          {triggerLabel}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={ariaLabel}
        selectedKeys={selectedKeys}
        selectionMode={selectionMode}
        variant={variant}
        onAction={(key: Key) => {
          if (actionTrigger) {
            actionTrigger(key);
          }
        }}
        onSelectionChange={handleSelectionChange}
      >
        {menuItems.map((item) => (
          <DropdownItem
            key={item.actionKey}
            className={item.className}
            color={item.color}
            endContent={
              item.endIcon ? (
                item.endIcon
              ) : selectedValueArray.includes(item.actionKey) ? (
                <Icon icon="mdi:check-bold" />
              ) : (
                item.endIcon
              )
            }
            startContent={item.startIcon}
          >
            {item.itemLabel}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
