import type { Meta, StoryObj } from "@storybook/react";
import { ButtonProps, CloseButton } from "./CloseButton";

const meta: Meta<typeof CloseButton> = {
  title: "Components/CloseButton",
  component: CloseButton,
  decorators: (Story) => (
    <div
      style={{
        width: "350px",
        minHeight: "200px",
        padding: "1rem",
        background: "#d3d1d1",
      }}
    >
      <Story />
    </div>
  ),
  argTypes: {
    title: { control: "text", description: "The text displayed on the button" },
    variant: {
      control: "select",
      options: ["default", "light"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the button",
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    title: "Default Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
};
