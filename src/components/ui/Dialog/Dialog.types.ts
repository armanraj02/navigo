import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

export type DialogProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Root>;
export type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Trigger>;
export type DialogContentProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Content>;
export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Title>;
export type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Description>;
export type DialogCloseProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Close>;
