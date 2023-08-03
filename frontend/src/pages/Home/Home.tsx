import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Footer, LoadingSpinner, Navbar } from "@/components";
import { ProductItem } from "./components";
import { useGetFilterCountsQuery, useGetProductsQuery } from "@/hooks";
import { ApiError, FiltersInterface, Product } from "@/models";
import { getError, getLocalStorage, setLocalStorage } from "@/utilities";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import '@/styles/layouts/Home/Home.scss';

interface HomeInterface {}

interface FilterItem {
  _id: string;
  count: number;
}

interface PriceRangeItem extends FilterItem {
  price: {
    priceMin: string;
    priceMax: string;
  };
}

const emptyFilters: FiltersInterface = {
  category: "",
  size: "",
  color: "",
  priceMin: "",
  priceMax: "",
}

const Home: React.FC<HomeInterface> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<FiltersInterface>(getLocalStorage('filters') ? JSON.parse(getLocalStorage('filters')!) : emptyFilters);

  const handleFilterChange = (filterType: string, value: string) => {

    const newSelectedFilters = {
      ...selectedFilters,
      [filterType]: value,
    }

    setSelectedFilters(newSelectedFilters);

    setLocalStorage('filters', newSelectedFilters);
  };

  const { products, totalProducts, isLoading, error, refetch, hasNextPage, fetchNextPage } = useGetProductsQuery(selectedFilters) as {
    products: Product[],
    totalProducts: number,
    isLoading: boolean,
    error: any,
    refetch: any,
    hasNextPage: boolean,
    fetchNextPage: () => void
  };

  const { categories, colors, sizes, priceRanges, isLoading: filterCountsLoading, error: filterCountsError } = useGetFilterCountsQuery();

  useEffect(() => {
    refetch(selectedFilters);
  }, [selectedFilters]);

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
          <h2><Link to="/">Inicio</Link> / <Link to="/products">Productos</Link></h2>
          <form className="sub-navbar__search-box" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
            <input type="text" placeholder="BUSCAR" />
            <button type="submit" >
              <SearchOutlinedIcon sx={{ fontSize: 20 }} />
            </button>
          </form>
          <div id="sb-button" onClick={() => setOpen(true)}>
            <span>Filtrar</span>
            <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
          </div>
        </div>
        <main className="home-main">
          <article className={open ? "home__filters-container sb-active" : "home__filters-container"}>
            <section id="home-title-section">
              <div onClick={() => setOpen(false)}>
                <ArrowBackIosNewIcon sx={{ fontSize: 32.5 }} className='sb-backarrow-icon' />
                <h2>Filtros</h2>
              </div>
              <span>{totalProducts} resultados</span>
              <ul className="selected-filters-container">
                {selectedFilters.category && (
                  <li onClick={() => handleFilterChange("category", "")}>
                    <HighlightOffIcon sx={{ fontSize: 15 }}/>
                    <span>{selectedFilters.category}</span>
                  </li>
                )}
                {selectedFilters.size && (
                  <li onClick={() => handleFilterChange("size", "")}>
                    <HighlightOffIcon sx={{ fontSize: 15 }}/>
                    <span>{selectedFilters.size}</span>
                  </li>
                )}
                {selectedFilters.color && (
                  <li onClick={() => handleFilterChange("color", "")}>
                    <HighlightOffIcon sx={{ fontSize: 15 }}/>
                    <div id="color-selected">
                      <div style={{ backgroundColor: selectedFilters.color }}></div>
                    </div>
                  </li>
                )}
                {selectedFilters.priceMin && selectedFilters.priceMax && (
                  <li onClick={() => handleFilterChange("", "")}>
                    <HighlightOffIcon sx={{ fontSize: 15 }}/>
                    <span>{`$${selectedFilters.priceMin} - $${selectedFilters.priceMax}`}</span>
                  </li>
                )}
                {selectedFilters.priceMin && !selectedFilters.priceMax && (
                  <li onClick={() => handleFilterChange("priceMin", "")}>
                    <HighlightOffIcon sx={{ fontSize: 15 }}/>
                    <span>{`Desde $${selectedFilters.priceMin}`}</span>
                  </li>
                )}
                {!selectedFilters.priceMin && selectedFilters.priceMax && (
                  <li onClick={() => handleFilterChange("priceMax", "")}>
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
                    <li key={category._id} onClick={() => handleFilterChange("category", category._id)}>
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
                    <li key={size._id} onClick={() => handleFilterChange("size", size._id)}>
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
                    <li key={color._id} onClick={() => handleFilterChange("color", color._id)}>
                      <div style={{ backgroundColor: color._id }}></div>
                    </li>
                  ))
                }
              </ul>
            </section>
            <div className="home-separator"></div>
            <section id="home-price-section">
              <h4>Precio</h4>
              <ul>
                {
                  priceRanges.map((priceRange: PriceRangeItem) => (
                    <li key={priceRange._id} onClick={()=> {
                      handleFilterChange("priceMin", priceRange.price.priceMin);
                      handleFilterChange("priceMax", priceRange.price.priceMax);
                    }}>
                      {`${priceRange._id} (${priceRange.count})`}
                    </li>
                  ))
                }
              </ul>
              <div>
                <input type="number" placeholder="Min" onChange={(e) => handleFilterChange("priceMin", e.target.value)} />
                <span>-</span>
                <input type="number" placeholder="Max" onChange={(e) => handleFilterChange("priceMax", e.target.value)} />
              </div>
            </section>
          </article>
          <article className={open ? "home__products-container sb-active" : "home__products-container"}>
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
                      products.map((product: Product) => <ProductItem product={product} />)
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