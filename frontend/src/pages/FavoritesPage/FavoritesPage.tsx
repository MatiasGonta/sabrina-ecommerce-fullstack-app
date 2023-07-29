import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import { Footer, Navbar } from "@/components";
import { ThemeContext } from "@/context";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import '../../styles/FavoritesPage.scss';
import { Link } from "react-router-dom";

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
          <h2 className="navigation-path"><Link to="/">Inicio</Link> / Favoritos</h2>
        </div>
        <main className="favorites-main">
          <article>
            {
              favorites.length === 0 ? (
                <section id="favorites-clear-section">
                  <HeartBrokenOutlinedIcon sx={{ fontSize: 100 }} />
                  <p>Aún no tenés productos en Favoritos.</p>
                  <Link to="/">Ir de compras</Link>
                </section>s
              ) : (
                <section>
                  <ul>
                    {
                      favorites!.map(product => (
                        <li key={product.slug}>
                          <Link to={`/product/${product.slug}`}>
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="product-image"
                            />
                          </Link>
                          <div>
                            <div className="product-colors">
                              <span>{product.colors.length} colores</span>
                            </div>
                              <a>{product.name}</a>
                              <span>${product.price}</span>
                              <span onClick={() => removeProductToFavorites(product)} id="favorite-remove">Eliminar</span>
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