import { Navbar } from "@/components";
import { LoadingSpinner, CheckoutSteps, Footer, OrderItem } from '@/components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { useCreateOrderMutation, useGetCartItemsStockByIdQuery } from "@/hooks";
import { ApiError, LoadingSpinnerType, Routes } from "@/models";
import { getError } from "@/utilities";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { clearCartItems } from "@/redux/states/cart.state";
import '@/styles/pages/OrderPages/OrderPages.scss';

interface PlaceOrderPageInterface {}

const PlaceOrderPage: React.FC<PlaceOrderPageInterface> = () => {
    const cart = useSelector((store: AppStore) => store.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const cartItemsId = [ ...new Set(cart.cartItems.map(item => item._id)) ];
    const { stock, isLoading: isLoadingStock, error } = useGetCartItemsStockByIdQuery(cartItemsId);

    const taxPercentage = cart.paymentMethod === 'PayPal'
                            ? 0.10 : cart.paymentMethod === 'MercadoPago'
                            ? 0.05 : 0;

    const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100

    const itemsPrice = round2(cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0));
    const shippingPrice = itemsPrice > 150 ? round2(0) : round2(10);
    const taxPrice = round2(taxPercentage * itemsPrice);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();
    
    const checkoutCartStock = () => {
        cart.cartItems.forEach(item => {
            const itemId: string = item._id;
            const itemStock: number = item.countInStock;
    
            const dataBaseStock: number = stock[itemId][`${item.colorSelected}-${item.sizeSelected}`];
    
            // Throw an error if the stock of the item is greater than that in the database
            if (dataBaseStock < itemStock) {
                const errorMsg = `No hay suficiente stock para ${item.name}.`;
    
                toast.info('Considere editar los productos de la orden', {
                    autoClose: 9000,
                });

                throw new Error(errorMsg);
            }
        })
    }

    const placeOrderHandler = async () => { 
        try {
            if (cart.cartItems.length !== 0) {
                // Checkout cart items stock
                checkoutCartStock();

                // Create order
                const newOrder = {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: itemsPrice,
                    shippingPrice: shippingPrice,
                    taxPrice: taxPrice,
                    totalPrice: totalPrice,
                };

                const data = await toast.promise(createOrder(newOrder), {
                    pending: {
                      render() {
                        return 'Creando nueva orden...'
                      },
                    },
                    success: {
                      render({ data }) {
                        return data?.message
                      },
                    },
                });

                dispatch(clearCartItems());
                localStorage.removeItem('cartItems');
                navigate(`${Routes.ORDER}/${data.order._id}`);
            }
        } catch(error) {
            toast.error(getError(error as ApiError));
        }
    }

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate(Routes.PAYMENT);
        }
    }, [cart, navigate]);

    return (
        isLoadingStock
        ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX} />
        : error ? <h2>{getError(error as ApiError)}</h2>
        : !stock ? <h2>Order Not Found</h2> : (
        <>
            <Navbar />
            <main>
                <Helmet>
                    <title>Vista previa del pedido</title>
                </Helmet>
                <section>
                    <article>
                        <CheckoutSteps step1 step2 step3 step4 />
                    </article>
                </section>
                <section className="order">
                    <article className="order__header">
                        <h1 className="order__header__title">Vista previa del pedido</h1>
                    </article>
                    <article className="order__info">
                        <div className="order__info__shipping">
                            <h4 className="order__info__shipping__title">Envío</h4>
                            <p>
                                <strong>Nombre:</strong> {cart.shippingAddress.fullName}
                                <br />
                                <strong>Dirección: </strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                            </p>
                            <Link to={Routes.SHIPPING} className="order__info__shipping__link">Editar</Link>
                        </div>
                        <div className="order__info__payment">
                            <h4 className="order__info__payment__title">Pago</h4>
                            <p>
                                <strong>Método:</strong> {cart.paymentMethod}
                            </p>
                            <Link to={Routes.PAYMENT} className="order__info__payment__link">Editar</Link>
                        </div>
                        <div className="order__info__product">
                            <h4 className="order__info__product__title">Productos</h4>
                            <ul className="order__info__product__list">
                                {
                                    cart.cartItems.map((item, index) => <OrderItem key={index} item={item} />)
                                }
                            </ul>
                            <Link to={Routes.CART} className="order__info__product__link">Editar</Link>
                        </div>
                    </article>
                    <article className="order__summary">
                        <h5 className="order__summary__title">Resumen del pedido</h5>
                        <ul className="order__summary__items-row">
                            <li>Productos</li>
                            <li>${itemsPrice.toFixed(2)}</li>
                        </ul>
                        <ul className="order__summary__shipping-row">
                            <li>Envío</li>
                            <li>${shippingPrice.toFixed(2)}</li>
                        </ul>
                        <ul className="order__summary__tax-row">
                            <li>Impuesto</li>
                            <li>${taxPrice.toFixed(2)}</li>
                        </ul>
                        <ul className="order__summary__total-row">
                            <li>
                                <strong>Total del pedido</strong>
                            </li>
                            <li>
                                <strong>${totalPrice.toFixed(2)}</strong>
                            </li>
                        </ul>
                        <button
                            className="order__summary__ordering-btn"
                            type="button"
                            onClick={placeOrderHandler}
                            disabled={cart.cartItems.length === 0 || isLoading}
                        >
                            Realizar pedido
                        </button>
                    </article>
                </section>
            </main>
            <Footer />
        </>
        )
    )
}

export default PlaceOrderPage