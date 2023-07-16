import { CartItem, Product } from "@/models"
import { Link } from "react-router-dom";
import { Rating } from "../Rating";
import { useContext } from "react";
import { ThemeContext } from "@/context";
import { convertProductToCartItem } from "@/utilities";

interface ProductItemInterface {
    product: Product;
}

const ProductItem: React.FC<ProductItemInterface> = ({ product }) => {
  const { cart, addItemToCart } = useContext(ThemeContext);
  const addToCartHandler = (item: CartItem) => {
    const existItem = cart.cartItems.find((x)=> x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if(product.countInStock < quantity) {
      alert('Sorry. Product is out off stock');
      return;
    }
    addItemToCart({ ...item, quantity });
    console.log('Product added to the cart');
  }

  return (
    <>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>
      <div>
        <h2>{product.name}</h2>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p>{product.price}</p>
        {
            product.countInStock === 0
              ? <button>Out of stock</button>
              : <button onClick={() => addToCartHandler(convertProductToCartItem(product))}>Add to cart</button>
        }
      </div>
    </> 
  )
}

export default ProductItem