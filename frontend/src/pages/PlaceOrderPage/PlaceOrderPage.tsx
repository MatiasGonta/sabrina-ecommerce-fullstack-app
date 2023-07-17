import { CheckoutSteps, LoadingSpinner } from "@/components";
import { ThemeContext } from "@/context";
import { useCreateOrderMutation } from "@/hooks";
import { ApiError } from "@/models";
import { getError } from "@/utilities";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

const PlaceOrderPage = () => {
    const navigate = useNavigate();

    const { cart, userInfo } = useContext(ThemeContext);

    const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100 //123.2345 => 123.23

    cart.itemsPrice = round2(cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();

    const placeOrderHandler = async () => { 
        try {
            const data = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            });

            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);
        } catch(error) {
            alert(getError(error as ApiError));
        }
    }

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart, navigate]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Helmet>
                <title>Preview Order</title>
            </Helmet>
            <h1>Preview Order</h1>
            <div>
                <h4>Shipping</h4>
                <p>
                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                    <strong>Address: </strong> {cart.shippingAddress.address},
                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                    {cart.shippingAddress.country}
                </p>
                <Link to="/shipping">Edit</Link>
            </div>
            <div>
                <h4>Payment</h4>
                <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                </p>
                <Link to="/payment">Edit</Link>
            </div>
            <div>
                <h4>Items</h4>
                <ul>
                    {
                        cart.cartItems.map((item) => (
                            <li key={item._id}>
                                <div>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="img-fluid rounded thumbnail"
                                    />
                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                </div>
                                <div>
                                    <span>{item.quantity}</span>
                                </div>
                                <div>${item.price}</div>
                            </li>
                        ))
                    }
                </ul>
                <Link to="/cart">Edit</Link>
            </div>
            <div>
                <div>
                    <h5>Order Summary</h5>
                    <ul>
                        <li>Items</li>
                        <li>${cart.itemsPrice.toFixed(2)}</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>Shipping</li>
                        <li>${cart.shippingPrice.toFixed(2)}</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>Tax</li>
                        <li>${cart.taxPrice.toFixed(2)}</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <strong>Order Total</strong>
                        </li>
                        <li>
                            <strong>${cart.totalPrice.toFixed(2)}</strong>
                        </li>
                    </ul>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0 || isLoading}
                    >
                        Place Order
                    </button>
                    {isLoading && <LoadingSpinner />}
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderPage