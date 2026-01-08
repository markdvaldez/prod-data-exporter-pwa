import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RecordAccordion, RecordAccordionProps } from "./RecordAccordion";

const meta: Meta<typeof RecordAccordion> = {
  title: "Components/RecordAccordion",
  component: RecordAccordion,
  parameters: {
    layout: "fullscreen",
  },
  decorators: (Story) => (
    <div
      style={{
        width: "60vh",
        padding: "1rem",
      }}
    >
      <Story />
    </div>
  ),
};

export default meta;
type Story = StoryObj<RecordAccordionProps>;

export const values = [
  { label: "Alternative Treatments", value: "Alternative Treatments" },
  { label: "Bisphosphonates", value: "Bisphosphonates" },
  { label: "Clear By Reg Vet", value: "Clear By Reg Vet" },
  { label: "Imaging", value: "Imaging" },
  {
    label: "Mandatory Attending Vet Inspection",
    value: "Mandatory Attending Vet Inspection",
  },
  { label: "Drug Administered", value: "Drug Administered" },
  { label: "Intraarticular Injection", value: "Intraarticular Injection" },
  { label: "Endoscopy", value: "Endoscopy" },
  { label: "Intralesional Injection", value: "Intralesional Injection" },
  { label: "Tests and Diagnostics", value: "Tests and Diagnostics" },
  { label: "Vaccine", value: "Vaccine" },
  { label: "Vet Inspection", value: "Vet Inspection" },
  { label: "Shockwave", value: "Shockwave" },
  { label: "Deworming", value: "Deworming" },
  { label: "Dispensed Meds", value: "Dispensed Meds" },
  { label: "Surgery", value: "Surgery" },
  { label: "Procedure", value: "Procedure" },
  { label: "Dental", value: "Dental" },
  { label: "Necropsy", value: "Necropsy" },
];

const RecordAccordionStory = (args: RecordAccordionProps) => {
  const [value, setValue] = useState(values[0].value);

  return (
    <RecordAccordion
      {...args}
      items={values}
      onChange={() => {
        setValue(value);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <RecordAccordionStory {...args} />,
  args: {
    itemClassName: "hover:cursor-pointer",
  },
};
