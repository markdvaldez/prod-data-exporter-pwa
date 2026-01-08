import { Button } from "@/ui-kit/components/Button";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Panel from "./Panel";
import PanelContent, { PanelContentProps } from "./PanelContent";

const PanelStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 min-w-full min-h-full">
      <Button className="w-24" title="Open" onClick={() => setOpen(true)} />
      <Panel title="Panel Title" open={open} onClose={() => setOpen(false)}>
        <ScrollArea className="flex max-w-md p-4 bg-mainBackground h-screen scroll-thin">
          <div className="min-h-[2000px]">
            <h2 className="text-lg font-semibold">Panel Content</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
            <Button title="Close" onClick={() => setOpen(false)} />
          </div>
        </ScrollArea>
      </Panel>
    </div>
  );
};

const meta: Meta<typeof PanelContent> = {
  title: "blocks/PanelContent",
  component: PanelContent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: PanelStory,
};

export default meta;

type Story = StoryObj<PanelContentProps>;

export const Default: Story = {
  args: {},
};
