import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Navbar, ProductsCarousel } from "@/components";
import { Footer } from '@/components/ui';
import { CartItem, Product, Routes } from "@/models";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { CartItem as Item } from './components';
import '@/styles/pages/CartPage/CartPage.scss';

interface CartPageInterface { }

const CartPage: React.FC<CartPageInterface> = () => {
    const favorites = useSelector((store: AppStore) => store.favorites);
    const cart = useSelector((store: AppStore) => store.cart);

    const navigate = useNavigate();

    const checkoutHandler = () => navigate(`${Routes.SIGNIN}?redirect=${Routes.SHIPPING}`);

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
                <h2 className="sub-navbar__route-path"><Link to={Routes.HOME}>Inicio</Link> / Carrito de Compras</h2>
            </div>

            <main>
                <section className="cart-info">
                    {
                        cart.cartItems.length === 0
                            ? (
                                <article className="cart-clear">
                                    <StorefrontOutlinedIcon sx={{ fontSize: 100 }} />
                                    <p className="cart-clear__text">Tu carrito está vacío.</p>
                                    <Link to={Routes.HOME} className="cart-clear__link">Ir de compras</Link>
                                </article>
                            ) : (
                                <>
                                    <article className="cart-info__products">
                                        <ul>
                                            {
                                                cart.cartItems.map((item: CartItem, index) => <Item key={`${item._id}${index}`} item={item} />)
                                            }
                                        </ul>
                                    </article>
                                    <article className="cart-info__purchase-summary">
                                        <div className="cart-info__purchase-summary__head">
                                            <h3 className="cart-info__purchase-summary__head__title">Resumen de compra</h3>
                                        </div>
                                        <div className="cart-info__purchase-summary__body">
                                            <div className="cart-info__purchase-summary__body__total">
                                                <span>Total ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)})</span>
                                                <strong>$ {cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}</strong>
                                            </div>
                                            <button
                                                className="cart-info__purchase-summary__body__btn"
                                                onClick={checkoutHandler}
                                                disabled={cart.cartItems.length === 0}
                                            >
                                                Continuar compra
                                            </button>
                                        </div>
                                    </article>
                                </>
                            )
                    }
                </section>
                <section>
                    <article>
                        {
                            cart.cartItems.length !== 0 &&
                            favorites.length !== 0 &&
                            <ProductsCarousel items={favoriteProductsNotInCart}>
                                Productos que te gustaron
                            </ProductsCarousel>
                        }
                    </article>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default CartPage