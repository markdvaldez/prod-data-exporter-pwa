import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchInput, SearchInputProps } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<SearchInputProps>;

const SearchInputStory = (args: SearchInputProps) => {
  const [value, setValue] = useState("");

  return (
    <SearchInput
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        args.onChange?.(e);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <SearchInputStory {...args} />,
  args: {
    placeholder: "Search...",
  },
};

export const WithoutIcon: Story = {
  render: (args) => <SearchInputStory {...args} />,
  args: {
    placeholder: "Search...",
    isLeftIcon: false,
  },
};
