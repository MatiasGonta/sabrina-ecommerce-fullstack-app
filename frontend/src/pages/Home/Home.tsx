import { sampleProducts } from "@/data";
import { Link } from 'react-router-dom';

interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  return (
    <>
      <header>
        <nav>
          <div>
            <h1>Amazona</h1>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sing In</a>
          </div>
        </nav>
      </header>
      <main>
        <ul>
          {
            sampleProducts.map(product => (
              <li key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </main>
      <footer>
        <h6>All right reserved</h6>
      </footer>
    </>
  )
}

export default Home