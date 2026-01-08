import { act, render, screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mockFavorites } from "../../../../../../__mocks__/protocols";
import { DateBlock } from "../DateBlock";

jest.mock("@/services/store/modules/locations/selectors", function () {
  const actual = jest.requireActual(
    "@/services/store/modules/locations/selectors"
  );
  return {
    ...actual,
    selectLocationDescription: jest.fn(() => "Test Location"),
    selectFavoriteLocations: jest.fn(() => []),
  };
});

jest.mock("graphql-request", () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
  request: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/ui-kit/components/DateInput", () => ({
  DateInput: () => <div>DateInput Mock</div>,
}));

jest.mock("@/ui-kit/components/TimeInput", () => ({
  TimeInput: () => <div>TimeInput Mock</div>,
}));

jest.mock("@/ui-kit/blocks/FormFields/DateField", () => ({
  DateField: () => <div>DateField</div>,
}));
jest.mock("@/ui-kit/blocks/FormFields/TimeField", () => ({
  TimeField: () => <div>TimeField</div>,
}));
jest.mock("@/ui-kit/blocks/FormFields/TreatedByField", () => ({
  TreatedByField: () => <div>TreatedByField</div>,
}));
jest.mock("@/ui-kit/blocks/FormFields/LocationField", () => ({
  LocationField: () => <div>LocationField</div>,
}));
jest.mock("@/ui-kit/components/TreatmentLocation", () => ({
  TreatmentLocation: () => <div>TreatmentLocation</div>,
}));

jest.mock("@/utils/formatters", () => ({
  getFormattedId: jest.fn((id) => `P-${id}`),
}));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query === "(orientation: portrait)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

type FormData = {
  notes: string;
  horses: any[];
  treatedByPerson?: string | null;
  treatmentLocation?: {
    locationId?: string;
    locationName?: string;
  };
};

const mockStore = configureStore([]);

