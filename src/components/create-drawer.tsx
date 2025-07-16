import { GenericService } from "@/core/services/GenericService";
import { useState } from "react";
import { toast } from "react-toastify";
import { Drawer } from "vaul";

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
  const [open, setOpen] = useState(false);
  const service = new GenericService<T>(endpoint);

  const handleCreate = async (model: T) => {
    await service.save(model);
    toast.success('Kayıt başarılı!');
    setOpen(false);
    if (onCreated) {
      await onCreated();
    }
  };

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 
       rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
        Yeni Kayıt
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex"
          style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
        >
          <div className="bg-zinc-50 w-full grow p-2 flex flex-col rounded-[16px] overflow-x-auto">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-2 text-zinc-900 mb-10">
                {title}
              </Drawer.Title>
              <Drawer.Description className="text-zinc-600 mb-1">
                {renderForm(handleCreate)}
              </Drawer.Description>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
