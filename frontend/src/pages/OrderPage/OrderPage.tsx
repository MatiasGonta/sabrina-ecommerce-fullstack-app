import { Footer, LoadingSpinner, Navbar, OrderItem } from "@/components";
import {
    useDeleteOrderMutation,
    useGetCartItemsStockByIdQuery,
    useGetOrderDetailsQuery
} from "@/hooks";
import { ApiError, Routes, monthNames } from "@/models";
import { getError } from "@/utilities";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MercadoPagoButton, PayPalButton } from "./components";
import '@/styles/pages/PlaceOrderPage/PlaceOrderPage.scss';

interface OrderPageInterface { }

const OrderPage: React.FC<OrderPageInterface> = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('status');
    const { id: orderId } = params;

    // Get order
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId!);

    // Stock checkout
    const orderItemsId = [...new Set(order?.orderItems.map(item => item._id))];
    const { stock, isLoading: isLoadingStock, error: stockError } = useGetCartItemsStockByIdQuery(orderItemsId);

    const { mutateAsync: deleteOrder } = useDeleteOrderMutation();

    const checkoutOrderStock = () => {
        order?.orderItems.forEach(item => {
            const itemId: string = item._id;
            const itemStock: number = item.countInStock;

            const dataBaseStock: number = stock[itemId][`${item.colorSelected}-${item.sizeSelected}`];

            // Throw an error if the stock of the item is greater than that in the database
            if (dataBaseStock < itemStock) {
                const errorMsg = `No hay suficiente stock para ${item.name}.`;

                toast.info('Por favor, considere realizar un nuevo pedido y evitar esperar demasiado tiempo para el pago, ya que sus productos favoritos pueden agotarse debido al stock limitado.', {
                    autoClose: 11000,
                });
                toast.loading('Eliminando orden y redirigiendo...', {
                    position: 'top-center',
                    onOpen: () => deleteOrder(orderId!),
                });

                setTimeout(() => {
                    toast.dismiss('loading-toast');
                    navigate(Routes.HOME);
                }, 11600);

                throw new Error(errorMsg);
            }
        })
    }

    // Verification of the payment status using the url obtained from MercadoPago
    useEffect(() => {
        if (paymentStatus === 'approved') toast.success('El pago se ha registrado con éxito. ¡Gracias por su compra!', { icon: '🎉' });
        else if (paymentStatus === 'failure') toast.error('El pago fallo');
    }, []);

    return (
        isLoading || isLoadingStock
            ? <LoadingSpinner type='noflex' />
            : error || stockError ? <h2>{getError(error as ApiError)}</h2>
                : !order || !stock ? <h2>Order Not Found</h2> : (
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
                                            order.isDelivered
                                                ? (
                                                    <div className="order-action-check">
                                                        <span>Entregado el {`${order.deliveredAt.substring(8, 10)} ${monthNames[parseInt(order.deliveredAt.substring(5, 7)) - 1]} ${order.deliveredAt.substring(0, 4)}`}</span>
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
                                            order.isPaid
                                                ? (
                                                    <div className="order-action-check">
                                                        <span>Pagado el {`${order.paidAt.substring(8, 10)} ${monthNames[parseInt(order.paidAt.substring(5, 7)) - 1]} ${order.paidAt.substring(0, 4)}`}</span>
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
                                                order.orderItems.map((item, index) => <OrderItem key={`${item._id}${index}`} item={item} />)
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
                                        <li>Impuesto</li>
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
                                                <div>
                                                    {order.paymentMethod === 'PayPal' && <PayPalButton order={order} checkoutStock={checkoutOrderStock} />}
                                                    {order.paymentMethod === 'MercadoPago' && <MercadoPagoButton order={order} checkoutStock={checkoutOrderStock} />}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </section>
                            </article>
                        </main>
                        <Footer />
                    </>
                )
    )
}

export default OrderPage