// src/components/dialogs/ConfirmDialog.tsx
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogFooter, DialogClose } from "@/components/ui/dialog"

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "Onayla",
  content = "Bu işlemi gerçekleştirmek istediğinize emin misiniz?",
  confirmText = "Evet",
  cancelText = "İptal",
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          {content}
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={onCancel} variant="outline">{cancelText}</Button>
            </DialogClose>
            <Button onClick={onConfirm} type="submit">{confirmText}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
