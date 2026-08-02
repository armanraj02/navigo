import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: string;
}
