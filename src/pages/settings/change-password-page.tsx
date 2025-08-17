import { ChangePasswordForm } from "@/features/auth/change-password/change-password-form";

export function SettingsPage() {
 
  return (
    <div className="w-full">
      <h3>Parola Değiştirme Formu</h3>
      <hr />
      <ChangePasswordForm />
    </div>
  );
}
