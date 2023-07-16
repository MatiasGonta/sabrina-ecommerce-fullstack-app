import { LoadingSpinner, Rating } from '@/components';
import { useGetProductDetailsBySlugQuery } from '@/hooks';
import { ApiError } from '@/models';
import { getError } from '@/utilities';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

interface ProductPageInterface {}

const ProductPage: React.FC<ProductPageInterface> = () => {
  const params = useParams();
  const { slug } = params;

  const { data: product, refetch, isLoading, error } = useGetProductDetailsBySlugQuery(slug!);
  return isLoading ? (
      <LoadingSpinner />
    ) : error ? (
      <h4>{getError(error as ApiError)}</h4>
    ) : !product ? (
      <h4>Product Not Found</h4>
    ) : (
      <div>
        <Helmet>
          <title>TS Amazona</title>
        </Helmet>
        <div>
          <div>
            <img className="large" src={product.image} alt={product.name} />
          </div>
          <div>
            <ul>
              <li>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Rating rating={product.rating} numReviews={product.numReviews} />
              </li>
              <li>
                Price : ${product.price}
              </li>
              <li>
                Description:
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div>
            <h5>Price:</h5>
            <span>${product.price}</span>
          </div>
          <div>
            <h5>Status:</h5>
            <span>
              {
                product.countInStock > 0 ? 'In Stock' : 'Unavailable'
              }
            </span>
          </div>
          <div>
              {
                product.countInStock > 0 && <button>Add to Cart</button>
              }
          </div>
        </div>
      </div>
    )
}

export default ProductPage