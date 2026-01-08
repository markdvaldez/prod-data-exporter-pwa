import React, { memo } from "react";
import { RadioOffIcon } from "../Icons/RadioOffIcon";
import { RadioOnIcon } from "../Icons/RadioOnIcon";

export type RadioButtonProps = {
  isActive: boolean;
};

export const RadioButtonNew: React.FC<RadioButtonProps> = memo(
  ({ isActive }) => {
    return <>{isActive ? <RadioOnIcon /> : <RadioOffIcon />}</>;
  }
);

RadioButtonNew.displayName = "RadioButtonNew";
