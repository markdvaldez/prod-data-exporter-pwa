import { TSteps } from "@/runnersQcApp/containers/AddRecordContainer/types";
import { CircleCheckedIcon } from "@/ui-kit/components/Icons/CircleCheckedIcon";
import { useDeviceOrientation } from "@/ui-kit/hooks/useDeviceOrientation";
import { cn } from "@/ui-kit/lib/utils";
import { motion } from "framer-motion";
import _ from "lodash";
import { Circle } from "lucide-react";
import React from "react";

export type StepperDesktopProps = {
  index: number;
  data: { title: TSteps | string; id: number }[];
};

const wrapperAnimation = {
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  },
};

const containerAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const itemAnimation = {
  initial: { scale: 0.8, opacity: 0.5 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

const iconAnimation = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
  },
  transition: { duration: 0.4, ease: "easeInOut" },
};

const dividerAnimation = {
  initial: { height: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export const StepperDesktop: React.FC<StepperDesktopProps> = ({
  index,
  data,
}) => {
  const orientation = useDeviceOrientation();

  const renderItem = (
    item: { title: string; id: number },
    itemIndex: number
  ) => {
    const isCompleted = itemIndex <= index - 1;
    const isActive = itemIndex === index;
    const isLast = itemIndex === data.length - 1;

    return (
      <motion.div
        key={item.title}
        className="flex items-start space-x-4 ml-px"
        {...containerAnimation}
      >
        <div className="flex flex-col items-center">
          <motion.div
            {...itemAnimation}
            animate={{
              scale: isActive ? 1.2 : 1,
              opacity: isCompleted ? 1 : 0.6,
            }}
          >
            {isCompleted ? (
              <motion.div {...iconAnimation}>
                <CircleCheckedIcon />
              </motion.div>
            ) : (
              <Circle
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-a0 font-semibold" : "text-b8"
                )}
              />
            )}
          </motion.div>
          {!isLast && (
            <motion.div
              className={cn(
                "w-px h-6 mt-2 mx-auto",
                isCompleted ? "bg-a0" : "bg-b8"
              )}
              {...dividerAnimation}
              animate={{ height: isCompleted ? 24 : 12 }}
            />
          )}
        </div>
        <motion.div
          className={cn(
            "text-sm text-tDefault",
            isActive ? "font-semibold" : "font-normal"
          )}
          {...wrapperAnimation}
        >
          {item.title}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "hidden sm:block w-36 mr-24 pt-4",
        orientation === "landscape" ? "mr-24" : "mr-4"
      )}
    >
      <motion.div
        className="flex flex-col space-y-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {_.map(data, renderItem)}
      </motion.div>
    </div>
  );
};
