import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label?: string;
  error?: string;
}
