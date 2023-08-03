import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import { Footer, Navbar } from "@/components";
import { ThemeContext } from "@/context";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import '@/styles/layouts/FavoritesPage/FavoritesPage.scss';

interface FavoritesPageInterface {}

const FavoritesPage: React.FC<FavoritesPageInterface> = () => {
    const { favorites, removeProductToFavorites } = useContext(ThemeContext);

  return (
    <>
        <Helmet>
          <title>Favoritos</title>
        </Helmet>
        <Navbar />
        <div className='sub-navbar'>
          <h2><Link to="/">Inicio</Link> / Favoritos</h2>
        </div>
        <main className="favorites-main">
          <article>
            {
              favorites.length === 0 ? (
                <section id="favorites-clear-section">
                  <HeartBrokenOutlinedIcon sx={{ fontSize: 100 }} />
                  <p>Aún no tenés productos en Favoritos.</p>
                  <Link to="/">Ir de compras</Link>
                </section>
              ) : (
                <section id="favorites-product-section">
                  <ul>
                    {
                      favorites!.map(product => (
                        <li key={product.slug} className="favorites-product">
                          <Link to={`/product/${product.slug}`}>
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
                            <a className='favorites-product__name'>{product.name}</a>
                            <span className='favorites-product__price'>${product.price}</span>
                            <span
                              onClick={() => removeProductToFavorites(product)}
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