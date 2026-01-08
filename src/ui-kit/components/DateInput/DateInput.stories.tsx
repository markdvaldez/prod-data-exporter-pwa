import type { Meta, StoryObj } from "@storybook/react";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { formatToISODate } from "@/runnersQcApp/shared/DateUtils";
import { DateFieldType, DateInput } from "./DateInput";

const DateInputStory = () => {
  const [date, setDate] = useState("2025-02-05");

  const { minimumDate, maximumDate } = useMemo(() => {
    const now = DateTime.now();

    return {
      minimumDate: formatToISODate(now.minus({ weeks: 2 })),
      maximumDate: formatToISODate(now.plus({ days: 10 })),
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 max-w-sm min-h-full">
      <h3>Default</h3>
      <DateInput
        key="DateInput-1"
        value={date}
        placeholder="Select date"
        onChange={(date) => {
          setDate(date);
        }}
      />
      <h3>With Error</h3>
      <DateInput
        key="DateInput-2"
        value={""}
        placeholder="Select date"
        minimumDate={undefined}
        maximumDate={undefined}
        onChange={(date) => {
          setDate(date);
        }}
        error={"Required field"}
      />
      <h3>With minimumDate and maximumDate</h3>
      <DateInput
        key="DateInput-3"
        value={date}
        placeholder="Select date"
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={(date) => {
          setDate(date);
        }}
      />
      <h3>With minimumDate</h3>
      <DateInput
        key="DateInput-4"
        value={date}
        placeholder="Select date"
        minimumDate={minimumDate}
        onChange={(date) => {
          setDate(date);
        }}
      />
      <h3>With maximumDate</h3>
      <DateInput
        key="DateInput-5"
        value={date}
        placeholder="Select date"
        maximumDate={maximumDate}
        onChange={(date) => {
          setDate(date);
        }}
      />
    </div>
  );
};

const meta: Meta<typeof DateInput> = {
  title: "Components/DateInput",
  component: DateInput,
  parameters: {
    layout: "fullscreen",
  },
  decorators: DateInputStory,
};

export default meta;

type Story = StoryObj<DateFieldType>;

export const Default: Story = {
  args: {},
};
