import { Dialog, DialogHeader, DialogTitle } from "@/ui-kit/components/Dialog";
import React, { memo } from "react";
import PanelContent from "./PanelContent";

export type PanelProps = {
  open: boolean;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
};

const Panel: React.FC<PanelProps> = ({
  open,
  className,
  children,
  title,
  onClose,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <PanelContent className={className} onClose={onClose}>
        <DialogHeader className="h-10 p-4 sm:p-6">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </PanelContent>
    </Dialog>
  );
};

Panel.displayName = "Panel";

export default memo(Panel);
