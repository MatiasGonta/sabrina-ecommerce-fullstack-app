import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import { Navbar, ProductsCarousel } from '@/components';
import { LoadingSpinner, Footer, SubNavbar } from '@/components/ui';
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

interface ProductPageInterface { }

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

      if (product!.countInStockByVariant[productVariant] < quantity) {

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

      <SubNavbar>
        <span>
          <Link to={Routes.HOME}>Inicio</Link> / <Link to={Routes.PRODUCTS}>Productos</Link> / {product!.name}
        </span>
      </SubNavbar>

      <main className="main--product-page">
        <section className="product">
          <article className="product__images">
            <div className="product__images__secondaries">
              <ul className="product__images__secondaries__list">
                {
                  product!.images.map((image, index) => (
                    <li key={index} className={`product__images__secondaries__list__li ${selectedImageIndex === index && "product__images__secondaries__list__li--selected"}`}>
                      <img src={image} alt={product!.name} className="product__images__secondaries__list__li__img" onClick={() => handleImageClick(index)} />
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="product__images__primary">
              <img
                src={product!.images[selectedImageIndex]}
                alt={product!.name}
                className="product__images__primary__img"
              />
            </div>
          </article>

          <article className="product__details">
            <div className="product__details__head">
              <h1 className="product__details__head__title">{product!.name}</h1>
              <span className="product__details__head__price">${product!.price.toFixed(2)}</span>
              {
                <Tooltip title={existFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
                  {
                    existFavorite
                      ? <FavoriteIcon
                        className="product__details__head__favorite-icon"
                        sx={{ fontSize: 25 }}
                        onClick={() => dispatch(removeProductFromFavorites(product!))}
                      />
                      : <FavoriteBorderOutlinedIcon
                        className="product__details__head__favorite-icon"
                        sx={{ fontSize: 25 }}
                        onClick={() => dispatch(addProductToFavorites(product!))}
                      />
                  }
                </Tooltip>
              }
            </div>
            <div className="product__details__options">
              <div className="product__details__options__colors">
                <h4 className="product__details__options__colors__title">Color: <span>{selectedColor}</span></h4>
                <ul className="product__details__options__colors__list">
                  {
                    product!.colors.map(color => (
                      <li
                        key={color}
                        className={`product__details__options__colors__list__color ${selectedColor === color && "product__details__options__colors__list__color--selected"}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        <div style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}></div>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="product__details__options__sizes">
                {product?.sizes.length !== 0 && (
                  <>
                    <h4 className="product__details__options__sizes__title">Talle: <span>{selectedSize}</span></h4>
                    <ul className="product__details__options__sizes__list">
                      {
                        product!.sizes.map(size => (
                          <li
                            key={size}
                            className={`product__details__options__sizes__list__size ${selectedSize === size && "product__details__options__sizes__list__size--selected"}`}
                            onClick={() => setSelectedSize(size)}
                          >
                            <span>{size}</span>
                          </li>
                        ))
                      }
                    </ul>
                    <Link className="product__details__options__sizes__link" to={Routes.SIZES_GUIDE}>
                      <StraightenOutlinedIcon sx={{ fontSize: 20, position: 'relative', bottom: '1.5px' }} />
                      <span>Guía de talles</span>
                    </Link>
                  </>
                )}
              </div>
              <div className="product__details__options__brand">
                <h4 className="product__details__options__brand__title">Marca: <span>{product!.brand}</span></h4>
              </div>
              <div className="product__details__options__status">
                <h4 className="product__details__options__status__title">Estado: <span>{calculateTotalStock(product!) > 0 ? 'En Stock' : 'Sin Stock'}</span></h4>
              </div>
              <div className="product__details__options__button">
                {
                  calculateTotalStock(product!) === 0
                    ? <button className="out-stock-btn">SIN STOCK</button>
                    : <button
                      className="add-to-cart-btn"
                      onClick={() => addToCartHandler()}
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
              </div>
            </div>
          </article>
        </section>

        {
          relatedProducts && relatedProducts.length !== 0 && (
            <ProductsCarousel items={relatedProducts}>
              Productos relacionados
            </ProductsCarousel>
          )
        }
      </main>
      <Footer />
    </>
  )
}

export default ProductPage