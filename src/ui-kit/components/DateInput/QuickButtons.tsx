import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";

export type QuickButtons = {
  onSelect: (nextDate: Date | undefined) => void;
};

export const QuickButtons: React.FC<QuickButtons> = ({ onSelect }) => {
  const handleSelect = useCallback((value: string) => {
    switch (value) {
      case "0":
        break;
      case "1":
        break;
      case "3":
        break;
      case "7":
        break;
    }
  }, []);

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="ring-0 focus-visible:ring-offset-0 focus-visible:ring-0">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="0">Today</SelectItem>
        <SelectItem value="1">Tomorrow</SelectItem>
        <SelectItem value="3">In 3 days</SelectItem>
        <SelectItem value="7">In a week</SelectItem>
      </SelectContent>
    </Select>
  );
};
