import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
    children: JSX.Element;
}

const PrivateRoute = ({children}: Props) => {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated)
        return <Navigate to="/login" replace />;

    return children;
}

export default PrivateRoute;