import { Footer, LoadingSpinner, Navbar } from "@/components";
import { ThemeContext } from "@/context";
import { usePayPalScriptReducer, SCRIPT_LOADING_STATE, PayPalButtonsComponentProps, PayPalButtons } from '@paypal/react-paypal-js';
import { useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from "@/hooks";
import { ApiError } from "@/models";
import { getError } from "@/utilities";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import '@/styles/layouts/PlaceOrderPage/PlaceOrderPage.scss';

interface OrderPageInterface {}

const OrderPage: React.FC<OrderPageInterface> = () => {
    const { userInfo, clearCart } = useContext(ThemeContext);
    
    const params = useParams();
    const { id: orderId } = params;

    const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId!);

    const { mutateAsync: payOrder, isLoading: LoadingPay} = usePayOrderMutation();

    const testPayHandler = async () => {
        await payOrder({ orderId: orderId! });
        refetch();
        clearCart();
        toast.success('El pedido se pagó con éxito');
    }

    const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypalConfig } = useGetPaypalClientIdQuery();

    useEffect(() => {
      if (paypalConfig && paypalConfig.clientId) {
        const loadPaypalScript = async () => {
            paypalDispatch({
                type: 'resetOptions',
                value: {
                    'clientId': paypalConfig!.clientId,
                    currency: 'USD',
                },
            });
            paypalDispatch({
                type: 'setLoadingStatus',
                value: SCRIPT_LOADING_STATE.PENDING,
            });
            loadPaypalScript();
        }
      }
    }, [paypalConfig]);
    
    const paypalButtonTransactionProps: PayPalButtonsComponentProps = {
        style: { layout: 'vertical' },
        createOrder(data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: order!.totalPrice.toString(),
                        }
                    }
                ]
            }).then((orderID: string) => {
                return orderID
            })
        },
        onApprove(data, actions) {
            return actions.order!.capture().then(async (details) => {
                try {
                    await payOrder({ orderId: orderId!, ...details });
                    refetch();
                    toast.success('El pedido se pagó con éxito');
                } catch(error) {
                    toast.error(getError(error as ApiError));
                }
            })
        },
        onError: (err) => toast.error(getError(err as ApiError))
    }

  return isLoading ? <LoadingSpinner type='noflex' /> : error ? <h2>{getError(error as ApiError)}</h2> : !order ? <h2>Order Not Found</h2> : (
    <>
    <Navbar />
    <main className="place-order-main">
        <Helmet>
            <title>Orden {orderId}</title>
        </Helmet>
        <article className="order">
            <section className="order-title-section">
                <h1>Orden {orderId}</h1>
            </section>
            <section className="order-info-section">
                <div className="order-info__shipping">
                    <h4>Envío</h4>
                    <p>
                        <strong>Nombre:</strong> {order.shippingAddress.fullName}
                        <br />
                        <strong>Dirección: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                    </p>
                    {
                        order.isDelivered ? (
                            <div className="order-action-check">
                                <span>Entregado el {order.deliveredAt.substring(0,10)}</span>
                            </div>
                        ) : (
                            <div className="order-action-no-check">
                                <span>No entregado</span>
                            </div>
                        )
                    }
                </div>
                <div className="order-info__payment">
                    <h4>Pago</h4>
                    <p>
                        <strong>Método:</strong> {order.paymentMethod}
                    </p>
                    {
                        order.isPaid ? (
                            <div className="order-action-check">
                                <span>Pagado el {order.paidAt.substring(0,10)}</span>
                            </div>
                        ) : (
                            <div className="order-action-no-check">
                                <span>No pagado</span>
                            </div>
                        )
                    }
                </div>
                <div className="order-info__product">
                    <h4>Productos</h4>
                    <ul>
                        {
                            order.orderItems.map((item) => (
                                <li key={item._id}>
                                    <div>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="order-info__product-image"
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                    <div>
                                        <span className="order-info__product-quantity">{item.quantity}</span>
                                    </div>
                                    <strong className="order-info__product-price">${item.price}</strong>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>
            <section className="order-summary-section">
                <h5>Resumen del pedido</h5>
                <ul className="items-row">
                    <li>Productos</li>
                    <li>${order.itemsPrice.toFixed(2)}</li>
                </ul>
                <ul className="shipping-row">
                    <li>Envío</li>
                    <li>${order.shippingPrice.toFixed(2)}</li>
                </ul>
                <ul className="tax-row">
                    <li>Tax</li>
                    <li>${order.taxPrice.toFixed(2)}</li>
                </ul>
                <ul className="order-total-row">
                    <li>
                        <strong>Total del pedido</strong>
                    </li>
                    <li>
                        <strong>${order.totalPrice.toFixed(2)}</strong>
                    </li>
                </ul>
                <div>
                    {!order.isPaid && (
                        <>
                        {isPending ? <LoadingSpinner type='flex' /> : isRejected ? <h2>Error in connecting to PayPal</h2> : (
                          <div>
                            <PayPalButtons {...paypalButtonTransactionProps}></PayPalButtons>
                            <button onClick={testPayHandler}>Test Pay</button>
                          </div>
                        )}
                        {LoadingPay && <LoadingSpinner type='flex' />}
                        </>
                    )}
                </div>
            </section>
        </article>
    </main>
    <Footer />
    </>
  )
}

export default OrderPage