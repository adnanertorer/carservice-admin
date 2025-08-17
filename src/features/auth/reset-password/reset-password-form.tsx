"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import api from "@/core/api/axios";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function ResetPasswordForm() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {

    if (password !== confirmedPassword) {
      toast.error("Parolalar eşleşmiyor.");
      return;
    }

    api.post<ISingleResponse<boolean>>("/user/approve-reset-password", { otpCode: value, newPassword: confirmedPassword })
      .then(response => {
        if (response.data.succeeded && response.data.data === true) {
          toast.success("Parolanız başarıyla değiştirildi. Artık sisteme giriş yapabilirsiniz.");
          navigate("/login");
        }else{
          setValue("");
          setConfirmedPassword("");
          setPassword("");
        }
      })
      .catch(error => {
        console.error("Error submitting OTP:", error);
      });
  }

  return (
    <>
    <div className="flex flex-col space-y-4 max-w-sm mx-auto items-center">

        <Label>Doğrulama Kodu</Label>
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
        
        <Label>Yeni Parola</Label>
        <Input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Yeni parolanızı girin"
        />

        <Label>Parolayı Tekrar Girin</Label>
        <Input
          type="password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          placeholder="Yeni parolanızı tekrar girin"
        />
        
        <Button className="ml-2" onClick={handleSubmit} variant="default">Gönder</Button>
      </div>
      </>
  );
}
