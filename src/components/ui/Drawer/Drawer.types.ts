import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

export interface DrawerProps extends React.ComponentPropsWithoutRef<typeof RadixDialog.Root> {
  side?: "left" | "right" | "top" | "bottom";
}

export type DrawerTriggerProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Trigger>;
export type DrawerContentProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Content>;
export type DrawerTitleProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Title>;
export type DrawerDescriptionProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Description>;
