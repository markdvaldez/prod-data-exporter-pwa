import { motion } from "framer-motion";
import React, { memo, useMemo } from "react";

export type StepperItemProps = {
  width: number;
  isActive: boolean;
  count: number;
};

const animation = {
  initial: { width: 0 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

export const StepperItem: React.FC<StepperItemProps> = memo(
  ({ width, isActive, count }) => {
    const progressWidth = useMemo(() => {
      return (width - 32) / count;
    }, [count, width]);

    return (
      <div className="relative w-full mb-2.5">
        <div
          className="h-1 rounded-xl bg-b8"
          style={{ width: `${progressWidth}px` }}
        />
        <motion.div
          className="absolute top-0 left-0 h-1 rounded-xl bg-a0"
          {...animation}
          animate={{ width: isActive ? progressWidth : 0 }}
        />
      </div>
    );
  }
);

StepperItem.displayName = "StepperItem";
