"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import api from "@/core/api/axios";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function OtpRegisterForm() {
  const [value, setValue] = useState("");
    const navigate = useNavigate();

  function handleSubmit() {
    api.post<ISingleResponse<boolean>>("/user/approve-otpcode", { otpCode: value })
      .then(response => {
        if (response.data.succeeded && response.data.data === true) {
          toast.success("OTP kodu başarıyla onaylandı. Kayıt işleminiz tamamlandı. Artık sisteme giriş yapabilirsiniz.");
          navigate("/login");
        }else{
          toast.error("OTP kodu onaylanamadı. Lütfen tekrar deneyin.");
          setValue("");
        }
      })
      .catch(error => {
        console.error("Error submitting OTP:", error);
      });
  }

  return (
    <>
    <div className="flex items-center">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button className="ml-2" onClick={handleSubmit} variant="default">Gönder</Button>
      </div>
      </>
  );
}
