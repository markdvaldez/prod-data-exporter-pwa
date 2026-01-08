import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TimeInput } from ".";
import { TimeInputProps } from "./TimeInput";

const TimeInputStory = () => {
  const [time, setTime] = useState("22:12:32");

  return (
    <div className="flex flex-col gap-4 max-w-sm min-h-full">
      <h3>Default</h3>
      <TimeInput key="TimeInput-1" value={time} onChange={setTime} />
      <h3>With Error</h3>
      <TimeInput
        key="DateInput-2"
        value={time}
        onChange={setTime}
        error={"Required field"}
      />
    </div>
  );
};

const meta: Meta<typeof TimeInput> = {
  title: "Components/TimeInput",
  component: TimeInput,
  parameters: {
    layout: "fullscreen",
  },
  decorators: TimeInputStory,
};

export default meta;

type Story = StoryObj<TimeInputProps>;

export const Default: Story = {
  args: {},
};
