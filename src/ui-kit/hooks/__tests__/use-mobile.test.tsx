import { act, renderHook } from "@testing-library/react";
import { useIsMobile } from "../useMobile";

describe("useIsMobile", () => {
  const MOBILE_BREAKPOINT = 768;

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => {
        return {
          matches: query.includes(`max-width: ${MOBILE_BREAKPOINT - 1}px`),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        };
      }),
    });
  });

  it("returns true when the screen width is less than the mobile breakpoint", () => {
    global.innerWidth = MOBILE_BREAKPOINT - 1;

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("returns false when the screen width is greater than or equal to the mobile breakpoint", () => {
    global.innerWidth = MOBILE_BREAKPOINT;

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("updates the value when the screen width changes", () => {
    const listeners: Record<string, (ev: MediaQueryListEvent) => void> = {};

    window.matchMedia = jest.fn().mockImplementation((query: string) => {
      return {
        matches: query.includes(`max-width: ${MOBILE_BREAKPOINT - 1}px`),
        addEventListener: (
          event: string,
          listener: (ev: MediaQueryListEvent) => void
        ) => {
          listeners[event] = listener;
        },
        removeEventListener: jest.fn(),
      };
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      global.innerWidth = MOBILE_BREAKPOINT - 1;
      listeners.change?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });
});
