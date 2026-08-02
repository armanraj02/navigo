import { InputProps } from "../Input";

export interface SearchInputProps extends Omit<InputProps, "leftIcon" | "rightIcon" | "type"> {
  onClear?: () => void;
  value?: string;
}
