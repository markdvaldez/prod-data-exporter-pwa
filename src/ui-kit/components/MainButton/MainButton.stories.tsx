import { Icons } from "@/assets/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { MainButton, MainButtonProps } from "./MainButton";

const meta: Meta<typeof MainButton> = {
  title: "Components/MainButton",
  component: MainButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<MainButtonProps>;

export const AddMedical: Story = {
  args: {
    href: "#",
    title: "Add medical record",
    iconSrc: Icons.record40,
  },
};

export const AddProtocol: Story = {
  args: {
    href: "#",
    title: "Create treatment protocol",
    iconSrc: Icons.protocol40,
  },
};
