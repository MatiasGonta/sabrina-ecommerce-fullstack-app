import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import { Footer, LoadingSpinner, Navbar, ProductsCarousel } from '@/components';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { addItemToCart } from '@/redux/states/cart.state';
import { addProductToFavorites, removeProductFromFavorites } from '@/redux/states/favorites.state';
import { useGetProductDetailsBySlugQuery } from '@/hooks';
import { ApiError, CartItem, COLORS, LoadingSpinnerType, Product, Routes } from '@/models';
import { calculateTotalStock, convertProductToCartItem, getError } from '@/utilities';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '@/styles/pages/ProductPage/ProductPage.scss';

interface ProductPageInterface {}

const ProductPage: React.FC<ProductPageInterface> = () => {
  const favorites = useSelector((store: AppStore) => store.favorites);
  const cart = useSelector((store: AppStore) => store.cart);
  const dispatch = useDispatch();

  const params = useParams();
  const { slug } = params;

  const navigate = useNavigate();

  const { product, relatedProducts, isLoading, error } = useGetProductDetailsBySlugQuery(slug!);

  // Product settings
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const productVariant = `${selectedColor}-${selectedSize}`;

  const addToCartHandler = () => {
    if (selectedColor !== '' && selectedSize !== '' || product?.sizes.length === 0 && selectedColor !== '') {
      const existItem: CartItem | undefined = cart.cartItems.find(
        (item) =>
          item._id === product?._id &&
          item.sizeSelected === selectedSize &&
          item.colorSelected === selectedColor
      );

      const quantity: number = existItem ? existItem.quantity + 1 : 1;

      if(product!.countInStockByVariant[productVariant] < quantity) {

        if (product?.sizes.length === 0) {
          toast.warn(`Lo siento. Producto de color ${selectedColor} sin stock`);
        } else {
          toast.warn(`Lo siento. Producto de color ${selectedColor} y talle ${selectedSize} sin stock`);
        }
        
        return;
      }

      dispatch(addItemToCart({ ...convertProductToCartItem(product!, selectedColor, selectedSize), quantity }));
      toast.success('Producto añadido al carrito');
      navigate('/cart');
      return;
    }

    if (product?.sizes.length === 0) {
      toast.warn('Debes seleccionar un color');
    } else {
      toast.warn('Debes seleccionar un color y talle');
    }
    return;
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const existFavorite: Product | undefined = favorites.find((x) => x._id === product?._id);

  return isLoading ? (
      <LoadingSpinner type={LoadingSpinnerType.NOFLEX} />
    ) : error ? (
      <h4>{getError(error as ApiError)}</h4>
    ) : !product && !relatedProducts ? (
      <h4>Product Not Found</h4>
    ) : (
      <>
        <Helmet>
          <title>{product!.name}</title>
        </Helmet>
        <Navbar />
        <div className='sub-navbar'>
          <h2><Link to={Routes.HOME}>Inicio</Link> / <Link to={Routes.PRODUCTS}>Productos</Link> / {product!.name}</h2>
        </div>
        <main className="product-page-main">
          <article className='product'>
            <section className="product-images">
              <div className="second-images">
                <ul>
                  {
                    product!.images.map((image, index) => (
                      <li key={index} className={selectedImageIndex === index ? "main-img" : ""}>
                        <img src={image} alt={product!.name} onClick={() => handleImageClick(index)} />
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="primary-image">
                <img src={product!.images[selectedImageIndex]} alt={product!.name} />
              </div>
            </section>
            <section className="product-details">
              <div className="product-details__title">
                <h1>{product!.name}</h1>
                <span>${product!.price.toFixed(2)}</span>
                {
                  <Tooltip title={existFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
                    {
                      existFavorite
                        ? <FavoriteIcon
                            className="favorite-icon"
                            sx={{ fontSize: 25 }}
                            onClick={() => dispatch(removeProductFromFavorites(product!))}
                          />
                        : <FavoriteBorderOutlinedIcon
                            className="favorite-icon"
                            sx={{ fontSize: 25 }}
                            onClick={() => dispatch(addProductToFavorites(product!))}
                          />
                    }
                  </Tooltip>
                }
              </div>
              <div className="product-details__options">
                <div className="product-details__options-colors">
                  <h4>Color: <span>{selectedColor}</span></h4>
                  <ul>
                    {
                      product!.colors.map(color => (
                        <li 
                          key={color} 
                          className={selectedColor === color ? "selected" : ""} 
                          onClick={() => setSelectedColor(color)}
                        >
                          <div style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}></div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className="product-details__options-sizes">
                  {product?.sizes.length !== 0 && (
                    <>
                      <h4>Talle: <span>{selectedSize}</span></h4>
                      <ul>
                        {
                          product!.sizes.map(size => (
                            <li 
                              key={size} 
                              className={selectedSize === size ? "selected" : ""} 
                              onClick={() => setSelectedSize(size)}
                            >
                              <span>{size}</span>
                            </li>
                          ))
                        }
                      </ul>
                      <Link to={Routes.SIZES_GUIDE}>
                        <StraightenOutlinedIcon sx={{ fontSize: '20px', position: 'relative', bottom: '1.5px' }} />
                        <span>Guía de talles</span>
                      </Link>
                    </>
                  )}
                </div>
                <div className="product-details__options-brand">
                  <h4>Marca: <span>{product!.brand}</span></h4>
                </div>
                <div className="product-details__options-status">
                  <h4>Estado: <span>{calculateTotalStock(product!) > 0 ? 'En Stock' : 'Sin Stock'}</span></h4>
                </div>
                {
                  calculateTotalStock(product!) === 0
                    ? <button className="out-stock-btn">SIN STOCK</button>
                    : <button className="add-to-cart-btn" onClick={() => addToCartHandler()}>AÑADIR AL CARRITO</button>
                }
              </div>
            </section>
          </article>
          {
            relatedProducts && relatedProducts.length !== 0 &&
            <ProductsCarousel
              title="Productos relacionados"
              items={relatedProducts}
            />
          }
        </main>
        <Footer />
      </>
    )
}

export default ProductPage