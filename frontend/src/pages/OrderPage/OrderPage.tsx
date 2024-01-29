import { Navbar } from "@/components";
import { LoadingSpinner, Footer, OrderItem } from '@/components/ui';
import {
    useDeleteOrderMutation,
    useGetCartItemsStockByIdQuery,
    useGetOrderDetailsQuery
} from "@/hooks";
import { ApiError, Routes, LoadingSpinnerType } from "@/models";
import { dateFormat, getError } from "@/utilities";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MercadoPagoButton, PayPalButton } from "./components";
import { Typography } from "@mui/material";
import '@/styles/pages/OrderPages/OrderPages.scss';

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
    const { stock } = useGetCartItemsStockByIdQuery(orderItemsId);

    const { mutateAsync: deleteOrder } = useDeleteOrderMutation();

    const checkoutOrderStock = () => {
        try {
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

        } catch (err) {
            toast.error(getError(err as ApiError));
        }
    }

    // Verification of the payment status using the url obtained from MercadoPago
    useEffect(() => {
        if (paymentStatus === 'approved') toast.success('El pago se ha registrado con éxito. ¡Gracias por su compra!', { icon: '🎉' });
        else if (paymentStatus === 'failure') toast.error('El pago fallo');
    }, []);

    return (
        isLoading
            ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX} />
            : error ? <Typography fontSize={20} fontWeight="bold" component="h2" noWrap={false}>{getError(error as ApiError)}</Typography>
                : !order ? <Typography fontSize={20} fontWeight="bold" component="h2" noWrap={false}>Order Not Found</Typography> : (
                    <>
                        <Navbar />

                        <main>
                            <Helmet>
                                <title>Orden {orderId}</title>
                            </Helmet>
                            <section className="order">
                                <article className="order__header">
                                    <Typography fontSize={{ xs: 25, sm: 35 }} fontWeight="bold" my="30px" component="h1" noWrap={false}>
                                        Orden {orderId}
                                    </Typography>
                                </article>
                                <article className="order__info">
                                    <div className="order__info__shipping">
                                        <Typography fontSize={25} fontWeight="bold" component="h4" noWrap={false}>Envío</Typography>
                                        <p>
                                            <strong>Nombre:</strong> {order.shippingAddress.fullName}
                                            <br />
                                            <strong>Dirección: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                        </p>
                                        {
                                            order.isDelivered
                                                ? (
                                                    <div className="order__info__shipping__check">
                                                        <span>Entregado el {dateFormat(order.deliveredAt)}</span>
                                                    </div>
                                                ) : (
                                                    <div className="order__info__shipping__not-check">
                                                        <span>No entregado</span>
                                                    </div>
                                                )
                                        }
                                    </div>
                                    <div className="order__info__payment">
                                        <Typography fontSize={25} fontWeight="bold" component="h4" noWrap={false}>Pago</Typography>
                                        <p>
                                            <strong>Método:</strong> {order.paymentMethod}
                                        </p>
                                        {
                                            order.isPaid
                                                ? (
                                                    <div className="order__info__payment__check">
                                                        <span>Pagado el {dateFormat(order.paidAt)}</span>
                                                    </div>
                                                ) : (
                                                    <div className="order__info__payment__not-check">
                                                        <span>No pagado</span>
                                                    </div>
                                                )
                                        }
                                    </div>
                                    <div className="order__info__product">
                                        <Typography fontSize={25} fontWeight="bold" component="h4" noWrap={false}>Productos</Typography>
                                        <ul className="order__info__product__list">
                                            {
                                                order.orderItems.map((item, index) => <OrderItem key={`${item._id}${index}`} item={item} />)
                                            }
                                        </ul>
                                    </div>
                                </article>
                                <article className="order__summary">
                                    <Typography fontSize={25} fontWeight="bold" component="h5" noWrap={false}>Resumen del pedido</Typography>
                                    <ul className="order__summary__items-row">
                                        <li>Productos</li>
                                        <li>${order.itemsPrice.toFixed(2)}</li>
                                    </ul>
                                    <ul className="order__summary__shipping-row">
                                        <li>Envío</li>
                                        <li>${order.shippingPrice.toFixed(2)}</li>
                                    </ul>
                                    <ul className="order__summary__tax-row">
                                        <li>Impuesto</li>
                                        <li>${order.taxPrice.toFixed(2)}</li>
                                    </ul>
                                    <ul className="order__summary__total-row">
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
                                </article>
                            </section>
                        </main>
                        <Footer />
                    </>
                )
    )
}

export default OrderPage