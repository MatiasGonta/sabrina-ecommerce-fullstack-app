import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Footer, Navbar, ProductsCarousel } from "@/components";
import { ThemeContext } from "@/context";
import { CartItem, Product } from "@/models";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import '@/styles/layouts/CartPage/CartPage.scss';
import { CartItem as Item } from '.';

interface CartPageInterface {}

const CartPage: React.FC<CartPageInterface> = () => {
    const navigate = useNavigate();

    const { favorites, cart } = useContext(ThemeContext);   

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
                                            cart.cartItems.map((item: CartItem) => <Item item={item} />)
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
                                            <span>$ {cart.cartItems.reduce((a,c) => a + c.price * c.quantity, 0)}</span>
                                        </div>
                                        <button onClick={checkoutHandler} disabled={cart.cartItems.length === 0}>Continuar compra</button>
                                    </div>
                                </section>
                            </>
                        )
                    }
            </article>
            {
                favorites.length !== 0 && <ProductsCarousel title="Productos que te gustaron" items={favoriteProductsNotInCart} />
            }
        </main>
        <Footer />
    </>
  )
}

export default CartPage