import type { Meta, StoryObj } from "@storybook/react";
import { Loader, LoaderProps } from "./Loader";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<LoaderProps>;

export const Default: Story = {
  args: {
    size: "default",
    variant: "default",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    variant: "default",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    variant: "default",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    variant: "default",
  },
};

export const Destructive: Story = {
  args: {
    size: "default",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    size: "default",
    variant: "outline",
  },
};
