"use client";

import { create } from "zustand";
import { Dialog } from "../components/ui/dialog";

const DIALOG_EXIT_DURATION_MS = 180;
let clearDialogTimer: ReturnType<typeof setTimeout> | null = null;

type DialogStore = {
  isOpen: boolean;
  openDialog: (props: { children: React.ReactNode }) => void;
  children: React.ReactNode;
  closeDialog: () => void;
};

export const useDialogStore = create<DialogStore>((set) => ({
  isOpen: false,
  openDialog: ({ children }) => {
    if (clearDialogTimer) {
      clearTimeout(clearDialogTimer);
      clearDialogTimer = null;
    }
    set({ isOpen: true, children });
  },
  closeDialog: () => {
    set({ isOpen: false });

    clearDialogTimer = setTimeout(() => {
      set({ children: null });
      clearDialogTimer = null;
    }, DIALOG_EXIT_DURATION_MS);
  },
  children: null,
}));

export default function GlobalDialog() {
  const { isOpen, children, closeDialog } = useDialogStore();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog();
        }
      }}
    >
      {children}
    </Dialog>
  );
}
