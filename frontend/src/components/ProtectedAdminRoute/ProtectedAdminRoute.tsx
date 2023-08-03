import { ThemeContext } from "@/context";
import { useGetProfileDetails } from "@/hooks";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
    const { userInfo } = useContext(ThemeContext);

    const userId = userInfo?._id || '';
    const userToken = userInfo?.token || '';

    const { profileDetails } = useGetProfileDetails(userToken, userId);

    if(profileDetails.isAdmin) {
        return <Outlet />
    } else {
        return <Navigate to="/" />
    }
}