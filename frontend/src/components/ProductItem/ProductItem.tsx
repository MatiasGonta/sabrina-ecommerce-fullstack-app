import { CartItem, COLORS, Product } from "@/models"
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
      <Link to={`/products/${product.slug}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-item__image"
        />
      </Link>
      <div>
        <div className="product-item__colors">
          <span>{product.colors.length} colores</span>
        </div>
        {
          addCartSettings
            ? (
              <div className="product-item__settings">
                <Tooltip title="Cerrar">
                  <button className="product-item__setting-close" onClick={() => setAddCartSettings(false)}>
                    <CloseIcon sx={{ fontSize: 25 }} />
                  </button>
                </Tooltip>
                <ul className="product-item__settings-color">
                  {
                    product.colors.slice(0, 6).map(color => (
                      <li
                        key={color}
                        className={selectedColor === color ? "selected" : ""}
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
                      <li onClick={() => navigate(`/products/${product.slug}`)}>
                        <span>
                          <u>+{product.colors.length - 6}</u>
                        </span>
                      </li>
                    )
                  }
                </ul>
                <ul className="product-item__settings-size">
                  {
                    product.sizes.slice(0, 4).map(size => (
                      <li key={size} className={selectedSize === size ? "selected" : ""} onClick={() => setSelectedSize(size)}>
                        <span>{size}</span>
                      </li>
                    ))
                  }
                  {
                    product.sizes.length > 4 && (
                      <li onClick={() => navigate(`/products/${product.slug}`)}>
                        <span>
                          <u>+{product.sizes.length - 4}</u>
                        </span>
                      </li>
                    )
                  }
                </ul>
                <button className="add-to-cart-btn" onClick={addToCartHandler} >AÑADIR</button>
              </div>
            ) : (
              <>
                <Link to={`/products/${product.slug}`} className="product-item__name">{product.name}</Link>
                <span className="product-item__price">${product.price}</span>

                {
                  calculateTotalStock(product) === 0
                    ? <button className="out-stock-btn">SIN STOCK</button>
                    : <button
                      className="add-to-cart-btn"
                      onClick={() => setAddCartSettings(true)}
                    >AÑADIR AL CARRITO</button>
                }
              </>
            )
        }
      </div>
    </li>
  )
}

export default ProductItem