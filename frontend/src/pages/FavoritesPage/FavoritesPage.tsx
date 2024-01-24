import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { removeProductFromFavorites } from '@/redux/states/favorites.state';
import { Navbar } from "@/components";
import { Footer } from '@/components/ui';
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import '@/styles/pages/FavoritesPage/FavoritesPage.scss';
import { Routes } from '@/models';

interface FavoritesPageInterface {}

const FavoritesPage: React.FC<FavoritesPageInterface> = () => {
    const favorites = useSelector((store: AppStore) => store.favorites)
    const dispatch = useDispatch();

  return (
    <>
        <Helmet>
          <title>Favoritos - SABRINA</title>
        </Helmet>
        
        <Navbar />

        <div className='sub-navbar'>
          <h2 className="sub-navbar__route-path"><Link to={Routes.HOME}>Inicio</Link> / Favoritos</h2>
        </div>
        
        <main className="main--favorites">
          <section>
            {
              favorites.length === 0
              ? (
                <article className="favorites-clear">
                  <HeartBrokenOutlinedIcon sx={{ fontSize: 100 }} />
                  <p className="favorites-clear__text">Aún no tenés productos en Favoritos.</p>
                  <Link to={Routes.HOME} className="favorites-clear__link">Ir de compras</Link>
                </article>
              ) : (
                <article className="favorites-products">
                  <ul className="favorites-products__list">
                    {
                      favorites!.map(product => (
                        <li key={product.slug} className="favorites-product">
                          <Link to={`${Routes.PRODUCTS}/${product.slug}`}>
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="favorites-product__image"
                            />
                          </Link>
                          <div className="favorites-product__body">
                            <div className="favorites-product__body__colors">
                              <span>{product.colors.length} colores</span>
                            </div>

                            <Link
                              to={`${Routes.PRODUCTS}/${product.slug}`}
                              className="favorites-product__body__name"
                            >
                              {product.name}
                            </Link>
                            
                            <span className="favorites-product__body__price">${product.price.toFixed(2)}</span>
                            <span
                              onClick={() => dispatch(removeProductFromFavorites(product))}
                              className="favorites-product__body__remove"
                            >Eliminar</span>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </article>
              )
            }
          </section>
        </main>
        <Footer />
    </>
  )
}

export default FavoritesPage