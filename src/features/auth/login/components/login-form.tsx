import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/core/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useFormManager } from "@/core/hooks/useFormManager"
import { isEmail, minLength, required } from "@/core/components/tools/validators"
import { toast } from "react-toastify"
import api from "@/core/api/axios"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        setFieldValue,
        validate,
        getFieldErrors,
        getFirstError,
        isValid,
        form
      } = useFormManager(
        {
          email: "",
          password: ""
        },
        {
          email: [
            (val: string | number | boolean) => required()(String(val)),
            (val: string | number | boolean) => minLength(5)(String(val)),
            (val: string | number | boolean) => isEmail()(String(val))
          ],
          password: [
            (val: string | number | boolean) => required()(String(val)),
            (val: string | number | boolean) => minLength(2)(String(val))
          ]
        }
      );

      const handleLogin = async () => {
        const res = await api.post('user/login', {
          email: form.email,
          password: form.password,
        });
    
        if (res?.data.succeeded) {
          const result = res?.data;
          console.log(result);
          login(result.data.token, result.data.refreshToken);
          toast.success("Giriş başarılı!");
          navigate('/');
        }else{
          toast.error("Hatalı giriş denemesi");
        }
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const isFormValid = validate();
        if(!isFormValid) return;
    
        await handleLogin();
      };
      
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Car Service</CardTitle>
                    <CardDescription>
                        Giriş yapmak için kayıtlı e-posta adresinizi girin
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">E-Posta</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="E-Posta adresinizi yazınız"
                                    required
                                    onChange={(e) => setFieldValue("email", e.currentTarget.value)}
                                    onError={()=>{
                                        return getFieldErrors("email")
                                    }}
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Parola</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Parolanızı mı unuttunuz?
                                    </a>
                                </div>
                                <Input id="password" type="password" required onChange={(e) => setFieldValue("password", e.currentTarget.value)} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Giriş
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Hesabınız yok mu?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Hesap Oluştur
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
