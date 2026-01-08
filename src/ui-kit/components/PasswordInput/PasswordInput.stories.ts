import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput, PasswordInputProps } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<PasswordInputProps>;

export const Default: Story = {
  args: {
    error: { message: '' },
  },
};

export const WithError: Story = {
  args: {
    error: { message: 'Incorrect password' },
  },
};
