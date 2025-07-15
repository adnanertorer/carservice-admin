'use client';

import { Drawer } from 'vaul';
import { GenericService } from '@/core/services/GenericService';
import type { CustomerModel } from '../models/CustomerModel';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { EditCustomerForm } from './edit-customer-form';
import { Button } from '@/components/ui/button';

interface EditCustomerDrawerProps {
  onCustomerUpdated?: () => Promise<void>;
  customer: CustomerModel;
  children?: React.ReactNode;
}

export const EditCustomerDrawer : React.FC<EditCustomerDrawerProps> = ({ onCustomerUpdated, customer, children }) => {
  const [open, setOpen] = useState(false);
  const service = new GenericService<CustomerModel>("customer");

  const handleUpdate = async (model: CustomerModel) => {
    await service.update(model);
    toast.success("Kayıt başarılı!");
    setOpen(false);
    if (onCustomerUpdated) {
      await onCustomerUpdated();
    }
  };
  
  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        {children ?? (
          <Button>Müşteri Bilgileri</Button>
        )}
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
              <Drawer.Title className="font-medium mb-2 text-zinc-900 mb-10">{customer.name} {customer.surname} - Bilgileri </Drawer.Title>
              <Drawer.Description className="text-zinc-600 mb-1">
                <EditCustomerForm onSubmit={handleUpdate} state={customer}  />
              </Drawer.Description>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}