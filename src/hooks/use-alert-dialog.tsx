"use client";

import { create } from "zustand";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AlertOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

type AlertDialogStore = {
  isOpen: boolean;
  options: AlertOptions;

  showAlert: (options: AlertOptions) => void;
  closeAlert: () => void;
};

export const useAlertDialogStore = create<AlertDialogStore>((set) => ({
  isOpen: false,

  options: {},

  showAlert: (options) => {
    set({
      isOpen: true,
      options,
    });
  },

  closeAlert: () => {
    set({
      isOpen: false,
      options: {},
    });
  },
}));

export function GlobalAlertDialog() {
  const { isOpen, options, closeAlert } = useAlertDialogStore();

  return (
    <AlertDialog open={isOpen} onOpenChange={closeAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.title}</AlertDialogTitle>

          <AlertDialogDescription>{options.description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeAlert}>
            {options.cancelText ?? "Cancel"}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => {
              options.onConfirm?.();
              closeAlert();
            }}
          >
            {options.confirmText ?? "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
