import type { Meta, StoryObj } from "@storybook/react";
import { Input, InputProps } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  decorators: (Story) => (
    <div style={{ width: "400px", minHeight: "500px" }}>
      <Story />
    </div>
  ),
};

export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    type: "text",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Enter text...",
    error: "This is an error message",
    type: "text",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Cannot type here",
    disabled: true,
    type: "text",
  },
};

export const PasswordInput: Story = {
  args: {
    placeholder: "Enter your password",
    type: "password",
  },
};

export const EmailInput: Story = {
  args: {
    placeholder: "Enter your email",
    type: "email",
  },
};

export const NumberInput: Story = {
  args: {
    placeholder: "Enter a number",
    type: "number",
  },
};