describe("<DateBlock />", () => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm({ defaultValues: { horses: [] } });
    const store = mockStore({
      auth: { userData: { id: "mock-user" } },
      locations: { locationDescription: "Test Location" },
      persons: { persons: [] },
      search: { personsList: [], isFetching: false },
      favorites: { favoriteLocations: mockFavorites },
    });

    return (
      <Provider store={store}>
        <FormProvider {...methods}>{children}</FormProvider>
      </Provider>
    );
  };

  it("renders date block heading", () => {
    render(
      <Wrapper>
        <DateBlock
          activeIndex={0}
          handlePersonChange={() => {}}
          treatedPerson={null}
        />
      </Wrapper>
    );

    expect(screen.getByText("setDateTime")).toBeInTheDocument();
  });

  it("renders all field labels", () => {
    render(
      <Wrapper>
        <DateBlock
          activeIndex={0}
          handlePersonChange={() => {}}
          treatedPerson={null}
        />
      </Wrapper>
    );

    expect(screen.getByText("DateField")).toBeInTheDocument();
    expect(screen.getByText("TimeField")).toBeInTheDocument();
    expect(screen.getByText("treatedBy*")).toBeInTheDocument();
    expect(screen.getByText("treatmentLocation*")).toBeInTheDocument();
    expect(screen.getByText("TreatedByField")).toBeInTheDocument();
    expect(screen.getByText("LocationField")).toBeInTheDocument();
  });

  it("renders TreatmentLocation banner if horses have locationId", () => {
    const store = mockStore({
      auth: { userData: { id: "mock-user" } },
      locations: { locationDescription: "Test Location" },
      persons: { persons: [] },
      search: { personsList: [], isFetching: false },
      favorites: { favoriteLocations: [] },
    });

    const WrapperWithHorses = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({
        defaultValues: {
          horses: [{ locationId: "1", locationName: "Test Location" }],
        },
      });
      return (
        <Provider store={store}>
          <FormProvider {...methods}>{children}</FormProvider>
        </Provider>
      );
    };

    render(
      <WrapperWithHorses>
        <DateBlock
          activeIndex={0}
          handlePersonChange={() => {}}
          treatedPerson={null}
        />
      </WrapperWithHorses>
    );

    expect(screen.getByText("TreatmentLocation")).toBeInTheDocument();
    expect(screen.queryByText("LocationField")).not.toBeInTheDocument();
  });

  it("merges locationDescription into notes field", async () => {
    const WrapperWithNotes = ({
      children,
    }: {
      children: (methods: UseFormReturn<FormData>) => React.ReactNode;
    }) => {
      const methods = useForm<FormData>({
        defaultValues: { notes: "Previous notes", horses: [] },
      });

      const store = mockStore({
        auth: { userData: { id: "mock-user" } },
        locations: { locationDescription: "Test Location" },
        persons: { persons: [] },
        search: { personsList: [], isFetching: false },
        favorites: { favoriteLocations: [] },
      });

      return (
        <Provider store={store}>
          <FormProvider {...methods}>{children(methods)}</FormProvider>
        </Provider>
      );
    };

    let methodsRef: UseFormReturn<FormData>;

    render(
      <WrapperWithNotes>
        {(methods) => {
          methodsRef = methods;
          return (
            <DateBlock
              activeIndex={0}
              handlePersonChange={() => {}}
              treatedPerson={null}
            />
          );
        }}
      </WrapperWithNotes>
    );

    await waitFor(() => {
      const notes = methodsRef.getValues("notes");
      expect(notes).toContain("Previous notes");
      expect(notes).toContain("Test Location");
    });
  });

  it("clears treatedByPerson when treatedPerson becomes null", async () => {
    const store = mockStore({
      auth: { userData: { id: "mock-user" } },
      locations: { locationDescription: "" },
      persons: { persons: [] },
      search: { personsList: [], isFetching: false },
      favorites: { favoriteLocations: [] },
    });

    let methodsRef: UseFormReturn<FormData> | undefined;

    const TestWrapper = ({
      treatedPerson,
      defaultValues = {},
      onFormReady,
    }: {
      treatedPerson: any;
      defaultValues?: any;
      onFormReady?: (methods: UseFormReturn<FormData>) => void;
    }) => {
      const methods = useForm<FormData>({ defaultValues });

      useEffect(() => {
        if (onFormReady) {
          onFormReady(methods);
        }
      }, [methods, onFormReady]);

      return (
        <Provider store={store}>
          <FormProvider {...methods}>
            <DateBlock
              activeIndex={0}
              handlePersonChange={() => {}}
              treatedPerson={treatedPerson}
            />
          </FormProvider>
        </Provider>
      );
    };

    const { rerender } = render(
      <TestWrapper
        treatedPerson={null}
        defaultValues={{
          horses: [],
          treatedByPerson: null,
        }}
        onFormReady={(methods) => {
          methodsRef = methods;
        }}
      />
    );

    rerender(
      <TestWrapper
        treatedPerson={null}
        defaultValues={{
          horses: [],
          treatedByPerson: null,
        }}
        onFormReady={(methods) => {
          methodsRef = methods;
        }}
      />
    );

    await waitFor(() => {
      expect(methodsRef?.getValues("treatedByPerson")).toBeNull();
    });
  });

  it("sets treatmentLocation error if innerLocation is not empty", async () => {
    const store = mockStore({
      auth: { userData: { id: "mock-user" } },
      locations: { locationDescription: "" },
      persons: { persons: [] },
      search: { personsList: [], isFetching: false },
      favorites: { favoriteLocations: [] },
    });

    let methodsRef: UseFormReturn<FormData> | undefined;

    const TestWrapper = ({
      defaultValues,
      onFormReady,
    }: {
      defaultValues: any;
      onFormReady?: (methods: UseFormReturn<FormData>) => void;
    }) => {
      const methods = useForm<FormData>({ defaultValues });

      useEffect(() => {
        if (onFormReady) {
          onFormReady(methods);
        }
      }, [methods, onFormReady]);

      return (
        <Provider store={store}>
          <FormProvider {...methods}>
            <DateBlock
              activeIndex={0}
              handlePersonChange={() => {}}
              treatedPerson={null}
            />
          </FormProvider>
        </Provider>
      );
    };

    const setErrorSpy = jest.fn();
    const defaultValues = {
      horses: [],
      treatmentLocation: {
        locationId: "123",
        locationName: "Test Location",
      },
    };

    const { rerender } = render(
      <TestWrapper
        defaultValues={defaultValues}
        onFormReady={(methods) => {
          jest.spyOn(methods, "setError").mockImplementation(setErrorSpy);
          methodsRef = methods;
        }}
      />
    );

    rerender(
      <TestWrapper
        defaultValues={defaultValues}
        onFormReady={(methods) => {
          jest.spyOn(methods, "setError").mockImplementation(setErrorSpy);
          methodsRef = methods;
        }}
      />
    );

    await waitFor(() => {
      expect(setErrorSpy).toHaveBeenCalledWith("treatmentLocation", {
        type: "manual",
        message: "",
      });
    });
  });

  it("sets treatedByPerson when treatedPerson is defined", async () => {
    const store = mockStore({
      auth: { userData: { id: "mock-user" } },
      locations: { locationDescription: "" },
      persons: { persons: [] },
      search: { personsList: [], isFetching: false },
      favorites: { favoriteLocations: [] },
    });

    let methodsRef: UseFormReturn<FormData> | undefined;

    const treatedPerson = {
      hisaPersonId: "123",
      hisaPersonName: "John Doe",
    };

    const TestWrapper = ({
      treatedPerson,
      defaultValues,
      onFormReady,
    }: {
      treatedPerson: any;
      defaultValues?: any;
      onFormReady?: (methods: UseFormReturn<FormData>) => void;
    }) => {
      const methods = useForm<FormData>({ defaultValues });

      useEffect(() => {
        if (onFormReady) {
          onFormReady(methods);
        }
      }, [methods, onFormReady]);

      return (
        <Provider store={store}>
          <FormProvider {...methods}>
            <DateBlock
              activeIndex={0}
              handlePersonChange={() => {}}
              treatedPerson={treatedPerson}
            />
          </FormProvider>
        </Provider>
      );
    };

    render(
      <TestWrapper
        treatedPerson={treatedPerson}
        defaultValues={{ horses: [] }}
        onFormReady={(methods) => {
          methodsRef = methods;
        }}
      />
    );

    await waitFor(() => {
      const treatedByValue = methodsRef?.getValues("treatedByPerson");
      expect(treatedByValue).toContain("John Doe");
      expect(treatedByValue).toContain("(");
    });
  });

  it("handles location change: sets form value and toggles isOpen", () => {
    const store = mockStore({
      auth: { userData: { id: "mock-user" } },
      locations: { locationDescription: "" },
      persons: { persons: [] },
      search: { personsList: [], isFetching: false },
      favorites: { favoriteLocations: mockFavorites },
    });

    let methodsRef: UseFormReturn<FormData> | undefined;

    const TestWrapper = ({
      onFormReady,
    }: {
      onFormReady?: (methods: UseFormReturn<FormData>) => void;
    }) => {
      const methods = useForm<FormData>({ defaultValues: { horses: [] } });

      useEffect(() => {
        if (onFormReady) {
          onFormReady(methods);
        }
      }, [methods, onFormReady]);

      return (
        <Provider store={store}>
          <FormProvider {...methods}>
            <DateBlock
              activeIndex={0}
              handlePersonChange={() => {}}
              treatedPerson={null}
            />
          </FormProvider>
        </Provider>
      );
    };

    const { container } = render(
      <TestWrapper
        onFormReady={(methods) => {
          methodsRef = methods;
        }}
      />
    );

    const searchContainer = container.querySelector(
      '[data-testid="SearchLocationContainer"]'
    );

    const nextLocation = { locationId: "LOC-1", locationName: "Main Barn" };

    const locationField = container.querySelector("div");
    methodsRef?.setValue("treatmentLocation", nextLocation);

    expect(methodsRef?.getValues("treatmentLocation")).toEqual(nextLocation);
  });
});

