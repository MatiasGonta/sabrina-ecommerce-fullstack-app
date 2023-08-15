import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Footer, LoadingSpinner, Navbar, ProductItem } from "@/components";
import { ProductSearchBar } from "./components";
import { useGetFilterCountsQuery, useGetProductsQuery } from "@/hooks";
import { ApiError, FiltersInterface, FilterItem, Product, Colors } from "@/models";
import { getError, filterParamsUrlGenerator } from "@/utilities";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import '@/styles/layouts/Home/Home.scss';
import { Tooltip } from '@mui/material';

type PriceRange = {
  minPrice: string;
  maxPrice: string;
}

const emptyPriceRange: PriceRange = {
  minPrice: '',
  maxPrice: ''
}

interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const initialSelectedFilters: FiltersInterface = {
    category: queryParams.getAll('category').flatMap(value => value.split('|')),
    color: queryParams.getAll('color').flatMap(value => value.split('|')),
    size: queryParams.getAll('size').flatMap(value => value.split('|')),
    priceMin: queryParams.get('priceMin'),
    priceMax: queryParams.get('priceMax'),
  };

  useEffect(() => {
    const handlePopstate = () => {
      const queryParams = new URLSearchParams(location.search);
      const updatedSelectedFilters: FiltersInterface = {
        category: queryParams.getAll('category').flatMap(value => value.split('|')),
        color: queryParams.getAll('color').flatMap(value => value.split('|')),
        size: queryParams.getAll('size').flatMap(value => value.split('|')),
        priceMin: queryParams.get('priceMin'),
        priceMax: queryParams.get('priceMax'),
      };
      setSelectedFilters(updatedSelectedFilters);
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  const [selectedFilters, setSelectedFilters] = useState<FiltersInterface>(initialSelectedFilters);

  // Filters sidebar status
  const [open, setOpen] = useState<boolean>(false);

  // Add and remove filter handlers
  const handleAddFilter = (filterType: keyof FiltersInterface, value: string) => {
    if (filterType === 'priceMin' || filterType === 'priceMax') {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: value,
      }));
    } else {
      if (!selectedFilters[filterType]!.includes(value)) {
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          [filterType]: [...prevFilters[filterType]!, value],
        }));
      }
    }
  }

  const handleRemoveFilter = (filterType: keyof FiltersInterface, filterIndex?: string) => {
    if (filterType === 'priceMin' || filterType === 'priceMax' && !filterIndex) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: null,
      }));
    } else {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: prevFilters[filterType]!.filter((item: string) => item !== filterIndex),
      }));
    }
  }

  // Price Ranges Filter
  const [priceRange, setPriceRange] = useState<PriceRange>(emptyPriceRange);

  const handlePriceRangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddFilter('priceMin', priceRange.minPrice);
    handleAddFilter('priceMax', priceRange.maxPrice);
  }

  // Getting products
  const { products, totalProducts, isLoading, error, refetch, hasNextPage, fetchNextPage } = useGetProductsQuery(selectedFilters);

  useEffect(() => {
    const newQueryParams = filterParamsUrlGenerator(selectedFilters);

    navigate(`/?${newQueryParams}`);
    refetch();
  }, [selectedFilters]);

  // Getting filters
  const { categories, colors, sizes, isLoading: filterCountsLoading, error: filterCountsError } = useGetFilterCountsQuery();

  return (
    isLoading || filterCountsLoading
    ? <LoadingSpinner type='noflex'/> : error || filterCountsError
    ? <h4>{getError(error as ApiError)}</h4> : (
      <>
        <Navbar />
        <Helmet>
          <title>F y M Indumentaria</title>
        </Helmet>
        <div className='sub-navbar'>
          <h2><Link to="/">Inicio</Link> / Productos</h2>
          <ProductSearchBar />
          <div id="sb-button" onClick={() => setOpen(true)}>
            <span>Filtrar</span>
            <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
          </div>
        </div>
        <main className="home-main">
          <article className={open ? "home__filters-container sb-open" : "home__filters-container"}>
            <section id="home-title-section">
              <div onClick={() => setOpen(false)}>
                <ArrowBackIosNewIcon sx={{ fontSize: 32.5 }} className='sb-backarrow-icon' />
                <h2>Filtros</h2>
              </div>
              <span>{totalProducts} resultados</span>
              <ul className="selected-filters-container">
                {selectedFilters.category && selectedFilters.category.map((c)=> (
                  <li key={c} onClick={() => handleRemoveFilter('category', c)}>
                    <HighlightOffIcon sx={{ fontSize: 15 }}/>
                    <span>{c}</span>
                  </li>
                ))}
                {selectedFilters.size && selectedFilters.size.map((s)=> (
                  <li key={s} onClick={() => handleRemoveFilter('size', s)}>
                    <HighlightOffIcon sx={{ fontSize: 15 }}/>
                    <span>{s}</span>
                  </li>
                ))}
                {selectedFilters.color && selectedFilters.color.map((c)=> (
                  <li key={c} onClick={() => handleRemoveFilter('color', c)}>
                    <HighlightOffIcon sx={{ fontSize: 15 }}/>
                    <div className="color-selected">
                      <div style={{ backgroundColor: Colors[c as keyof typeof Colors] }}></div>
                    </div>
                  </li>
                ))}
                {selectedFilters.priceMin && selectedFilters.priceMax && (
                  <li key={`${selectedFilters.priceMin}-${selectedFilters.priceMax}`} onClick={() => {
                    handleRemoveFilter('priceMin')
                    handleRemoveFilter('priceMax')
                  }}>
                    <HighlightOffIcon sx={{ fontSize: 15 }}/>
                    <span>{`Entre $${selectedFilters.priceMin} - $${selectedFilters.priceMax}`}</span>
                  </li>
                )}
                {selectedFilters.priceMin && !selectedFilters.priceMax && (
                  <li key={selectedFilters.priceMin} onClick={() => handleRemoveFilter('priceMin')}>
                    <HighlightOffIcon sx={{ fontSize: 15 }}/>
                    <span>{`Desde $${selectedFilters.priceMin}`}</span>
                  </li>
                )}
                {!selectedFilters.priceMin && selectedFilters.priceMax && (
                  <li key={selectedFilters.priceMax} onClick={() => handleRemoveFilter('priceMax')}>
                    <HighlightOffIcon sx={{ fontSize: 15 }}/>
                    <span>{`Hasta $${selectedFilters.priceMax}`}</span>
                  </li>
                )}
              </ul>
            </section>
            <section id="home-category-section">
              <h4>Categoría</h4>
              <ul>
                {
                  categories.map((category: FilterItem) => (
                    <li key={category._id} onClick={() => handleAddFilter('category', category._id)}>
                      {`${category._id} (${category.count})`}
                    </li>
                  ))
                }
              </ul>
            </section>
            <div className="home-separator"></div>
            <section id="home-size-section">
              <h4>Talle</h4>
              <ul>
                {
                  sizes.map((size: FilterItem) => (
                    <li key={size._id} onClick={() => handleAddFilter('size', size._id)}>
                      {`${size._id} (${size.count})`}
                    </li>
                  ))
                }
              </ul>
            </section>
            <div className="home-separator"></div>
            <section id="home-color-section">
              <h4>Color</h4>
              <ul>
                {
                  colors.map((color: FilterItem) => (
                    <li key={color._id} onClick={() => handleAddFilter('color', color._id)}>
                      <Tooltip title={color._id}>
                        <div style={{ backgroundColor: Colors[color._id as keyof typeof Colors] }}></div>
                      </Tooltip>
                    </li>
                  ))
                }
              </ul>
            </section>
            <div className="home-separator"></div>
            <section id="home-price-section">
              <h4>Precio</h4>
              <form onSubmit={(e) => handlePriceRangeSubmit(e)}>
                <input type="number" placeholder="Mínimo" onChange={(e) => setPriceRange({ ...priceRange, minPrice: e.target.value})} />
                <span>-</span>
                <input type="number" placeholder="Máximo" onChange={(e) => setPriceRange({ ...priceRange, maxPrice: e.target.value})} />
                <button type='submit'>
                  <Tooltip title="Aplicar">
                    <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
                  </Tooltip>
                </button>
              </form>
            </section>
          </article>
          <article className={open ? "home__products-container sb-open" : "home__products-container"}>
            <InfiniteScroll
              dataLength={products.length}
              hasMore={hasNextPage}
              next={()=> fetchNextPage()}
              loader={<LoadingSpinner type='flex'/>}
            >
              {
                totalProducts !== 0
                ? (
                  <ul>
                    {
                      products.map((product: Product) => <ProductItem key={product.slug} product={product} />)
                    }
                  </ul>
                ) : <h5>No hay productos que cumplan con los requisitos</h5>
              }
            </InfiniteScroll>
          </article>
        </main>
        <Footer />
      </>
    )
  )
}

export default Home