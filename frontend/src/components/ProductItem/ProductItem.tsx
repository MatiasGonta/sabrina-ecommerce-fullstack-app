import { CartItem, COLORS, Product, Routes } from "@/models"
import { Link, useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { addProductToFavorites, removeProductFromFavorites } from '@/redux/states/favorites.state';
import { addItemToCart } from '@/redux/states/cart.state';
import { calculateTotalStock, convertProductToCartItem } from "@/utilities";
import { toast } from 'react-toastify';
import { useState } from "react";

interface ProductItemInterface {
  product: Product;
}

const ProductItem: React.FC<ProductItemInterface> = ({ product }) => {
  const favorites = useSelector((store: AppStore) => store.favorites);
  const cart = useSelector((store: AppStore) => store.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [addCartSettings, setAddCartSettings] = useState<boolean>(false);

  // Product settings
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const productVariant = `${selectedColor}-${selectedSize}`;

  const addToCartHandler = () => {
    if (selectedColor !== '' && selectedSize !== '' || product?.sizes.length === 0 && selectedColor !== '') {
      const existItem: CartItem | undefined = cart.cartItems.find(
        (item) =>
          item._id === product!._id &&
          item.sizeSelected === selectedSize &&
          item.colorSelected === selectedColor
      );
      const quantity: number = existItem ? existItem.quantity + 1 : 1;

      if (product!.countInStockByVariant[productVariant] < quantity) {

        if (product?.sizes.length === 0) {
          toast.warn(`Lo siento. Producto de color ${selectedColor} sin stock`);
        } else {
          toast.warn(`Lo siento. Producto de color ${selectedColor} y talle ${selectedSize} sin stock`);
        }

        return;
      }

      dispatch(addItemToCart({ ...convertProductToCartItem(product, selectedColor, selectedSize), quantity }));
      toast.success('Producto añadido al carrito');
      return;
    }

    if (product?.sizes.length === 0) {
      toast.warn('Debes seleccionar un color');
    } else {
      toast.warn('Debes seleccionar un color y talle');
    }
    return;
  }

  const existFavorite: Product | undefined = favorites.find((x) => x._id === product._id);

  return (
    <li className="product-item">
      {
        <Tooltip title={existFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'} >
          {
            existFavorite
              ? <FavoriteIcon
                className="product-item__favorite-icon"
                sx={{ fontSize: 30 }}
                onClick={() => dispatch(removeProductFromFavorites(product))}
              />
              : <FavoriteBorderOutlinedIcon
                className="product-item__favorite-icon"
                sx={{ fontSize: 30 }}
                onClick={() => dispatch(addProductToFavorites(product))}
              />
          }
        </Tooltip>
      }
      <Link to={`${Routes.PRODUCTS}/${product.slug}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-item__image"
        />
      </Link>
      <div className="product-item__body">
        <div className="product-item__body__colors">
          <span>{product.colors.length} colores</span>
        </div>
        {
          addCartSettings
            ? (
              <div className="product-item__body__settings">
                <Tooltip title="Cerrar">
                  <button className="product-item__body__settings__close" onClick={() => setAddCartSettings(false)}>
                    <CloseIcon sx={{ fontSize: 25 }} />
                  </button>
                </Tooltip>
                <ul className="product-item__body__settings__color">
                  {
                    product.colors.slice(0, 6).map(color => (
                      <li
                        key={color}
                        className={`${selectedColor === color && "color--selected"}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        <Tooltip title={color} >
                          <div style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}></div>
                        </Tooltip>
                      </li>
                    ))
                  }
                  {
                    product.colors.length > 6 && (
                      <li onClick={() => navigate(`${Routes.PRODUCTS}/${product.slug}`)}>
                        <span>
                          <u>+{product.colors.length - 6}</u>
                        </span>
                      </li>
                    )
                  }
                </ul>
                <ul className="product-item__body__settings__size">
                  {
                    product.sizes.slice(0, 4).map(size => (
                      <li key={size} className={`${selectedSize === size && "size--selected"}`} onClick={() => setSelectedSize(size)}>
                        <span>{size}</span>
                      </li>
                    ))
                  }
                  {
                    product.sizes.length > 4 && (
                      <li onClick={() => navigate(`${Routes.PRODUCTS}/${product.slug}`)}>
                        <span>
                          <u>+{product.sizes.length - 4}</u>
                        </span>
                      </li>
                    )
                  }
                </ul>
                <button className="add-to-cart-btn add-to-cart-btn--confirm" type="button" onClick={addToCartHandler}>
                  <span className="add-to-cart-btn--confirm__text">AÑADIR</span>
                  <span className="add-to-cart-btn--confirm__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke="#fff"
                      fill="#fff"
                    >
                      <line y2="19" y1="5" x2="12" x1="12"></line>
                      <line y2="12" y1="12" x2="19" x1="5"></line>
                    </svg>
                  </span>
                </button>
              </div>
            ) : (
              <>
                <Link to={`${Routes.PRODUCTS}/${product.slug}`} className="product-item__body__name">{product.name}</Link>
                <span className="product-item__body__price">${product.price.toFixed(2)}</span>

                {
                  calculateTotalStock(product) === 0
                    ? <button className="out-stock-btn">SIN STOCK</button>
                    : <button
                      className="add-to-cart-btn"
                      onClick={() => setAddCartSettings(true)}
                    >
                      <div>
                        <svg
                          className="add-to-cart-btn__cart-icon"
                          fill="#fff" 
                          viewBox="0 0 576 512" 
                          height="1em" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                        </svg>
                        AÑADIR AL CARRITO
                        <svg
                          className="add-to-cart-btn__clothes-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 640 512"
                        >
                          <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path>
                        </svg>
                      </div>
                    </button>
                }
              </>
            )
        }
      </div>
    </li>
  )
}

export default ProductItem