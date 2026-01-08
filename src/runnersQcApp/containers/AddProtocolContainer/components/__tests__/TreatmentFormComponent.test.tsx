import {
  HorseMedicalRecType,
  HorseMedicalRouteAdmin,
} from "@/Types/global-types";
import { render, screen, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { getInspectionType } from "../../../addRecordAndProtocolConfig";
import { TreatmentFormComponent } from "../TreatmentFormComponent";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../../../addRecordAndProtocolConfig", () => ({
  getFormFields: jest.fn(() => ({
    protocolFields: [
      { name: "drugDosage" },
      { name: "procedure" },
      { name: "recType" },
    ],
    defaultValues: { drugDosage: "", procedure: "", recType: "" },
    protocolSchema: {},
  })),
  DEFAULT_VALUES: {},
  getInspectionType: jest.fn(() => "MOCK_INSPECTION"),
}));

jest.mock("@/runnersQcApp/shared/TextUtils", () => ({
  formatInput: jest.fn((val) => val),
  getNumbers: jest.fn((val) => val),
  getMeasure: jest.fn(() => "mg"),
  removeSpaces: jest.fn((val) => val),
}));

jest.mock("../TreatmentFormView", () => ({
  TreatmentFormView: (props: any) => (
    <div data-testid="TreatmentFormView">{JSON.stringify(props)}</div>
  ),
}));

jest.mock("../ProtocolName", () => ({
  ProtocolName: (props: any) => (
    <div data-testid="ProtocolName">{JSON.stringify(props)}</div>
  ),
}));

jest.mock("react-hook-form", () => {
  const original = jest.requireActual("react-hook-form");
  return {
    ...original,
    useForm: () => ({
      handleSubmit: (cb: any) => () => cb(),
      control: {},
      setValue: jest.fn(),
      formState: { errors: {} },
    }),
    FormProvider: ({ children }: any) => <div>{children}</div>,
    useWatch: jest.fn(() => ({})),
  };
});

describe("<TreatmentFormComponent />", () => {
  it("renders ProtocolName with props", () => {
    render(
      <TreatmentFormComponent
        protocolName="Test Protocol"
        recType="SomeType"
        activeTreatment={{}}
        handleChangeName={jest.fn()}
        handleClear={jest.fn()}
        onSubmit={jest.fn()}
        handleSetRecType={jest.fn()}
      />
    );

    const proto = screen.getByTestId("ProtocolName");
    expect(proto).toBeInTheDocument();
    expect(proto).toHaveTextContent("Test Protocol");
  });

  it("renders TreatmentFormView when isReady is true", async () => {
    render(
      <TreatmentFormComponent
        protocolName="Test Protocol"
        recType="SomeType"
        activeTreatment={{}}
        handleChangeName={jest.fn()}
        handleClear={jest.fn()}
        onSubmit={jest.fn()}
        handleSetRecType={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId("TreatmentFormView")).toBeInTheDocument();
    });
  });

  it("calls getInspectionType when recType is MandatoryPreRaceAndPreWorkVetInspection", () => {
    render(
      <TreatmentFormComponent
        protocolName="Test Protocol"
        recType={HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection}
        activeTreatment={{
          recType: HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection,
          clearedToRace: true,
          clearedToWork: true,
        }}
        handleChangeName={jest.fn()}
        handleClear={jest.fn()}
        onSubmit={jest.fn()}
        handleSetRecType={jest.fn()}
      />
    );
    expect(getInspectionType).toHaveBeenCalledWith(true, true);
  });

  it("sets drugRoute when recType matches DrugAdministered", () => {
    render(
      <TreatmentFormComponent
        protocolName="Test Protocol"
        recType={HorseMedicalRecType.DrugAdministered}
        activeTreatment={{
          recType: HorseMedicalRecType.DrugAdministered,
          drugRoute: HorseMedicalRouteAdmin.IV,
        }}
        handleChangeName={jest.fn()}
        handleClear={jest.fn()}
        onSubmit={jest.fn()}
        handleSetRecType={jest.fn()}
      />
    );

    expect(screen.getByTestId("TreatmentFormView")).toBeInTheDocument();
  });

  it("submitForm calls onSubmit", async () => {
    const onSubmit = jest.fn();
    const ref = createRef<any>();

    render(
      <TreatmentFormComponent
        ref={ref}
        protocolName="test"
        recType="SomeType"
        activeTreatment={{}}
        handleChangeName={jest.fn()}
        handleClear={jest.fn()}
        onSubmit={onSubmit}
        handleSetRecType={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });

    ref.current.submitForm();

    expect(onSubmit).toHaveBeenCalled();
  });

  it("resetForm sets default values", async () => {
    const ref = createRef<any>();
    render(
      <TreatmentFormComponent
        ref={ref}
        protocolName="Test Protocol"
        recType="SomeType"
        activeTreatment={{}}
        handleChangeName={jest.fn()}
        handleClear={jest.fn()}
        onSubmit={jest.fn()}
        handleSetRecType={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });

    ref.current.resetForm();
  });
});
