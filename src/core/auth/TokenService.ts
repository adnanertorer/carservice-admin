export const getAccessToken = () : string | null  => localStorage.getItem('token');
export const getRefreshToken = () : string | null => localStorage.getItem('refresh_token');

export const setToken = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
};

export const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
}