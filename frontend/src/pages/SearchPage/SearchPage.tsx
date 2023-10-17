import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Footer, LoadingSpinner, Navbar, ProductItem } from '@/components';
import { ApiError, Product } from '@/models';
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
      navigate(`/search?q=${searchTerm}`);
    };
    
    useEffect(() => {
      setSearchTerm(searchParam);
      refetch();
    }, [searchParam]);
    
  return isLoading
    ? <LoadingSpinner type="noflex" /> : error
    ? <h4>Error: {getError(error as ApiError)}</h4> : (
    <>
        <Navbar />
        <Helmet>
          <title>{searchTerm} - SABRINA</title>
        </Helmet>
        <div className='sub-navbar'>
          <h2><Link to="/">Inicio</Link> / Resultados de Búsqueda </h2>
          <form className="sub-navbar__search-box" onSubmit={(e) => handleSearchSubmit(e)}>
            <input type="text" placeholder="BUSCAR" onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit" >
              <SearchOutlinedIcon sx={{ fontSize: 20 }} />
            </button>
          </form>
        </div>
        <main className="search-main">
            <article className="search__products-container">
                <InfiniteScroll
                  dataLength={searchProducts.length}
                  hasMore={hasNextPage}
                  next={()=> fetchNextPage()}
                  loader={<LoadingSpinner type='flex'/>}
                >
                  {
                    totalSearchProducts !== 0
                    ? (
                      <ul>
                        {
                          searchProducts.map((product: Product) => <ProductItem product={product} />)
                        }
                      </ul>
                    ) : <h5>No se encontraron productos</h5>
                  }
                </InfiniteScroll>
            </article>
        </main>
        <Footer />
    </>
  )
}

export default SearchPage