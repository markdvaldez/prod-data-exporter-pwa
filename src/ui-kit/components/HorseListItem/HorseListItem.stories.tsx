import type { Meta, StoryObj } from "@storybook/react";
import { HorseListItem, HorseListItemProps } from "./HorseListItem";

const meta: Meta<typeof HorseListItem> = {
  title: "Components/HorseListItem",
  component: HorseListItem,
};

export default meta;
type Story = StoryObj<HorseListItemProps>;

const HorseListItemStory = (args: HorseListItemProps) => {
  return <HorseListItem {...args} />;
};

export const Default: Story = {
  render: (args) => <HorseListItemStory {...args} />,
  args: {
    title: "Miss Unconcerned",
    subTitle: "(H-000-009-876)",
  },
};

export const Flagged: Story = {
  render: (args) => <HorseListItemStory {...args} />,
  args: {
    title: "Miss Unconcerned",
    subTitle: "(H-000-009-876)",
    status: "flagged",
  },
};

export const Scratched: Story = {
  render: (args) => <HorseListItemStory {...args} />,
  args: {
    title: "Miss Unconcerned",
    subTitle: "(H-000-009-876)",
    status: "scratched",
  },
};

export const WithoutIcon: Story = {
  render: (args) => <HorseListItemStory {...args} />,
  args: {
    title: "Miss Unconcerned",
    subTitle: "(H-000-009-876)",
    status: "scratched",
    showIcon: false,
  },
};