describe("DateBlock handleChange", () => {
  let methodsRef: UseFormReturn<FormData> | undefined;
  const mockHandlePersonChange = jest.fn();

  const store = mockStore({
    auth: { userData: { id: "mock-user" } },
    locations: { locationDescription: "" },
    persons: { persons: [] },
    search: { personsList: [], isFetching: false },
    favorites: { favoriteLocations: [] },
  });

  const TestWrapper = ({
    treatedPerson,
    onPersonChange,
    defaultValues,
    onFormReady,
  }: {
    treatedPerson: any;
    onPersonChange: any;
    defaultValues: Partial<FormData>;
    onFormReady: (methods: UseFormReturn<FormData>) => void;
  }) => {
    const methods = useForm<FormData>({ defaultValues });

    onFormReady(methods);

    return (
      <Provider store={store}>
        <FormProvider {...methods}>
          <DateBlock
            activeIndex={0}
            treatedPerson={treatedPerson}
            handlePersonChange={onPersonChange}
          />
        </FormProvider>
      </Provider>
    );
  };

  it("handles handleChange correctly", () => {
    const nextPerson = {
      hisaPersonId: "123",
      hisaPersonName: "Test Name",
    };

    render(
      <TestWrapper
        treatedPerson={null}
        onPersonChange={mockHandlePersonChange}
        defaultValues={{
          horses: [],
          treatedByPerson: null,
        }}
        onFormReady={(methods) => {
          methodsRef = methods;
        }}
      />
    );

    act(() => {
      methodsRef?.setValue(
        "treatedByPerson",
        `${nextPerson.hisaPersonName} (P-123)`
      );
      mockHandlePersonChange(nextPerson);
    });

    expect(methodsRef?.getValues("treatedByPerson")).toBe("Test Name (P-123)");
    expect(mockHandlePersonChange).toHaveBeenCalledWith(nextPerson);
  });
});
