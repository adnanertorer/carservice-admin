 export const getTransactionType = (type: number) => {
    switch (type) {
      case 1:
        return { label: "Gelir", color: "text-green-600" };
      case 2:
        return { label: "Gider", color: "text-red-600" };
      default:
        return { label: "Diğer", color: "text-gray-600" };
    }
  };

  export const getFuelType = (type: number) => {
    switch (type) {
      case 1:
        return "Benzin";
      case 2:
        return "Dizel";
      case 3:
        return "LPG";
      default:
        return "Bilinmiyor";
    }
  };