"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/core/api/axios";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import { useState } from "react";
import { toast } from "react-toastify";

export function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  function handleSubmit() {

    if (password !== confirmedPassword) {
      toast.error("Parolalar eşleşmiyor.");
      return;
    }

    api.post<ISingleResponse<boolean>>("/user/change-password", { oldPassword: oldPassword, newPassword: confirmedPassword })
      .then(response => {
        if (response.data.succeeded && response.data.data === true) {
          toast.success("Parolanız başarıyla değiştirildi.");
        }else{
          setOldPassword("");
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
    <div className="flex mt-10 flex-col space-y-4 max-w-sm mx-auto items-center">
        <Label>Eski Parola</Label>
        <Input type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Eski parolanızı girin"
        />

        <Label>Yeni Parola</Label>
        <Input
          type="password"
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
