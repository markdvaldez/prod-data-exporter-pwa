import { useCallback } from "react";
import { CloseIcon } from "../Icons/CloseIcon";
import { Textarea } from "../Textarea";

export type NotesFieldProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value?: string) => void;
};

export const NotesField: React.FC<NotesFieldProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange?.("");
  }, [onChange]);

  return (
    <>
      <div className="relative">
        <Textarea
          className="w-full pr-6"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <div className="absolute top-2 bottom-0 right-0 w-10 cursor-pointer">
          <div
            className="ml-3 w-5 h-5 items-center justify-center"
            onClick={handleClear}
          >
            <CloseIcon width={20} height={20} />
          </div>
        </div>
      </div>
    </>
  );
};
