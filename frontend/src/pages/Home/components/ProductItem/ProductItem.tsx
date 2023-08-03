import { CartItem, Product } from "@/models"
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext } from "react";
import { ThemeContext } from "@/context";
import { convertProductToCartItem } from "@/utilities";
import { toast } from 'react-toastify';

interface ProductItemInterface {
  product: Product;
}

const ProductItem: React.FC<ProductItemInterface> = ({ product }) => {
  const { cart, addItemToCart, favorites, addProductToFavorites, removeProductToFavorites } = useContext(ThemeContext);
  const addToCartHandler = (item: CartItem) => {
    const existItem = cart.cartItems.find((x)=> x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if(product.countInStock < quantity) {
      toast.warn('Lo siento. Producto sin stock');
      return
    }
    addItemToCart({ ...item, quantity });
    toast.success('Producto añadido al carrito');
  }

  const existFavorite = favorites.find((x) => x._id === product._id);

  return (
    <li key={product.slug} className="product-item">
      {
        existFavorite
        ? <FavoriteIcon className="product-item__favorite-icon" sx={{ fontSize: 25 }} onClick={() => removeProductToFavorites(product)} />
        : <FavoriteBorderOutlinedIcon className="product-item__favorite-icon" sx={{ fontSize: 25 }} onClick={() => addProductToFavorites(product)} />
      }
      <Link to={`/product/${product.slug}`}>
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
        <a className="product-item__name">{product.name}</a>
        <span className="product-item__price">${product.price}</span>
        {
          product.countInStock === 0
            ? <button className="out-stock-btn">SIN STOCK</button>
            : <button className="add-to-cart-btn" onClick={() => addToCartHandler(convertProductToCartItem(product, product.colors[0], product.sizes[0]))}>AÑADIR AL CARRITO</button>
        }
      </div>
    </li> 
  )
}

export default ProductItem