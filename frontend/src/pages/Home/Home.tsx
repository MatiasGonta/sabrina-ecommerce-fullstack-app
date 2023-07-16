// import { useEffect, useReducer } from "react";
// import { ApiError, Product } from "@/models";
// import { getError } from "@/utilities";
// import axios from "axios";
import { LoadingSpinner, ProductItem } from "@/components";
import { ThemeContext } from "@/context";
import { useGetProductsQuery } from "@/hooks";
import { ApiError } from "@/models";
import { getError } from "@/utilities";
import { useContext } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";


interface HomeInterface {}

//------------------------Todo cambiado por react-query------------------------
// type State = {
//   products: Product[],
//   loading: boolean,
//   error: string
// }

// type Action = | {type: 'FETCH_REQUEST'} | {
//     type: 'FETCH_SUCCESS'
//     payload: Product[]
//   } | {
//     type: 'FETCH_FAIL'
//     payload: string
//   }

// const initialState: State = {
//   products: [],
//   loading: true,
//   error: ''
// }

// const reducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true }
//     case 'FETCH_SUCCESS':
//       return { ...state, products: action.payload, loading: false }
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload }
//     default:
//       return state
//   }
// }

const Home: React.FC<HomeInterface> = () => {
  const { mode, updateMode, cart } = useContext(ThemeContext);
  const handleOnClick = () => {
    updateMode(mode === 'dark' ? 'light' : 'dark');
  }
    // const [{ loading, error, products }, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);
  const { data: products, isLoading, error } = useGetProductsQuery();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: 'FETCH_REQUEST' });
  //     try {
  //       const result = await axios.get('/api/products')
  //       dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
  //     } catch (error) {
  //       dispatch({ type: 'FETCH_FAIL', payload: getError(error as ApiError) });
  //     }
  //   }
    
  //   fetchData();
  // }, [])

  return (
    isLoading ? <LoadingSpinner /> : error ? <h4>{getError(error as ApiError)}</h4> : (
      <>
        <header>
          <nav className={mode}>
            <div>
              <h1>Amazona</h1>
            </div>
            <div>
              <button onClick={handleOnClick}>Switch Mode</button>
              <Link to="/cart">
                Cart
                {
                  cart.cartItems.length > 0 && (
                    <span>
                      {
                        cart.cartItems.reduce((a,c) => a + c.quantity, 0)
                      }
                    </span>
                  )
                }
              </Link>
              <a href="/signin">Sing In</a>
            </div>
          </nav>
        </header>
        <main>
          <ul>
            <Helmet>{/* Si no sirve para nada: quitar react-helmet-async */}
              <title>TS Amazona</title>
            </Helmet>
            {
              products!.map(product => (
                <li key={product.slug}>
                  <ProductItem product={product} />
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
  )
}

export default Home