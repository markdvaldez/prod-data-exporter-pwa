import React, { memo, useMemo } from "react";
import { StepperItem } from "./StepperItem";

export type StepperProps = {
  count: number;
  activeStep: number;
};

export const Stepper: React.FC<StepperProps> = memo(({ count, activeStep }) => {
  const windowWidth = window.innerWidth;

  const width = useMemo(() => {
    return windowWidth - 16;
  }, [windowWidth]);

  const renderItems = useMemo(() => {
    const items = [];
    for (let i = 1; i <= count; i++) {
      const isActive = activeStep === i - 1 || i - 1 < activeStep;
      items.push(
        <StepperItem key={i} width={width} isActive={isActive} count={count} />
      );
    }

    return items;
  }, [activeStep, count, width]);

  return (
    <div className="flex flex-1 flex-row items-center mb-4">
      <div className="flex flex-row ml-1 space-x-1">{renderItems}</div>
    </div>
  );
});

Stepper.displayName = "Stepper";
