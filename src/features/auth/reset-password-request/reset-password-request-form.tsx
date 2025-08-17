"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/core/api/axios";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function ResetPasswordRequestForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    api
      .post<ISingleResponse<boolean>>("/user/reset-password-request", {
        email: email,
      })
      .then((response) => {
        if (response.data.succeeded && response.data.data === true) {
          toast.success(
            "Şifre sıfırlama isteği başarıyla gönderildi. Lütfen e-posta kutunuzu kontrol edin."
          );
          navigate("/reset-password");
        } else {
          toast.error(
            "Şifre sıfırlama isteği gönderilemedi. Lütfen tekrar deneyin."
          );
          setEmail("");
        }
      })
      .catch((error) => {
        console.error("Error submitting email:", error);
      });
  }

  return (
    <>
      <div className="flex items-center">
        <Input
          type="email"
          placeholder="E-posta adresinizi girin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="ml-2" onClick={handleSubmit} variant="default">
          Gönder
        </Button>
      </div>
    </>
  );
}
