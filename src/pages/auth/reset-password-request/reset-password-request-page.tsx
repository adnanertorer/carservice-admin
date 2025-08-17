import { ModeToggle } from "@/components/ModeToggle";
import carRepairImage from "@/assets/fixy.png";
import { ResetPasswordRequestForm } from "@/features/auth/reset-password-request/reset-password-request-form";

export default function ResetPasswordRequestPage() {
  return (
    <>
      <div className="p-2 float-right">
        <ModeToggle />
      </div>
       <div className="flex w-full items-center justify-center">
        <div className="rounded-lg">
              <img
                src={carRepairImage}
                alt="FixyBear"
                className="w-50 max-w-sm rounded-md object-cover"
              />
            </div>
       </div>
      <div className="flex h-10 w-full items-center justify-center">
        <h3>FixyBear</h3>
      </div>
      <div className="flex h-10 w-full items-center justify-center">
        <p>
          Parolanızı sıfırlamak için lütfen e-posta adresinizi girin. E-posta adresinize bir doğrulama kodu gönderilecektir. Bu kodu kullanarak yeni bir şifre belirleyebilirsiniz.
        </p>
      </div>
      <div className="flex min-h-10 w-full items-center justify-center">
        <ResetPasswordRequestForm />
      </div>
    </>
  );
}
