import { LoadingSpinner } from '@/components/ui';
import { useGetPaypalClientIdQuery, useUpdateOrderMutation, useUpdateProductStock } from "@/hooks";
import { ApiError, LoadingSpinnerType, Order } from "@/models";
import { getError } from "@/utilities";
import { Typography } from '@mui/material';
import { PayPalButtonsComponentProps, PayPalButtons, usePayPalScriptReducer, SCRIPT_LOADING_STATE } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface PayPalButtonInterface {
    order: Order;
    checkoutStock: () => void;
}

const PayPalButton: React.FC<PayPalButtonInterface> = ({ order, checkoutStock }) => {
    const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypalConfig } = useGetPaypalClientIdQuery();

    useEffect(() => {
        if (paypalConfig && paypalConfig.clientId) {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypalConfig!.clientId,
                        currency: 'USD',
                    },
                })
                paypalDispatch({
                    type: 'setLoadingStatus',
                    value: SCRIPT_LOADING_STATE.PENDING,
                })
            }
            loadPaypalScript();
        }
    }, [paypalConfig])

    const { mutateAsync: updateOrder } = useUpdateOrderMutation();
    const { mutateAsync: updateStock } = useUpdateProductStock();

    const paypalButtonTransactionProps: PayPalButtonsComponentProps = {
        style: {
            layout: 'vertical',
            color: 'blue'
        },
        async createOrder(data, actions) {
            try {
                await checkoutStock();
                // Proceed with creating the order if stock check is successful
                const orderId = await actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: order!.totalPrice.toString(),
                      },
                    },
                  ],
                });

                return orderId;
            } catch (err) {
                toast.error(getError(err as ApiError));
                throw err;
            }
        },
        onApprove(data, actions) {
            return actions.order!.capture().then(async (details) => {
                try {
                    const data = await updateOrder({
                        orderId: order._id,
                        delivered: false,
                        paid: true,
                        paymentMethod: order.paymentMethod,
                        paymentId: details.id
                    });
                    await updateStock({ orderItems: order.orderItems, action: 'discount' });
                    toast.success(data.payMessage, {
                        icon: '🎉',
                    });
                } catch (err) {
                    toast.error(getError(err as ApiError))
                }
            })
        },
        onError: (err) => {
            toast.error(getError(err as ApiError))
        },
    }

    return (
        isPending ? <LoadingSpinner type={LoadingSpinnerType.FLEX} /> : isRejected ? <Typography fontSize={20} fontWeight="bold" component="h2" noWrap={false}>Error in connecting to PayPal</Typography> : (
            <PayPalButtons {...paypalButtonTransactionProps} />
        )
    )
}

export default PayPalButton