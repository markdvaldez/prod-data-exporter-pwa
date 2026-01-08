import type { Meta, StoryObj } from "@storybook/react";
import { Compass, Share, SquarePlus } from "lucide-react";
import { TableListItem, TableListItemProps } from "./TableListItem";

const meta: Meta<typeof TableListItem> = {
  title: "Components/TableListItem",
  component: TableListItem,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<TableListItemProps>;

const options = [
  {
    title: "1. Open in your main browser",
    iconSrc: Compass,
    iconColor: "#007AFF",
  },
  {
    title: "2. Press Share in Navigation bar",
    iconSrc: Share,
    iconColor: "#007AFF",
  },
  {
    title: '3. Scroll down to "Add to Home Screen"',
    iconSrc: SquarePlus,
    iconColor: "#FFFFFF",
  },
];

export const Default: Story = {
  args: {
    title: "1. Open in your main browser",
    iconSrc: Compass,
    iconColor: "#007AFF",
  },
  decorators: (Story) => (
    <div className="p-6 bg-tDefault w-[400px] rounded-xl">
      <Story />
    </div>
  ),
  render: () => (
    <div className="flex flex-col">
      {options.map((item) => (
        <TableListItem
          key={item.title}
          iconSrc={item.iconSrc}
          title={item.title}
          iconColor={item.iconColor}
        />
      ))}
    </div>
  ),
};
