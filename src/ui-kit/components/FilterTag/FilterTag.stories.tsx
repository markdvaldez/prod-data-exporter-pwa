"use client";

import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { FilterTag, FilterTagProps } from "./FilterTag";

const meta: Meta<typeof FilterTag> = {
  title: "Components/FilterTag",
  component: FilterTag,
};

export default meta;

type Story = StoryObj<FilterTagProps>;

const FilterTagStory: React.FC<FilterTagProps> = (props) => {
  const [selected, setSelected] = useState(false);

  const handlePress = (id?: string) => {
    setSelected((prev) => !prev);
    console.log("Clicked tag", id);
  };

  return <FilterTag {...props} isSelected={selected} onPress={handlePress} />;
};

export const Default: Story = {
  render: (args) => <FilterTagStory {...args} />,
  args: {
    title: "Example Tag",
  },
};
