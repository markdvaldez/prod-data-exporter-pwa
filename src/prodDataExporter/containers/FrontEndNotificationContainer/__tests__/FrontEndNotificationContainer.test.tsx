import {
  logResponseAction,
  logShowAction,
} from "@/services/store/modules/frontEndNotification";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FrontEndNotificationContainer } from "../FrontEndNotificationContainer";

const dispatchMock = jest.fn();
const setQueryDataMock = jest.fn();
const useIsPageVisibleMock = jest.fn();
const getPageIdMock = jest.fn();
const useFetchActiveByPageMock = jest.fn();
const mapNotificationToPropsMock = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
}));
jest.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ setQueryData: setQueryDataMock }),
}));
jest.mock("@/hooks/useIsFocused", () => ({
  useIsPageVisible: () => useIsPageVisibleMock(),
}));
jest.mock("@/routes/utils", () => ({
  getPageId: () => getPageIdMock(),
}));
jest.mock(
  "@/services/api/modules/frontEndNotification/frontEndNotification",
  () => ({
    useFetchActiveByPage: (pageId: string, opts: any) =>
      useFetchActiveByPageMock(pageId, opts),
  })
);
jest.mock("../helpers", () => ({
  TIMEOUT: 5000,
  mapNotificationToProps: (data: any) => mapNotificationToPropsMock(data),
}));
jest.mock("../NotificationModal", () => ({
  NotificationModal: ({ isOpen, data, onClose, onSubmit }: any) => (
    <div>
      <div data-testid="modal" data-is-open={isOpen ? "true" : "false"}>
        {isOpen ? "OPEN" : "CLOSED"}
      </div>
      <div data-testid="modal-data">{JSON.stringify(data)}</div>
      <button data-testid="close-btn" onClick={() => onClose("close-response")}>
        Close
      </button>
      <button
        data-testid="submit-btn"
        onClick={() => onSubmit("submit-response")}
      >
        Submit
      </button>
    </div>
  ),
}));

beforeEach(() => {
  jest.clearAllMocks();
  getPageIdMock.mockReturnValue("page-123");
});

it("renders closed modal when page is not visible", () => {
  useIsPageVisibleMock.mockReturnValue(false);
  useFetchActiveByPageMock.mockReturnValue({ data: [] });
  mapNotificationToPropsMock.mockReturnValue(undefined);

  render(<FrontEndNotificationContainer page={1} />);
  expect(screen.getByTestId("modal")).toHaveAttribute("data-is-open", "false");
  expect(dispatchMock).not.toHaveBeenCalled();
});

it("opens modal and dispatches logShowAction when valid notification arrives", async () => {
  useIsPageVisibleMock.mockReturnValue(true);
  const rawData = [
    {
      frontEndNotificationId: "notif-1",
      activeFrom: "2025-01-01T00:00:00Z",
      activeTo: "2025-12-31T23:59:59Z",
      isDeleted: false,
      messageTitle: "Test Title",
      details: "Details",
      responseOptions: [],
      pageId: "page-2",
      impressionCount: 0,
      impressionInterval: "01:00:00",
      attestationId: null,
      detailsPlain: null,
      deleteReason: null,
    },
  ];
  useFetchActiveByPageMock.mockReturnValue({ data: rawData });
  const notification = {
    isValid: true,
    frontEndNotificationId: "notif-1",
  };
  mapNotificationToPropsMock.mockReturnValue(notification);

  render(<FrontEndNotificationContainer page={2} />);

  await waitFor(() => {
    expect(dispatchMock).toHaveBeenCalledWith(
      logShowAction({ frontEndNotificationId: "notif-1" })
    );
  });
  expect(screen.getByTestId("modal")).toHaveAttribute("data-is-open", "true");
  expect(screen.getByTestId("modal-data")).toHaveTextContent(
    JSON.stringify(notification)
  );
});

it("does not open modal when mapped notification is invalid", async () => {
  useIsPageVisibleMock.mockReturnValue(true);
  const rawData = [
    {
      frontEndNotificationId: "notif-ignored",
      activeFrom: "2025-01-01T00:00:00Z",
      activeTo: "2025-12-31T23:59:59Z",
      isDeleted: false,
      messageTitle: "Ignored",
      details: "",
      responseOptions: [],
      pageId: "page-3",
      impressionCount: 0,
      impressionInterval: "01:00:00",
      attestationId: null,
      detailsPlain: null,
      deleteReason: null,
    },
  ];
  useFetchActiveByPageMock.mockReturnValue({ data: rawData });
  mapNotificationToPropsMock.mockReturnValue({ isValid: false });

  render(<FrontEndNotificationContainer page={3} />);

  await waitFor(() => {
    expect(screen.getByTestId("modal")).toHaveAttribute(
      "data-is-open",
      "false"
    );
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});

it("dispatches logResponseAction and clears cache on close", async () => {
  useIsPageVisibleMock.mockReturnValue(true);
  const rawData = [
    {
      frontEndNotificationId: "notif-2",
      activeFrom: "2025-01-01T00:00:00Z",
      activeTo: "2025-12-31T23:59:59Z",
      isDeleted: false,
      messageTitle: "Title 2",
      details: "",
      responseOptions: [],
      pageId: "page-4",
      impressionCount: 0,
      impressionInterval: "01:00:00",
      attestationId: null,
      detailsPlain: null,
      deleteReason: null,
    },
  ];
  useFetchActiveByPageMock.mockReturnValue({ data: rawData });
  const notification = {
    isValid: true,
    frontEndNotificationId: "notif-2",
  };
  mapNotificationToPropsMock.mockReturnValue(notification);

  render(<FrontEndNotificationContainer page={4} />);
  await waitFor(() =>
    expect(screen.getByTestId("modal")).toHaveAttribute("data-is-open", "true")
  );

  fireEvent.click(screen.getByTestId("close-btn"));

  expect(dispatchMock).toHaveBeenCalledWith(
    logResponseAction({
      frontEndNotificationId: "notif-2",
      response: "close-response",
    })
  );
  expect(setQueryDataMock).toHaveBeenCalledWith(
    ["frontEndNotification", "page-123"],
    expect.any(Function)
  );
});

it("dispatches logResponseAction and clears cache on submit", async () => {
  useIsPageVisibleMock.mockReturnValue(true);
  const rawData = [
    {
      frontEndNotificationId: "notif-3",
      activeFrom: "2025-01-01T00:00:00Z",
      activeTo: "2025-12-31T23:59:59Z",
      isDeleted: false,
      messageTitle: "Title 3",
      details: "",
      responseOptions: [],
      pageId: "page-5",
      impressionCount: 0,
      impressionInterval: "01:00:00",
      attestationId: null,
      detailsPlain: null,
      deleteReason: null,
    },
  ];
  useFetchActiveByPageMock.mockReturnValue({ data: rawData });
  const notification = {
    isValid: true,
    frontEndNotificationId: "notif-3",
  };
  mapNotificationToPropsMock.mockReturnValue(notification);

  render(<FrontEndNotificationContainer page={5} />);
  await waitFor(() =>
    expect(screen.getByTestId("modal")).toHaveAttribute("data-is-open", "true")
  );

  fireEvent.click(screen.getByTestId("submit-btn"));

  expect(dispatchMock).toHaveBeenCalledWith(
    logResponseAction({
      frontEndNotificationId: "notif-3",
      response: "submit-response",
    })
  );
  expect(setQueryDataMock).toHaveBeenCalledWith(
    ["frontEndNotification", "page-123"],
    expect.any(Function)
  );
});
