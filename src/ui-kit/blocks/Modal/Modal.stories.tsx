import { Button } from "@/ui-kit/components/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal, ModalProps } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Blocks/Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<ModalProps>;

const ModalStory = (args: ModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        title="Open Modal"
      />
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        <div className="bg-white p-6 rounded-lg max-w-md w-full mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
          <p>Make changes to your profile here. Click submit.</p>
          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              title="Cancel"
            />
            <Button
              onClick={() => console.log("Action Confirmed!")}
              title="Submit"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const FullScreenBottomModalStory = (args: ModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative min-h-screen">
      <div className="flex justify-center items-center min-h-screen">
        <Button
          variant="outline"
          onClick={() => setOpen(!open)}
          title="Open Full-Screen Bottom Modal"
        />
      </div>
      <Modal {...args} open={open} onClose={() => setOpen(false)} swipeToClose>
        <div className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-lg h-[70vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-center">
            Full-Screen Modal
          </h2>
          <p className="text-center">
            This modal takes up the full width of the screen and 70% of the
            height.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              title="Close"
            />
            <Button
              onClick={() => console.log("Action Confirmed!")}
              title="Confirm"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const TopSlideModalStory = (args: ModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        title="Open Top-Slide Modal"
      />
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        <div className="bg-white p-6 rounded-lg max-w-md w-full mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">Top Slide Modal</h2>
          <p>This modal slides down from the top.</p>
          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              title="Close"
            />
            <Button
              onClick={() => console.log("Action Confirmed!")}
              title="Confirm"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const LeftSlideModalStory = (args: ModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        title="Open Left-Slide Modal"
      />
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        <div className="bg-white p-6 rounded-lg max-w-md w-full mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">Left Slide Modal</h2>
          <p>This modal slides in from the left.</p>
          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              title="Close"
            />
            <Button
              onClick={() => console.log("Action Confirmed!")}
              title="Confirm"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ModalStory {...args} />,
  args: {
    animationDirection: "bottom",
  },
};

export const FullScreenBottom: Story = {
  render: (args) => <FullScreenBottomModalStory {...args} />,
  args: {
    animationDirection: "bottom",
  },
};

export const TopSlide: Story = {
  render: (args) => <TopSlideModalStory {...args} />,
  args: {
    animationDirection: "top",
  },
};

export const LeftSlide: Story = {
  render: (args) => <LeftSlideModalStory {...args} />,
  args: {
    animationDirection: "left",
  },
};
