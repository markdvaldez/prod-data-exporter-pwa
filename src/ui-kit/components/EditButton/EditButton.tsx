import { ChevronRight } from "lucide-react";

export const EditButton: React.FC<{
  title: string;
  onClick: () => void;
}> = ({ title, onClick }) => {
  return (
    <div
      className="flex flex-row justify-center items-center cursor-pointer pr-1"
      onClick={onClick}
    >
      <div className="pr-1 text-tDefault text-md">{title}</div>
      <ChevronRight className="w-4 h-4" />
    </div>
  );
};
