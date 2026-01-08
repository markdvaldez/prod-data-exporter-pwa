import { useTimer } from "@/hooks/useTimer";
import { cn } from "@/ui-kit/lib/utils";
import { motion } from "framer-motion";
import React, { forwardRef, memo, useEffect, useImperativeHandle } from "react";
import { MicIcon } from "../Icons/MicIcon";

export type MicIndicatorProps = {
  ref: React.RefObject<MicIndicatorHandlers | null>;
  isActive: boolean;
  className?: string;
};

export type MicIndicatorHandlers = {
  startTimer: () => void;
  stopTimer: () => void;
};

const micIndicatorVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "linear", duration: 0.1 },
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

const micAnimation = {
  animate: { opacity: [1, 0.5, 1] },
  transition: {
    duration: 1.6,
    repeat: Infinity,
  },
};

export const MicIndicator: React.FC<MicIndicatorProps> = memo(
  forwardRef(({ isActive, className }, ref) => {
    const { formattedTime, start, stop } = useTimer();

    useEffect(() => {
      return () => {
        stop();
      };
    }, [stop]);

    useImperativeHandle(ref, () => ({
      startTimer: start,
      stopTimer: stop,
    }));

    if (isActive) {
      return (
        <motion.div
          key="animated-time"
          className={cn("flex flex-row items-center z-10", className)}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={micIndicatorVariants}
        >
          <motion.div
            className="px-2 relative overflow-hidden"
            {...micAnimation}
          >
            <MicIcon width={24} height={24} color="#FFFFFF" />
          </motion.div>

          <div className=" text-base text-w0 w-12">{formattedTime}</div>
        </motion.div>
      );
    }

    return null;
  })
);
