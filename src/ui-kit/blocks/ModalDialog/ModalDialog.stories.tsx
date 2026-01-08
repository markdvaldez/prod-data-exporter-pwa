import { Button } from "@/ui-kit/components/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";
import { ModalDialog, ModalDialogProps } from "./ModalDialog";

const meta: Meta<typeof ModalDialog> = {
  title: "Blocks/ModalDialog",
  component: ModalDialog,
};

export default meta;
type Story = StoryObj<ModalDialogProps>;

const ModalDialogStory = (args: ModalDialogProps) => {
  const [open, setOpen] = useState(false);
  const handleCancelClick = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        title="Open Modal"
      />
      <ModalDialog
        {...args}
        open={open}
        onCancelClick={handleCancelClick}
        onSubmitClick={() => {}}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ModalDialogStory {...args} />,
  args: {
    title: "Edit Profile",
    description: "Make changes to your profile here.",
    buttonTitle: "Submit",
  },
};
