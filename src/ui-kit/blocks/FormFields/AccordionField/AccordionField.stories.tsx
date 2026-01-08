import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { RecordAccordionProps } from "../../../components/Accordion/RecordAccordion";
import { Button } from "../../../components/Button";
import { TextField } from "../TextField";
import { TreatmentTypeField } from "../TreatmentTypeField";
import { AccordionField } from "./AccordionField";

const meta: Meta<typeof AccordionField> = {
  title: "Components/RecordAccordionField",
  component: AccordionField,
  parameters: {
    layout: "fullscreen",
  },
  decorators: (Story) => (
    <div
      style={{
        width: "90vh",
        padding: "1rem",
      }}
    >
      <Story />
    </div>
  ),
};

export default meta;
type Story = StoryObj<RecordAccordionProps & { name: string }>;

const defaultValues = {
  recType: "Alternative Treatments",
  treatmentType: "Treatment Type",
  description: "",
  results: "",
};

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

const FormSchema = z.object({
  recType: z.string().nonempty("This field is required"),
  treatmentType: z
    .string()
    .nonempty("Selection is required")
    .refine((value) => value !== defaultValues.treatmentType, {
      message: "This field is required",
    }),
  description: z.string().optional(),
  results: z.string().optional(),
});

const AccordionFieldStory = (args: RecordAccordionProps & { name: string }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    form.setValue("recType", data.recType);
    form.setValue("treatmentType", data.treatmentType);
    form.setValue("description", data.description || "");
    form.setValue("results", data.results || "");
    console.log("data", data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <>
          <div className="text-xs text-tDefault mb-2 uppercase tracking-widest">
            {"Record type"}
          </div>
          <AccordionField
            name="recType"
            items={values}
            itemClassName="hover:cursor-pointer"
          />
          <TreatmentTypeField
            label="Treatment Type"
            fieldKey="treatmentType"
            name="treatmentType"
          />
          <TextField
            label="Description"
            key="description"
            fieldKey="description"
            name="description"
          />
          <TextField
            label="Results"
            key="results"
            fieldKey="results"
            name="results"
          />
        </>

        <Button type="submit" title="Submit" />
      </form>
    </FormProvider>
  );
};

export const Default: Story = {
  render: (args) => <AccordionFieldStory {...args} />,
  args: {
    itemClassName: "hover:cursor-pointer",
    name: "recType",
    items: values,
  },
};
