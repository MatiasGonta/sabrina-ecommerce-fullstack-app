import { ThemeContext } from "@/context";
import { CartItem } from "@/models";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom"

interface CartPageInterface {}

const CartPage: React.FC<CartPageInterface> = () => {
    const navigate = useNavigate();

    const { cart, addItemToCart, removeItemToCart } = useContext(ThemeContext);

    const updatedCartHandler = (item: CartItem, quantity: number) => {
        if (item.countInStock < quantity) {
            alert('Sorry. Product is out of stock');
            return;
        }
        addItemToCart({ ...item, quantity });
    }    

    const checkoutHandler = () => navigate('/signin?redirect=/shipping');

    const removeItemHandler = (item: CartItem) => removeItemToCart(item);

  return (
    <div>
        <Helmet>
            <title>Shopping Cart</title>
        </Helmet>
        <h1>Shopping Cart</h1>
        <div>
            <div>
                {
                    cart.cartItems.length === 0
                    ? (
                        <>
                            <p>Cart is empty.</p>
                            <Link to="/">Go to Shopping</Link>
                        </>
                    ) : (
                        <ul>
                            {
                                cart.cartItems.map(
                                    (item: CartItem) => (
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
                                                <button onClick={() => updatedCartHandler(item, item.quantity - 1)} disabled={item.quantity === 1} >
                                                    <i className="fas fa-minus-circle"></i>
                                                </button>{' '}
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updatedCartHandler(item, item.quantity + 1)} disabled={item.quantity === item.countInStock} >
                                                    <i className="fas fa-plus-circle"></i>
                                                </button>
                                            </div>
                                            <div>${item.price}</div>
                                            <div>
                                                <button onClick={() => removeItemHandler(item)}>
                                                    <i className="fas fa-tash"></i>
                                                    DELETE
                                                </button>
                                            </div>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    )
                }
            </div>
            <div>
                <div>
                    <h3>
                        Subtotal ({cart.cartItems.reduce((a,c) => a + c.quantity, 0)}{' '}
                        items) : $
                        {cart.cartItems.reduce((a,c) => a + c.price * c.quantity, 0)}
                    </h3>
                </div>
                <div>
                    <button onClick={checkoutHandler} disabled={cart.cartItems.length === 0}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartPage