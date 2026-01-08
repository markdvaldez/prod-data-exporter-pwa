import type { Meta, StoryObj } from "@storybook/react";
import { HistoryListItem, HistoryListItemProps } from "./HistoryListItem";

const meta: Meta<typeof HistoryListItem> = {
  title: "Components/HistoryListItem",
  component: HistoryListItem,
};

export default meta;
type Story = StoryObj<HistoryListItemProps>;

const HistoryListItemStory = (args: HistoryListItemProps) => {
  return <HistoryListItem {...args} />;
};

export const Default: Story = {
  render: (args) => <HistoryListItemStory {...args} />,
  args: {
    date: "2025-12-12",
    hisaHorseName: "Return Fire",
    horseId: "H-000-051-852",
    descriptionText: "asfasfasfasdf",
  },
};

export const NotSynced: Story = {
  render: (args) => <HistoryListItemStory {...args} />,
  args: {
    date: "2025-12-12",
    hisaHorseName: "Return Fire",
    horseId: "H-000-051-852",
    descriptionText: "asfasfasfasdf",
  },
};
