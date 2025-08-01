import { Card, CardContent } from "@/components/ui/card";
import type { AccountTransactionModel } from "../models/account-transaction-model";

interface TransactionCardProps {
  transaction: AccountTransactionModel;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getTransactionType = (type: number) => {
    switch (type) {
      case 1:
        return { label: "Gelir", color: "text-green-600" };
      case 2:
        return { label: "Gider", color: "text-red-600" };
      default:
        return { label: "Diğer", color: "text-gray-600" };
    }
  };

  const transactionType = getTransactionType(transaction.transactionType);

  return (
    <Card className="w-full mb-3">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Üst kısım - İsim ve Tarih */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-sm">{transaction.ownerName}</h3>
              <p className="text-xs text-muted-foreground">
                {formatDate(transaction.transactionDate)}
              </p>
            </div>
            <div className="text-right">
              <span className={`text-xs font-medium ${transactionType.color}`}>
                {transactionType.label}
              </span>
            </div>
          </div>

          {/* Açıklama */}
          {transaction.description && (
            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
              {transaction.description}
            </p>
          )}

          {/* Alt kısım - Tutarlar */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <p className="text-muted-foreground">Alacak</p>
              <p className="font-medium text-green-600">
                {formatCurrency(transaction.claim)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Borç</p>
              <p className="font-medium text-red-600">
                {formatCurrency(transaction.debt)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Bakiye</p>
              <p className={`font-medium ${
                transaction.balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(transaction.balance)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
