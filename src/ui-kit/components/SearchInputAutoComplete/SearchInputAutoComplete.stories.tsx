import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  OptionType,
  OptionsType,
  SearchInputAutoComplete,
  SearchInputAutoCompleteProps,
} from "./SearchInputAutoComplete";

const options: OptionsType = [
  { label: "DrugAdministered", value: "Drug Administered" },
  { label: "Dental", value: "Dental" },
  { label: "IntraarticularInjection", value: "Intraarticular Injection" },
];

const meta: Meta<typeof SearchInputAutoComplete> = {
  title: "Components/SearchInputAutoComplete",
  component: SearchInputAutoComplete,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SearchInputAutoComplete>;

const SearchInputAutoCompleteStory = (args: SearchInputAutoCompleteProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | undefined>(
    undefined
  );

  return (
    <div style={{ width: "300px" }}>
      <SearchInputAutoComplete
        {...args}
        data={options}
        value={selectedOption}
        onChange={(e) => {
          const selected = options.find(
            (option) => option.value === e.target.value
          );
          setSelectedOption(selected);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <SearchInputAutoCompleteStory {...args} />,
  args: {
    placeholder: "Search options...",
  },
};

export const WithoutIcon: Story = {
  render: (args) => <SearchInputAutoCompleteStory {...args} />,
  args: {
    placeholder: "Search options...",
    isLeftIcon: false,
  },
};
