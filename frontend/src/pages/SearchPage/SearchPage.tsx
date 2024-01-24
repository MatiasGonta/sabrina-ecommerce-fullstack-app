import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from '@mui/material/Tooltip';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, ProductItem } from '@/components';
import { LoadingSpinner, Footer } from '@/components/ui';
import { ApiError, LoadingSpinnerType, Product, Routes } from '@/models';
import { getError } from '@/utilities';
import { Helmet } from 'react-helmet-async';
import { useSearchProductsQuery } from '@/hooks';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '@/styles/pages/SearchPage/SearchPage.scss';

interface SearchPageInterface {}

const SearchPage: React.FC<SearchPageInterface> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('q') || '';

    const [searchTerm, setSearchTerm] = useState<string>(searchParam);

    const { searchProducts, totalSearchProducts, isLoading, error, refetch, hasNextPage, fetchNextPage } = useSearchProductsQuery(searchTerm);

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      navigate(`${Routes.SEARCH}?q=${searchTerm}`);
    };
    
    useEffect(() => {
      setSearchTerm(searchParam);
      refetch();
    }, [searchParam]);
    
  return isLoading
    ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX} /> : error
    ? <h4>Error: {getError(error as ApiError)}</h4> : (
    <>
        <Navbar />
        <Helmet>
          <title>{searchTerm} - SABRINA</title>
        </Helmet>
        <div className='sub-navbar'>
          <h2 className="sub-navbar__route-path"><Link to={Routes.HOME}>Inicio</Link> / Resultados de Búsqueda </h2>
          <form className="sub-navbar__search-bar" onSubmit={(e) => handleSearchSubmit(e)}>
            <input
              className="sub-navbar__search-bar__input"
              type="text"
              placeholder="BUSCAR"
              defaultValue={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="sub-navbar__search-bar__btn" type="submit">
              <Tooltip title="Buscar">
                <SearchOutlinedIcon sx={{ fontSize: 20 }} />
              </Tooltip>
            </button>
          </form>
        </div>

        <main className="main--search">
            <article className="search-products">
                <InfiniteScroll
                  dataLength={searchProducts.length}
                  hasMore={hasNextPage}
                  next={()=> fetchNextPage()}
                  loader={<LoadingSpinner type={LoadingSpinnerType.FLEX}/>}
                >
                  {
                    totalSearchProducts !== 0
                    ? (
                      <ul className="search-products__list">
                        {
                          searchProducts.map((product: Product) => <ProductItem product={product} />)
                        }
                      </ul>
                    ) : <h5 className="search-products__empty-msg">No se encontraron productos</h5>
                  }
                </InfiniteScroll>
            </article>
        </main>
        <Footer />
    </>
  )
}

export default SearchPage