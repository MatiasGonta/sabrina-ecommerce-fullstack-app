import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Footer, LoadingSpinner, Navbar } from '@/components';
import { ThemeContext } from '@/context';
import { useGetProductDetailsBySlugQuery } from '@/hooks';
import { ApiError, CartItem, Product } from '@/models';
import { calculateTotalStock, convertProductToCartItem, getError } from '@/utilities';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '@/styles/layouts/ProductPage/ProductPage.scss';

interface ProductPageInterface {}

const ProductPage: React.FC<ProductPageInterface> = () => {
  const params = useParams();
  const { slug } = params;

  const { data: product, isLoading, error } = useGetProductDetailsBySlugQuery(slug!);

  const { favorites, addProductToFavorites, removeProductToFavorites, cart, addItemToCart } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const productVariant = `${selectedColor}-${selectedSize}`;

  const addToCartHandler = () => {
    if (selectedColor !== '' && selectedSize !== '') {
      const existItem: CartItem | undefined = cart.cartItems.find(
        (item) =>
          item._id === product!._id &&
          item.sizeSelected === selectedSize &&
          item.colorSelected === selectedColor
      );
      const quantity: number = existItem ? existItem.quantity + 1 : 1;

      if(product!.countInStockByVariant[productVariant] < quantity) {
        toast.warn('Lo siento. Producto sin stock');
        return;
      }

      addItemToCart({ ...convertProductToCartItem(product!, selectedColor, selectedSize), quantity });
      toast.success('Producto añadido al carrito');
      navigate('/cart');
      return;
    }
    toast.warn('Debes seleccionar un color y talle');
    return;
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const existFavorite: Product | undefined = favorites.find((x) => x._id === product?._id);

  return isLoading ? (
      <LoadingSpinner type='noflex' />
    ) : error ? (
      <h4>{getError(error as ApiError)}</h4>
    ) : !product ? (
      <h4>Product Not Found</h4>
    ) : (
      <>
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        <Navbar />
        <div className='sub-navbar'>
          <h2><Link to="/">Inicio</Link> / <Link to="/products">Productos</Link> / {product.name}</h2>
        </div>
        <main className="product-page-main">
          <article className='product'>
            <section className="product-images">
              <div className="second-images">
                <ul>
                  {
                    product.images.map((image, index) => (
                      <li key={image} className={selectedImageIndex === index ? "main-img" : ""}>
                        <img src={image} alt={product.name} onClick={() => handleImageClick(index)} />
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="primary-image">
                <img src={product.images[selectedImageIndex]} alt={product.name} />
              </div>
            </section>
            <section className="product-details">
              <div className="product-details__title">
                <h1>{product.name}</h1>
                <span>${product.price}</span>
                {
                  existFavorite
                  ? <FavoriteIcon className="favorite-icon" sx={{ fontSize: 25 }} onClick={() => removeProductToFavorites(product)} />
                  : <FavoriteBorderOutlinedIcon className="favorite-icon" sx={{ fontSize: 25 }} onClick={() => addProductToFavorites(product)} />
                }
              </div>
              <div className="separator"></div>
              <div className="product-details__options">
                <div className="product-details__options-colors">
                  <h4>Color: <span>{selectedColor}</span></h4>
                  <ul>
                    {
                      product.colors.map(color => (
                        <li key={color} className={selectedColor === color ? "selected" : ""} onClick={() => setSelectedColor(color)}>
                          <div style={{ backgroundColor: color }}></div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className="product-details__options-sizes">
                  <h4>Talle: <span>{selectedSize}</span></h4>
                  <ul>
                    {
                      product.sizes.map(size => (
                        <li key={size} className={selectedSize === size ? "selected" : ""} onClick={() => setSelectedSize(size)}>
                          <span>{size}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className="product-details__options-status">
                  <h4>Estado: <span>{calculateTotalStock(product) > 0 ? 'En Stock' : 'Sin Stock'}</span></h4>
                </div>
                {
                  calculateTotalStock(product) === 0
                    ? <button className="out-stock-btn">SIN STOCK</button>
                    : <button className="add-to-cart-btn" onClick={() => addToCartHandler()}>AÑADIR AL CARRITO</button>
                }
              </div>
            </section>
          </article>
        </main>
        <Footer />
      </>
    )
}

export default ProductPage