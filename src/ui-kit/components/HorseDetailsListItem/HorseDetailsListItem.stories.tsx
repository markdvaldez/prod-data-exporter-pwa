import type { Meta, StoryObj } from "@storybook/react";
import {
  HorseDetailsItemProps,
  HorseDetailsListItem,
} from "./HorseDetailsListItem";

const meta: Meta<typeof HorseDetailsListItem> = {
  title: "Components/HorseDetailsListItem",
  component: HorseDetailsListItem,
};

export default meta;
type Story = StoryObj<HorseDetailsItemProps>;

const HorseDetailsListItemStory = (args: HorseDetailsItemProps) => {
  return <HorseDetailsListItem {...args} />;
};

export const Default: Story = {
  render: (args) => (
    <div className="w-4/12">
      <HorseDetailsListItemStory {...args} />
    </div>
  ),
  args: {
    hisaHorseId: "H-000-009-876",
    name: "Miss Unconcerned",
    canRace: true,
    responsiblePerson: "Alex K",
    locationName: "Saratoga",
    bordered: true,
  },
};
