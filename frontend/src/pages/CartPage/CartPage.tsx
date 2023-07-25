import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Footer, Navbar } from "@/components";
import { ThemeContext } from "@/context";
import { CartItem, Product } from "@/models";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { toast } from 'react-toastify';
import "react-multi-carousel/lib/styles.css";
import '../../styles/CartPage.scss';

interface CartPageInterface {}

const CartPage: React.FC<CartPageInterface> = () => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        smallLargeDesktop: {
            breakpoint: { max: 1300, min: 900 },
            items: 4
        },
        largeTablet: {
            breakpoint: { max: 900, min: 700 },
            items: 3
        },
        tablet: {
          breakpoint: { max: 700, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    const navigate = useNavigate();

    const { favorites, cart, addItemToCart, removeItemToCart } = useContext(ThemeContext);

    const updatedCartHandler = (item: CartItem, quantity: number) => {
        if (item.countInStock < quantity) {
            toast.warn('Lo siento. Producto sin stock');
            return;
        }
        addItemToCart({ ...item, quantity });
    }    

    const checkoutHandler = () => navigate('/signin?redirect=/shipping');

    const removeItemHandler = (item: CartItem) => removeItemToCart(item);

    const editItemHandler = (item: CartItem) => {
        removeItemToCart(item);
        navigate(`/product/${item.slug}`);
    };

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
          <h2 className="navigation-path"><Link to="/">Inicio</Link> / Carrito de Compras</h2>
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
                                        cart.cartItems.map(
                                            (item: CartItem) => (
                                                <li key={item._id}>
                                                    <div className='product-info'>
                                                        <img src={item.image} alt={item.name} className="img-fluid rounded thumbnail" />
                                                        <div>
                                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                            <span>Color: {item.colorSelected}, Talle: {item.sizeSelected}</span>
                                                            <div>
                                                                <span onClick={() => editItemHandler(item)}>Editar</span>
                                                                <span onClick={() => removeItemHandler(item)}>Eliminar</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='product-quantity'>
                                                        <div>
                                                            <button 
                                                                className={item.quantity === 1 ? 'minor-button  disable' : 'minor-button'} 
                                                                onClick={() => updatedCartHandler(item, item.quantity - 1)} 
                                                                disabled={item.quantity === 1}
                                                            >
                                                                <RemoveIcon sx={{ fontSize: 30 }} />
                                                            </button>
                                                            <span>{item.quantity}</span>
                                                            <button 
                                                                className={item.countInStock === 1 ? 'plus-button disable' : 'plus-button'} 
                                                                onClick={() => updatedCartHandler(item, item.quantity + 1)} 
                                                                disabled={item.quantity === item.countInStock}
                                                            >
                                                                <AddIcon sx={{ fontSize: 30 }} />
                                                            </button>
                                                        </div>
                                                        <span id="product-stock">{item.countInStock - item.quantity} disponibles</span>
                                                    </div>
                                                    <div className='product-price'>
                                                        <span>$ {item.price}</span>
                                                    </div>
                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            </section>
                            <section id="cart-purchase-summary-section">
                                <div>
                                    <h3>Resumen de compra</h3>
                                </div>
                                <div>
                                    <div>
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
                favorites.length !== 0 && (
                    <article>
                        <section>
                            <h5>Productos que te gustaron</h5>
                            <Carousel
                                swipeable={false}
                                draggable={false}
                                showDots={true}
                                responsive={responsive}
                                ssr={true}
                                infinite={true}
                                keyBoardControl={true}
                                customTransition="all 1"
                                transitionDuration={500}
                                containerClass="carousel-container"
                                dotListClass="custom-dot-list-style"
                            >
                                {
                                    favoriteProductsNotInCart.map(
                                        (favorite) => (
                                            <div key={favorite._id} className='favorite-item'>
                                                <Link to={`/product/${favorite.slug}`}>
                                                    <img
                                                        src={favorite.images[0]}
                                                        alt={favorite.name}
                                                        className="product-image"
                                                    />
                                                </Link>
                                                <div>
                                                    <div className="product-colors">
                                                        <span>{favorite.colors.length} colores</span>
                                                    </div>
                                                    <a>{favorite.name}</a>
                                                    <span>${favorite.price}</span>
                                                </div>
                                            </div>
                                        )   
                                    )
                                }
                            </Carousel>
                        </section>
                    </article>
                )
            }
        </main>
        <Footer />
    </>
  )
}

export default CartPage