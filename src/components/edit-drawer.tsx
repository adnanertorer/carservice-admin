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
import { IconEdit } from "@tabler/icons-react";

interface EditDrawerProps<T> {
  endpoint: string;
  title: string;
  onUpdated?: () => Promise<void>;
  model: T;
  renderForm: (onSubmit: (model: T) => Promise<void>) => React.ReactNode;
}

export const EditDrawer = <T extends object>({
  endpoint,
  title,
  onUpdated,
  renderForm,
}: EditDrawerProps<T>) => {

  const service = new GenericService<T>(endpoint);
  const handleEdit = async (model: T) => {
    await service.update(model);
    toast.success("Güncelleme başarılı!");
    if (onUpdated) {
      await onUpdated();
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger><IconEdit /></SheetTrigger>
        <SheetContent className="overflow-x-auto">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{renderForm(handleEdit)}</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
