import { Product } from "@/models"
import { Link } from "react-router-dom";
import { Rating } from "../Rating";

interface ProductItemInterface {
    product: Product;
}

const ProductItem: React.FC<ProductItemInterface> = ({ product }) => {
  return (
    <Link to={`/product/${product.slug}`}>
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <div>
        <h2>{product.name}</h2>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p>{product.price}</p>
        {
            product.countInStock === 0 ? <button>Out of stock</button> : <button>Add to cart</button>
        }
      </div>
    </Link>
  )
}

export default ProductItem