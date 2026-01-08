import type { Meta, StoryObj } from "@storybook/react";
import { PWAInstallPromptProps } from "../PWAInstallPrompt/PWAInstallPrompt";
import { PWAInstallPromptIos } from "./PWAInstallPromptIos";

const meta: Meta<typeof PWAInstallPromptIos> = {
  title: "Blocks/PWAInstallPromptIos",
  component: PWAInstallPromptIos,
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
