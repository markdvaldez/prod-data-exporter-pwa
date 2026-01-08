import { AnimatePresence, motion } from "framer-motion";

const ANIMATION = {
  variants: {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -0 },
  },
  transition: { duration: 0.4 },
};

type RouteWithTransitionProps = {
  id: string;
  className?: string;
  children?: React.ReactNode;
};

export const RouteWithTransition: React.FC<RouteWithTransitionProps> = ({
  id,
  className,
  children,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        key={id}
        initial="initial"
        animate="animate"
        exit="exit"
        {...ANIMATION}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
