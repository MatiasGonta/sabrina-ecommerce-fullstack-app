import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { removeProductFromFavorites } from '@/redux/states/favorites.state';
import { Footer, Navbar } from "@/components";
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
          <h2><Link to={Routes.HOME}>Inicio</Link> / Favoritos</h2>
        </div>
        <main className="favorites-main">
          <article>
            {
              favorites.length === 0
              ? (
                <section id="favorites-clear-section">
                  <HeartBrokenOutlinedIcon sx={{ fontSize: 100 }} />
                  <p>Aún no tenés productos en Favoritos.</p>
                  <Link to={Routes.HOME}>Ir de compras</Link>
                </section>
              ) : (
                <section id="favorites-product-section">
                  <ul>
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
                          <div>
                            <div className="favorites-product__colors">
                              <span>{product.colors.length} colores</span>
                            </div>
                            <Link to={`${Routes.PRODUCTS}/${product.slug}`} className="favorites-product__name">{product.name}</Link>
                            <span className="favorites-product__price">${product.price.toFixed(2)}</span>
                            <span
                              onClick={() => dispatch(removeProductFromFavorites(product))}
                              className="favorites-product__remove"
                            >Eliminar</span>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </section>
              )
            }
          </article>
        </main>
        <Footer />
    </>
  )
}

export default FavoritesPage