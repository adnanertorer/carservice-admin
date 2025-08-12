import { GenericService } from "@/core/services/GenericService";
import { toast } from "react-toastify";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ApproveDrawerProps<T> {
  endpoint: string;
  title: string;
  triggerText?: string;
  onCreated?: () => Promise<void>;
  renderForm: (onSubmit: (model: T) => Promise<void>) => React.ReactNode;
}

export const ApproveDrawer = <T extends object>({
  endpoint,
  title,
  onCreated,
  renderForm,
  triggerText,
}: ApproveDrawerProps<T>) => {
  const service = new GenericService<T>(endpoint);

  const handleCreate = async (model: T) => {
    await service.update(model);
    toast.success("İşlem başarılı!");
    if (onCreated) {
      await onCreated();
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger>{triggerText || "Onayla"}</SheetTrigger>
        <SheetContent className="overflow-x-auto">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{renderForm(handleCreate)}</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
