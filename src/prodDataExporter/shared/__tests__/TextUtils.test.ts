import { HorseMedicalRecType } from "@/Types";
import {
  clearSearchText,
  escapeRegExp,
  formatInput,
  formatNumber,
  getFormattedTitle,
  getMeasure,
  getNumbers,
  getRecType,
  getTruncatedText,
  joinAddressParts,
  mergeText,
  removeSpaces,
  splitCamelCase,
} from "../TextUtils";

jest.mock("../../pages/MainPage/helpers", () => ({
  getFormattedId: (id: string) => `${id}`,
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("TextUtils helpers", () => {
  it("getNumbers: extracts digits and dots only, returns empty otherwise", () => {
    expect(getNumbers("a1b2.3c4")).toBe("12.34");
    expect(getNumbers()).toBe("");
    expect(getNumbers("abc")).toBe("");
  });

  it("formatNumber: removes leading zeros and trims trailing zeros correctly", () => {
    expect(formatNumber("00123.4500")).toBe("123.45");
    expect(formatNumber("00123.00")).toBe("123");
    expect(formatNumber("000.12300")).toBe("0.123");
    expect(formatNumber("0.0")).toBe("0");
    expect(formatNumber("000123")).toBe("123");
    expect(formatNumber("000")).toBe("0");
  });

  it("getMeasure: returns mg or ml in lowercase when present, empty otherwise", () => {
    expect(getMeasure("100mg")).toBe("mg");
    expect(getMeasure("5ML")).toBe("ml");
    expect(getMeasure("50g")).toBe("");
    expect(getMeasure("")).toBe("");
  });

  it("formatInput: cleans up leading zeros and extra dots, returns empty string when falsy", () => {
    expect(formatInput("00123.456")).toBe("123.456");
    expect(formatInput("000123")).toBe("123");
    expect(formatInput("0.0.0")).toBe("0.0");
    expect(formatInput(null)).toBe("");
    expect(formatInput(undefined)).toBe("");
  });

  it("removeSpaces: removes all whitespace, returns empty string when null/undefined", () => {
    expect(removeSpaces("a b  c")).toBe("abc");
    expect(removeSpaces(null)).toBe("");
    expect(removeSpaces()).toBe("");
  });

  it("getRecType: returns translation or splits camelCase correctly", () => {
    const t: any = (key: string) => `${key}`;
    expect(getRecType(t, "")).toBe("");
    expect(getRecType(t, null)).toBe("");
    expect(
      getRecType(t, HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection)
    ).toBe("mandatoryAttendingVetInsp");
    expect(getRecType(t, HorseMedicalRecType.Test)).toBe("testAndDiagnostics");
    expect(getRecType(t, "someCamelCase")).toBe("some Camel Case");
  });

  it("clearSearchText: trims, collapses spaces, replaces quotes, and lowercases", () => {
    const raw = `  Hello   WORLD  “Quoted”  `;
    expect(clearSearchText(raw)).toBe("hello world 'quoted'");
  });

  it("getFormattedTitle: builds title with programNumber, name, and formatted hisaId", () => {
    expect(
      getFormattedTitle({ programNumber: "1", name: "N", hisaId: null })
    ).toBe("1. N");
    expect(
      getFormattedTitle({
        programNumber: undefined,
        name: "N",
        hisaId: "H000000000",
      })
    ).toBe(" N (H000000000)");
    expect(getFormattedTitle({})).toBe("");
  });

  it("splitCamelCase: splits camelCase words, returns empty for empty string", () => {
    expect(splitCamelCase("oneTwoThree")).toBe("one Two Three");
    expect(splitCamelCase("")).toBe("");
  });

  it("getTruncatedText: returns original when shorter, truncates with ellipsis otherwise", () => {
    expect(getTruncatedText("short", 10)).toBe("short");
    expect(getTruncatedText("abcdefghij", 5)).toBe("abcde...");
  });

  it("mergeText: merges two texts with delimiter and trims result", () => {
    expect(mergeText("a", "b", ", ")).toBe("a, b");
    expect(mergeText(undefined, "b", "-")).toBe("-b");
    expect(mergeText("a", undefined)).toBe("a");
  });

  it("joinAddressParts: joins non-empty parts with comma, returns empty when all falsy", () => {
    expect(joinAddressParts("a", null, "b", undefined, "c")).toBe("a, b, c");
    expect(joinAddressParts("", null)).toBe("");
  });

  it("escapeRegExp: escapes all regex special characters", () => {
    const special = ".*+?^${}()|[]\\";
    expect(escapeRegExp(special)).toBe(
      "\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\"
    );
  });
});
