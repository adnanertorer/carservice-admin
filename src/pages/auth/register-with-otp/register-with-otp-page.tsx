import { ModeToggle } from "@/components/ModeToggle";
import { OtpRegisterForm } from "@/features/auth/otp-register/forms/otp-register-form";
import carRepairImage from "@/assets/fixy.png";

export default function RegisterWithOtp() {
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
          Lütfen kaydınızı tamamlamak için kayıt sırasında kullandığınız
          kullanıcı e-posta adresine gönderilen 6 haneli OTP kodunu giriniz.
        </p>
      </div>
      <div className="flex min-h-10 w-full items-center justify-center">
        <OtpRegisterForm />
      </div>
    </>
  );
}
