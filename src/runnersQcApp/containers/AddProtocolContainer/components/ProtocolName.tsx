import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { Input } from "@/ui-kit/components/Input";
import { useTranslations } from "next-intl";
import React, { ChangeEvent, useRef } from "react";

export type ProtocolNameProps = {
  protocolName?: string | null;
  handleClear: () => void;
  handleChangeName: (text: string | ChangeEvent<HTMLInputElement>) => void;
};

export const ProtocolName: React.FC<ProtocolNameProps> = ({
  protocolName,
  handleChangeName,
  handleClear,
}) => {
  const t = useTranslations();

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="text-tDefault self-stretch justify-center w-full">
      <FieldLabel label={t("Protocols.protocolName")} />
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          className="text-base text-tDefault bg-w0 pl-5 pr-10 focus-visible:border-b8"
          placeholder={t("Protocols.protocolName")}
          autoCapitalize="none"
          value={protocolName ?? undefined}
          onChange={handleChangeName}
          autoFocus
        />
        {protocolName ? (
          <div className="absolute top-4 sm:top-3 bottom-0 -right-2 w-10 cursor-pointer">
            <div
              data-testid="clear-icon"
              className="w-4 h-4 items-center justify-center"
              onClick={handleClear}
            >
              <CloseIcon width={16} height={16} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
