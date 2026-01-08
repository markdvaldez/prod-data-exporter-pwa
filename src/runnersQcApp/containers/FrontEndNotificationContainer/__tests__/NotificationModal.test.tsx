import { fireEvent, render, screen } from "@testing-library/react";
import {
  NotificationModal,
  NotificationModalProps,
} from "../NotificationModal";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("dompurify", () => ({
  sanitize: (html: string) => html.replace(/<script.*?>.*?<\/script>/g, ""),
}));

jest.mock("@/ui-kit/components/Button", () => ({
  Button: ({ title, onClick }: any) => (
    <button data-testid={`button-${title}`} onClick={onClick}>
      {title}
    </button>
  ),
}));
jest.mock("@/ui-kit/components/Dialog", () => ({
  Dialog: ({ open, children }: any) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogTitle: ({ children }: any) => <h2>{children}</h2>,
}));
jest.mock("../NotificationContent", () => ({
  NotificationContent: ({ children }: any) => (
    <div data-testid="content">{children}</div>
  ),
}));

describe("NotificationModal", () => {
  const baseProps: NotificationModalProps = {
    isOpen: false,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    data: undefined,
  };

  it("does not render when isOpen is false", () => {
    render(<NotificationModal {...baseProps} />);
    expect(screen.queryByTestId("dialog")).toBeNull();
  });

  it("renders title, sanitized HTML and default OK button when no responseOptions", () => {
    const props: NotificationModalProps = {
      ...baseProps,
      isOpen: true,
      data: {
        frontEndNotificationId: "n1",
        messageTitle: "My Title",
        details: "<p>Hello<script>alert('x')</script><b>World</b></p>",
        responseOptions: [],
        activeFrom: "",
        activeTo: "",
        isDeleted: false,
        isValid: true,
      },
    };
    render(<NotificationModal {...props} />);
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent("My Title");
    const span = screen.getByText("Hello");
    expect(span.innerHTML).toContain("<b>World</b>");
    const okBtn = screen.getByTestId("button-ok");
    fireEvent.click(okBtn);
    expect(baseProps.onSubmit).toHaveBeenCalledWith("ok");
  });

  it("renders one button per responseOption and calls onSubmit with each", () => {
    const options = ["Yes", "No"];
    const props: NotificationModalProps = {
      ...baseProps,
      isOpen: true,
      data: {
        frontEndNotificationId: "n2",
        messageTitle: "Choose",
        details: "Pick one",
        responseOptions: options,
        activeFrom: "",
        activeTo: "",
        isDeleted: false,
        isValid: true,
      },
    };
    render(<NotificationModal {...props} />);
    options.forEach((opt) => {
      const btn = screen.getByTestId(`button-${opt}`);
      fireEvent.click(btn);
      expect(baseProps.onSubmit).toHaveBeenCalledWith(opt);
    });
    expect(baseProps.onSubmit).toHaveBeenCalledTimes(options.length);
  });
});
