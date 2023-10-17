import { useCreateMercadoPagoOrder, useGetProfileDetails } from "@/hooks";
import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ApiError, Order } from "@/models";
import { getError } from "@/utilities";

interface MercadoPagoButtonInterface {
    order: Order;
    checkoutStock: () => void;
}

const MercadoPagoButton: React.FC<MercadoPagoButtonInterface> = ({ order, checkoutStock }) => {
    const userInfo = useSelector((store: AppStore) => store.userInfo);

    // Get user info
    const userId = userInfo?._id || '';
    const userToken = userInfo?.token || '';

    const { profileDetails } = useGetProfileDetails(userToken, userId);

    const { mutateAsync: createMercadoPagoOrder } = useCreateMercadoPagoOrder();

    const paymentHandler = async () => {
        try {
            await checkoutStock();
            
            const { url } = await createMercadoPagoOrder({ user: profileDetails, order: order });
            window.location.href = url;
        } catch (error) {
            toast.error(getError(error as ApiError));
        }
    }

  return (
    <button id="mercadopago-btn" onClick={paymentHandler}>MercadoPago</button>
  )
}

export default MercadoPagoButton