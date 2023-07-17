import { CartItem, Order, ShippingAddress } from "@/models";
import { apiClient } from "@/services";
import { useMutation } from "react-query";

export const useCreateOrderMutation = () => useMutation({
    mutationFn: async (order: {
        orderItems: CartItem[]
        shippingAddress: ShippingAddress
        paymentMethod: string
        itemsPrice: number
        shippingPrice: number
        taxPrice: number
        totalPrice: number
    }) => 
        (
            await apiClient.post<{ message: string, order: Order }>(
                'api/orders',
                order
            )
        ).data
});