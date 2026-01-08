"use client";

import React, { useCallback } from "react";

export type FilterTagProps = {
  id?: string;
  title: string;
  isSelected?: boolean;
  onPress: (id?: string) => void;
};

export const FilterTag: React.FC<FilterTagProps> = ({
  id,
  title,
  isSelected = false,
  onPress,
}) => {
  const handleClick = useCallback(() => {
    onPress(id);
  }, [id, onPress]);

  const containerClasses = `inline-flex items-center py-1 px-2 rounded-full mx-1 cursor-pointer ${
    isSelected ? "bg-a7 border border-a7" : "border border-a0"
  }`;

  return (
    <div onClick={handleClick} className={containerClasses}>
      <span className="text-a01 text-sm whitespace-nowrap">{title}</span>
    </div>
  );
};
