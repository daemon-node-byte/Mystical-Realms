import { Divider } from "@nextui-org/divider";

import MenuElement, { MenuElementProps } from "./MenuElement";

export default function EditorMenu() {
  const sharedSettings: Partial<MenuElementProps> = {
    size: "md",
    variant: "bordered",
    className: "hover:theme-gradient",
  };

  const fileMenu: MenuElementProps = {
    triggerLabel: "File",
    ariaLabel: "file menu",
    ...sharedSettings,
    menuItems: [
      {
        itemLabel: "New spread",
        actionKey: "new",
      },
      {
        itemLabel: "Load spread",
        actionKey: "load",
      },
      {
        itemLabel: "Save spread",
        actionKey: "save",
      },
      {
        itemLabel: "Save spread as",
        actionKey: "save_as",
      },
      {
        itemLabel: "Exit",
        actionKey: "exit",
      },
    ],
  };
  const editMenu: MenuElementProps = {
    triggerLabel: "Edit",
    ariaLabel: "edit menu",
    ...sharedSettings,
    menuItems: [
      {
        itemLabel: "Add card",
        actionKey: "add",
      },
      {
        itemLabel: "Edit spread labels",
        actionKey: "remove",
      },
    ],
  };
  const viewMenu: MenuElementProps = {
    triggerLabel: "View",
    ariaLabel: "view menu",
    ...sharedSettings,
    menuItems: [
      {
        itemLabel: "show gridlines",
        actionKey: "gridlines",
      },
      {
        itemLabel: "show rotation controls",
        actionKey: "rotation_controls",
      },
      {
        itemLabel: "show card labels",
        actionKey: "card_labels",
      },
      {
        itemLabel: "show card sequence",
        actionKey: "card_sequence",
      },
    ],
  };

  return (
    <div>
      <p>title</p>
      <div className="theme-gradient">
        <Divider className="my-2" />
        <div className="flex items-center space-x-2 bg-neutral-500 py-2">
          <MenuElement {...fileMenu} />
          <Divider orientation="vertical" />
          <MenuElement {...editMenu} />
          <Divider orientation="vertical" />
          <MenuElement {...viewMenu} />
          <Divider orientation="vertical" />
          <p>EditorV2.0</p>
        </div>
      </div>
    </div>
  );
}
