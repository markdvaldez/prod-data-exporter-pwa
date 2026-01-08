import { NextIntlClientProvider } from "next-intl";
import React from "react";
import defaultMessages from "../src/services/i18n/messages/en.json";

type Props = {
  children?: React.ReactNode;
};

export const Wrapper = ({ children }: Props) => {
  return (
    <NextIntlClientProvider locale="en" messages={defaultMessages}>
      <section className="min-w-full min-h-full gap-4 p-8">{children}</section>
    </NextIntlClientProvider>
  );
};
