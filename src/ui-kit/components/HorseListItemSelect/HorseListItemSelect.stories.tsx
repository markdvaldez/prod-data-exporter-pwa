import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  HorseListItemSelect,
  HorseListItemSelectProps,
} from "./HorseListItemSelect";

const meta: Meta<typeof HorseListItemSelect> = {
  title: "Components/HorseListItemSelect",
  component: HorseListItemSelect,
};

export default meta;
type Story = StoryObj<HorseListItemSelectProps>;

const HorseListItemSelectStory = (args: HorseListItemSelectProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(args.isChecked || false);

  return (
    <HorseListItemSelect
      {...args}
      isChecked={isChecked}
      onCheckedChange={() => setIsChecked(!isChecked)}
    />
  );
};

export const Default: Story = {
  render: (args) => <HorseListItemSelectStory {...args} />,
  args: {
    title: "Miss Unconcerned",
    subTitle: "(H-000-009-876)",
    isChecked: false,
  },
};
