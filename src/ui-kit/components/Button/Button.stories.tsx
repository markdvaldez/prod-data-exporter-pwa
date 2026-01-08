import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    title: "Default Button",
    variant: "default",
    size: "default",
    fetching: false,
    disabled: false,
  },
};

export const Destructive: Story = {
  args: {
    title: "Destructive Button",
    variant: "destructive",
    size: "default",
    fetching: false,
    disabled: false,
  },
};

export const Outline: Story = {
  args: {
    title: "Outline Button",
    variant: "outline",
    size: "default",
    fetching: false,
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    title: "Large Button",
    variant: "default",
    size: "lg",
    fetching: false,
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    title: "Small Button",
    variant: "default",
    size: "sm",
    fetching: false,
    disabled: false,
  },
};

export const WithLoader: Story = {
  args: {
    title: "Loading...",
    variant: "default",
    size: "default",
    fetching: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled Button",
    variant: "default",
    size: "default",
    fetching: false,
    disabled: true,
  },
};
