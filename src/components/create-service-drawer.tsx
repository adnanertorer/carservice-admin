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
import { IconSettings } from "@tabler/icons-react";

interface CreateServiceDrawerProps<T> {
  endpoint: string;
  title: string;
  onCreated?: () => Promise<void>;
  renderForm: (onSubmit: (model: T) => Promise<void>) => React.ReactNode;
}

export const CreateServiceDrawer = <T extends object>({
  endpoint,
  title,
  onCreated,
  renderForm,
}: CreateServiceDrawerProps<T>) => {
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
        <SheetTrigger><IconSettings /></SheetTrigger>
        <SheetContent className="overflow-x-auto">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription className="overflow-y-auto">{renderForm(handleCreate)}</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
