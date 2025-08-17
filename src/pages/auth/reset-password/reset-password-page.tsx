import { ModeToggle } from "@/components/ModeToggle";
import carRepairImage from "@/assets/fixy.png";
import { ResetPasswordForm } from "@/features/auth/reset-password/reset-password-form";

export default function ResetPasswordPage() {
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
                className="w-20 max-w-sm rounded-md object-cover"
              />
            </div>
       </div>
      <div className="flex h-10 w-full items-center justify-center">
        <h3>FixyBear</h3>
      </div>
      <div className="flex h-10 w-full items-center justify-center">
        <p>
          Parolanızı oluşturmak için lütfen size gönderilen doğrulama kodunu ve yeni parolanızı girin
        </p>
      </div>
      <div className="flex min-h-10 w-full items-center justify-center">
        <ResetPasswordForm />
      </div>
    </>
  );
}
