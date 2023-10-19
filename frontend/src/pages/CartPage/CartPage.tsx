import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Footer, Navbar, ProductsCarousel } from "@/components";
import { CartItem, Product } from "@/models";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { CartItem as Item } from './components';
import '@/styles/pages/CartPage/CartPage.scss';

interface CartPageInterface {}

const CartPage: React.FC<CartPageInterface> = () => {
    const favorites = useSelector((store: AppStore) => store.favorites);
    const cart = useSelector((store: AppStore) => store.cart);

    const navigate = useNavigate();

    const checkoutHandler = () => navigate('/signin?redirect=/shipping');

    const favoriteProductsNotInCart: Product[] = favorites.filter(
        (favorite) => !cart.cartItems.some((item) => item._id === favorite._id)
    );

  return (
    <>
        <Helmet>
            <title>Carrito de Compras</title>
        </Helmet>
        <Navbar />
        <div className='sub-navbar'>
          <h2><Link to="/">Inicio</Link> / Carrito de Compras</h2>
        </div>
        <main className='cart-main'>
            <article>
                    {
                        cart.cartItems.length === 0
                        ? (
                            <section id="cart-clear-section">
                                <StorefrontOutlinedIcon sx={{ fontSize: 100 }} />
                                <p>Tu carrito está vacío.</p>
                                <Link to="/">Ir de compras</Link>
                            </section>
                        ) : (
                            <>
                                <section id="cart-products-section">
                                    <ul>
                                        {
                                            cart.cartItems.map((item: CartItem, index) => <Item key={`${item._id}${index}`} item={item} />)
                                        }
                                    </ul>
                                </section>
                                <section id="cart-purchase-summary-section">
                                    <div>
                                        <h3>Resumen de compra</h3>
                                    </div>
                                    <div>
                                        <div id='purchase-summary-info'>
                                            <span>Total ({cart.cartItems.reduce((a,c) => a + c.quantity, 0)})</span>
                                            <span>$ {cart.cartItems.reduce((a,c) => a + c.price * c.quantity, 0).toFixed(2)}</span>
                                        </div>
                                        <button onClick={checkoutHandler} disabled={cart.cartItems.length === 0}>Continuar compra</button>
                                    </div>
                                </section>
                            </>
                        )
                    }
            </article>
            {
                cart.cartItems.length !== 0 &&
                favorites.length !== 0 &&
                <ProductsCarousel title="Productos que te gustaron" items={favoriteProductsNotInCart} />
            }
        </main>
        <Footer />
    </>
  )
}

export default CartPage