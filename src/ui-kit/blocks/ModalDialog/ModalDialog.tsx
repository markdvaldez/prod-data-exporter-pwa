import { Button } from "@/ui-kit/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui-kit/components/Dialog";
import React, { useCallback } from "react";

export type ModalDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  buttonTitle: string;
  onSubmitClick: () => void;
  onCancelClick: () => void;
};

export const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  title,
  description,
  buttonTitle,
  onCancelClick,
  onSubmitClick,
}) => {
  const handleSubmit = useCallback(() => {
    onSubmitClick();
    onCancelClick();
  }, [onCancelClick, onSubmitClick]);

  return (
    <Dialog open={open} onOpenChange={onCancelClick}>
      <DialogContent className="max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle className="mb-2 mt-2 text-center">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center mb-2">
          {description}
        </DialogDescription>
        <DialogFooter className="flex justify-center sm:justify-center gap-2 mt-2">
          <Button
            className="min-w-40"
            variant="outline"
            onClick={onCancelClick}
            title="Cancel"
          />
          <Button
            className="min-w-40"
            type="submit"
            onClick={handleSubmit}
            title={buttonTitle}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
