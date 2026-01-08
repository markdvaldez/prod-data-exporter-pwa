// components/ui/data-table-column-header.tsx

import { Column } from "@tanstack/react-table";
// Import all necessary icons from Lucide React
import { ArrowUpDown, ChevronUp, ChevronDown, ArrowUp, ArrowDown } from "lucide-react"; 

import { cn } from "@/ui-kit/lib/utils"; // Assumes you have a utility for tailwind-merge
import { Button } from "@/ui-kit/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  // If the column cannot be sorted, just render the title in a div without a button
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  // --- Dynamic Icon Logic ---
  // 1. Get the current sort state ('asc', 'desc', or false/undefined if not sorted)
  const sortedState = column.getIsSorted();

  // 2. Conditionally assign the correct Lucide React icon component to a variable
  const Icon = sortedState === "asc"
    ? ArrowUp      // Use ChevronUp if sorted ascending
    : sortedState === "desc"
    ? ArrowDown    // Use ChevronDown if sorted descending
    : ArrowUpDown;   // Use ArrowUpDown (unsorted/default) otherwise

  // --- Rendering ---
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        // Toggle the sorting state when the button is clicked
        onClick={() => column.toggleSorting(sortedState === "asc")}
      >
        <span>{title}</span>
        
        {/* 3. Render the dynamically selected Icon component next to the title */}
        <Icon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
