import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { useGetProfileDetails } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const userInfo = useSelector((store: AppStore) => store.userInfo);

    const userId = userInfo?._id || '';
    const userToken = userInfo?.token || '';

    const { profileDetails } = useGetProfileDetails(userToken, userId);

    if(profileDetails) {
        return <Outlet />
    } else {
        return <Navigate to="/signin" />
    }
}