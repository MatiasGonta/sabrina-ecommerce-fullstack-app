import { ThemeContext } from "@/context";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { userInfo } = useContext(ThemeContext);

    if(userInfo) {
        return <Outlet />
    } else {
        return <Navigate to="/signin" />
    }
}