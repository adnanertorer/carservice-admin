import { ModeToggle } from "@/components/ModeToggle";
import { LoginForm } from "@/features/auth/login/components/login-form";


export default function LoginPage() {
  return (
    <>
    <div className="p-2 float-right">
        <ModeToggle />
      </div>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    </>
  )
}
