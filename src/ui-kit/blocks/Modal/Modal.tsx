import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  animationDirection?: "top" | "bottom" | "left" | "right";
  swipeToClose?: boolean;
};

const variantsMap = {
  top: {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  bottom: {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  left: {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  right: {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  animationDirection = "bottom",
  swipeToClose = false,
}) => {
  const variants = variantsMap[animationDirection];

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { y: number } }
  ) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            drag={swipeToClose ? "y" : false}
            dragConstraints={swipeToClose ? { top: 0, bottom: 0 } : undefined}
            dragElastic={swipeToClose ? 0.2 : 0}
            onDragEnd={swipeToClose ? handleDragEnd : undefined}
          >
            {children}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
};
