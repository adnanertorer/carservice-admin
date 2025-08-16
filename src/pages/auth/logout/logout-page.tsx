import api from "@/core/api/axios";
import { clearToken } from "@/core/auth/TokenService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LogoutPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await api.get("user/logout");

    if (res?.data.succeeded) {
      toast.success("Çıkış başarılı!");
      clearToken();
      navigate("/login");
    } else {
      toast.error("Hatalı çıkış denemesi");
    }
  };

  useEffect(()=>{
    handleLogout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
      </div>
    </div>
  );
}
