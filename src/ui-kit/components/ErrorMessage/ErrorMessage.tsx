import React from "react";
export type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className="text-base text-e0 mx-1 !mt-0">{message}</div>;
};
