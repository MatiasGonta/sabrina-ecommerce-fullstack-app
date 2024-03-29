import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { useGetProfileDetails } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingSpinner } from '@/components/ui';
import { LoadingSpinnerType, Routes } from '@/models';

export default function ProtectedRoute() {
    const userInfo = useSelector((store: AppStore) => store.userInfo);

    let userId = userInfo?._id || '';
    let userToken = userInfo?.token || '';

    const { profileDetails, isLoading } = useGetProfileDetails(userToken, userId);

    if (isLoading && userId !== '' && userToken !== '') {
        // Wait for profile details to load before redirecting
        return <LoadingSpinner type={LoadingSpinnerType.NOFLEX} />;
    } else {
        if(profileDetails) {
            return <Outlet />
        } else {
            return <Navigate to={Routes.SIGNIN} />
        }
    }
}