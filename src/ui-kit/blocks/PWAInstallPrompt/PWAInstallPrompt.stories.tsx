import type { Meta, StoryObj } from "@storybook/react";
import { PWAInstallPrompt, PWAInstallPromptProps } from "./PWAInstallPrompt";

const meta: Meta<typeof PWAInstallPrompt> = {
  title: "Blocks/PWAInstallHandler",
  component: PWAInstallPrompt,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onCancel: () => console.log("onCancel"),
    onConfirm: () => console.log("onConfirm"),
  },
};

export default meta;
type Story = StoryObj<PWAInstallPromptProps>;

export const Default: Story = {
  args: {
    onCancel: () => console.log("onCancel"),
    onConfirm: () => console.log("onConfirm"),
    onClose: () => console.log("onClose"),
  },
};

export const Mobile: Story = {
  args: {
    isSmallScreen: true,
    onCancel: () => console.log("onCancel"),
    onConfirm: () => console.log("onConfirm"),
    onClose: () => console.log("onClose"),
  },
};
