'use client';

import { Drawer } from 'vaul';
import { GenericService } from '@/core/services/GenericService';
import { toast } from 'react-toastify';
import { useState } from 'react';
import type { CustomerVehicleModel } from '../models/customer-vehicle-model';
import { CreateVehicleForm } from './create-vehicle-form';

interface CreateVehicleDrawerProps {
  onVehicleCreated?: () => Promise<void>;
}

export const CreateVehicleDrawer : React.FC<CreateVehicleDrawerProps> = ({ onVehicleCreated }) => {
  const [open, setOpen] = useState(false);
  const service = new GenericService<CustomerVehicleModel>("vehicle");
  
  const handleCreate = async (model: CustomerVehicleModel) => {
    await service.save(model);
    toast.success("Kayıt başarılı!");
    setOpen(false);
    if (onVehicleCreated) {
      await onVehicleCreated();
    }
  };
  
  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 
       rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
        Yeni Kayıt
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40"/>
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
        >
          <div className="bg-zinc-50 w-full grow p-2 flex flex-col rounded-[16px] overflow-x-auto">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-2 text-zinc-900 mb-10">Yeni Müşteri</Drawer.Title>
              <Drawer.Description className="text-zinc-600 mb-1">
                <CreateVehicleForm onSubmit={handleCreate}  />
              </Drawer.Description>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}