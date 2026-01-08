"use client";

import { Meta, StoryObj } from "@storybook/react";
import {
  SearchListItemProps,
  SearchLocationListItem,
} from "./SearchLocationListItem";

const meta: Meta<typeof SearchLocationListItem> = {
  title: "Components/SearchLocationListItem",
  component: SearchLocationListItem,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    searchText: { control: "text" },
    bordered: { control: "boolean" },
  },
} as Meta;

export default meta;

type Story = StoryObj<SearchListItemProps<any>>;

export const Default = {
  args: {
    label: "Races Field (L-000-000-127)",
    value: "L000000127",
    searchText: "races",
    bordered: true,
  },
};
