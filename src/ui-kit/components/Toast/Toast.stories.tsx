import { toast } from "@/ui-kit/hooks/useToast";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Toaster } from "../Toaster";
import { Toast, ToastProps } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Blocks/Toast",
  component: Toast,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  decorators: [
    (Story) => {
      return (
        <div
          className=" bg-w0 w-full rounded-xl gap-2"
          style={{ height: "60vh" }}
        >
          <Toaster />
          <Button
            variant="outline"
            title="Show Toast"
            onClick={() => {
              toast({
                title: " Scheduled: Catch up",
                variant: "default",
              });
            }}
          />
          <Button
            variant="outline"
            title="Show Error Toast"
            onClick={() => {
              toast({
                title: "Access request failed",
                description:
                  "Access request failed Access request failed Access request failed Access request failed Access request failed Access request failed Access request failed Access request failed Access request failed Access request failed Access request failed Access request failed",
                variant: "destructive",
              });
            }}
          />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<ToastProps & { description: string }>;

export const ToastDefault: Story = {
  args: {
    title: "Access request sent",
    description: "Access request sent",
    variant: "default",
  },
};

export const ToastError: Story = {
  args: {
    title: "Access request failed",
    description: "Access request failed",
    variant: "destructive",
  },
};
