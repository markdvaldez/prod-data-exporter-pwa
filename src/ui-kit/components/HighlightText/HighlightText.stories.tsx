"use client";

import { Meta, StoryObj } from "@storybook/react";
import { HighlightText, HighlightTextProps } from "./HighlightText";

const meta: Meta<typeof HighlightText> = {
  title: "Components/HighlightText",
  component: HighlightText,
  argTypes: {
    text: { control: "text" },
    searchText: { control: "text" },
    className: { control: "text" },
  },
} as Meta;

export default meta;

type Story = StoryObj<HighlightTextProps>;

export const Default = {
  args: {
    text: "This is a sample text to highlight.",
    searchText: "sample",
    className: "",
  },
};

export const NoHighlight = {
  args: {
    text: "This is a sample text to highlight.",
    searchText: "",
    className: "",
  },
};

export const MultipleHighlights = {
  args: {
    text: "This is a sample text to highlight multiple sample words.",
    searchText: "sample",
    className: "",
  },
};
