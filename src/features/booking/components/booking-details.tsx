import type { IBookingDetailProps } from "../props/booking-detail-props";

export function BookingDetailForm({
  bookingModel,
  ...props
}: IBookingDetailProps) {

    // Format booking date
  const bookingDateValue = bookingModel.bookingDate;
  const bookingDateObj = new Date(bookingDateValue);
  
  const formattedBookingDate = bookingDateObj.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  
return (
    <div className="flex flex-col gap-6" {...props}>
      <h2 className="text-2xl font-bold">
       {bookingModel.mobileUser?.name} {bookingModel.mobileUser?.surname} Randevu Onay Formu
      </h2>
      <p>{formattedBookingDate}</p>
      <p>{bookingModel.vehicleBrand} {bookingModel.vehicleModel}</p>
      <p>{bookingModel.description}</p>
    </div>
  );
}