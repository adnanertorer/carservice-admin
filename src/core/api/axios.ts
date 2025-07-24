import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { clearToken, getAccessToken, getRefreshToken, setToken } from "../auth/TokenService";

//const { apiUrl } = getApiConfig();

const api = axios.create({
    baseURL: "http://localhost:7290/api", 
});

let isRefreshing = false;

type FailedRequest<TError = unknown> = {
  resolve: (token: string | null) => void;
  reject: (error: TError) => void;
};

let failedQueue: FailedRequest<AxiosError | Error>[] = [];

const processQueue = (error: AxiosError | Error | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;
  
      // Token expired ve retry edilmemişse
      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string | null) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalRequest));
              },
              reject,
            });
          });
        }
  
        isRefreshing = true;
  
        try {
          const refreshToken = getRefreshToken();
  
          const response = await axios.post('user/refresh', {
            refreshToken,
          });
  
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          setToken(accessToken, newRefreshToken);
          processQueue(null, accessToken);
  
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as AxiosError | Error | null, null);
          clearToken();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else if (err.response?.status === 400) {
        handle400Error(err.response.data);
        return Promise.resolve(undefined);
      }
  
      return Promise.reject(err);
    }
    
  );
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handle400Error(data: any) {
    console.error('400 Error:', data);
    if (Array.isArray(data)) {
      data.forEach((res: { code: string; name: string }) => {
        toast.error(`${res.code}: ${res.name}`);
      });
    } else if (data?.errors && Array.isArray(data.errors)) {
      console.error('400 Error with errors array:', data.errors);
      data.errors.forEach((res: { code: string; name: string }) => {
        toast.error(`${res.code}: ${res.name}`);
      });
    } else if (typeof data?.errors === "object" && data.errors !== null) {
    const entries = Object.entries(data.errors) as [string, string[]][];
    entries.forEach(([field, messages]) => {
      messages.forEach((msg) => {
        toast.error(`${field}: ${msg}`);
      });
    });
    return;
  } else if (data?.code && data?.name) {
      toast.error(`${data.code}: ${data.name}`);
    } else if(data?.detail){
      toast.error(data.detail);
    }
     else {
      toast.error('Geçersiz istek. Lütfen bilgilerinizi kontrol edin.');
      console.error('Unhandled 400 error structure:', data);
    }
  }

  
export default api;