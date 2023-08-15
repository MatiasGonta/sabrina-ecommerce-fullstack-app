import { CheckoutSteps, Footer, LoadingSpinner, Navbar, OrderItem } from "@/components";
import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { useCreateOrderMutation } from "@/hooks";
import { ApiError } from "@/models";
import { getError } from "@/utilities";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '@/styles/layouts/PlaceOrderPage/PlaceOrderPage.scss';

interface PlaceOrderPageInterface {}

const PlaceOrderPage: React.FC<PlaceOrderPageInterface> = () => {
    const cart = useSelector((store: AppStore) => store.cart);

    const navigate = useNavigate();

    const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100

    const itemsPrice = round2(cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0));
    const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
    const taxPrice = round2(0.15 * itemsPrice);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();

    const placeOrderHandler = async () => { 
        try {
            const data = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            });

            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);
        } catch(error) {
            toast.error(getError(error as ApiError));
        }
    }

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart, navigate]);

    return (
        <>
        <Navbar />
        <main className="place-order-main">
            <Helmet>
                <title>Vista previa del pedido</title>
            </Helmet>
            <article>
                <CheckoutSteps step1 step2 step3 step4 />
            </article>
            <article className="order">
                <section className="order-title-section">
                    <h1>Vista previa del pedido</h1>
                </section>
                <section className="order-info-section">
                    <div className="order-info__shipping">
                        <h4>Envío</h4>
                        <p>
                            <strong>Nombre:</strong> {cart.shippingAddress.fullName}
                            <br />
                            <strong>Dirección: </strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                        </p>
                        <Link to="/shipping">Editar</Link>
                    </div>
                    <div className="order-info__payment">
                        <h4>Pago</h4>
                        <p>
                            <strong>Método:</strong> {cart.paymentMethod}
                        </p>
                        <Link to="/payment">Editar</Link>
                    </div>
                    <div className="order-info__product">
                        <h4>Productos</h4>
                        <ul>
                            {
                                cart.cartItems.map((item, index) => <OrderItem key={`${item._id}${index}`} item={item} />)
                            }
                        </ul>
                        <Link to="/cart">Editar</Link>
                    </div>
                </section>
                <section className="order-summary-section">
                    <h5>Resumen del pedido</h5>
                    <ul className="items-row">
                        <li>Productos</li>
                        <li>${itemsPrice.toFixed(2)}</li>
                    </ul>
                    <ul className="shipping-row">
                        <li>Envío</li>
                        <li>${shippingPrice.toFixed(2)}</li>
                    </ul>
                    <ul className="tax-row">
                        <li>Impuesto</li>
                        <li>${taxPrice.toFixed(2)}</li>
                    </ul>
                    <ul className="order-total-row">
                        <li>
                            <strong>Total del pedido</strong>
                        </li>
                        <li>
                            <strong>${totalPrice.toFixed(2)}</strong>
                        </li>
                    </ul>
                    <button
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0 || isLoading}
                    >
                        Realizar pedido
                    </button>
                    {isLoading && <LoadingSpinner type='flex' />}
                </section>
            </article>
        </main>
        <Footer />
        </>
    )
}

export default PlaceOrderPage