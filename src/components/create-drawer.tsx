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

interface CreateDrawerProps<T> {
  endpoint: string;
  title: string;
  onCreated?: () => Promise<void>;
  renderForm: (onSubmit: (model: T) => Promise<void>) => React.ReactNode;
}

export const CreateDrawer = <T extends object>({
  endpoint,
  title,
  onCreated,
  renderForm,
}: CreateDrawerProps<T>) => {
  const service = new GenericService<T>(endpoint);

  const handleCreate = async (model: T) => {
    await service.save(model);
    toast.success("Kayıt başarılı!");
    if (onCreated) {
      await onCreated();
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger>Yeni Kayıt</SheetTrigger>
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
