import { cn } from "@/lib/utils";
import type { CustomerBalanceInfoProps } from "../props/customer-balance-info-props";
import { CreateClaimDrawer } from "./create-claim-drawer";

export function CustomerBalanceInfoView({ 
    className,
    customerName,
    customerSurname,
    balance,
    customerId,
    accountOwnerType,
    onSubmitAfter,
    ...props
}: CustomerBalanceInfoProps & Omit<React.ComponentProps<"div">, "onSubmit">) {
    return(
         <div className={cn("w-full", className)} {...props}>
            <h2 className="text-lg font-semibold">Müşteri Bakiye Bilgisi</h2>
            <div className="mt-4 space-y-2">
                <p className="text-sm">Ad: {customerName}</p>
                <p className="text-sm">Soyad: {customerSurname}</p>
                <p className="text-sm">Bakiye: {balance}</p>
                <CreateClaimDrawer
                    customerId={customerId}
                    customerName={customerName}
                    customerSurname={customerSurname}
                    accountOwnerType={accountOwnerType}
                    balance={balance || 0}
                    onClaimCreated={onSubmitAfter}
                />
            </div>
         </div>
    );
}