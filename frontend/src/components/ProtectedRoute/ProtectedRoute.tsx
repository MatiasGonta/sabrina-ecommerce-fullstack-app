import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { useGetProfileDetails } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingSpinner } from '@/components';

export default function ProtectedRoute() {
    const userInfo = useSelector((store: AppStore) => store.userInfo);

    const userId = userInfo?._id || '';
    const userToken = userInfo?.token || '';

    const { profileDetails, isLoading } = useGetProfileDetails(userToken, userId);

    if (isLoading && userId !== '' && userToken !== '') {
        // Espera a que se carguen los detalles del perfil antes de redirigir
        return <LoadingSpinner type='noflex' />;
    } else {
        if(profileDetails) {
            return <Outlet />
        } else {
            return <Navigate to="/signin" />
        }
    }
}