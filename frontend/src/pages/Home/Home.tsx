import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Footer, LoadingSpinner, Navbar, ProductItem } from "@/components";
import { useGetFilterCountsQuery, useGetProductsQuery } from "@/hooks";
import { ApiError, FiltersInterface, Product } from "@/models";
import { getError, getLocalStorage, setLocalStorage } from "@/utilities";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import '@/styles/Home.scss';

interface HomeInterface {}

const emptyFilters: FiltersInterface = {
  category: "",
  size: "",
  color: "",
  priceMin: "",
  priceMax: "",
}

const Home: React.FC<HomeInterface> = () => {
  const [selectedFilters, setSelectedFilters] = useState<FiltersInterface>(getLocalStorage('filters') ? JSON.parse(getLocalStorage('filters')) : emptyFilters);

  const handleFilterChange = (filterType: string, value: string) => {

    const newSelectedFilters = {
      ...selectedFilters,
      [filterType]: value,
    }

    setSelectedFilters(newSelectedFilters);

    setLocalStorage('filters', newSelectedFilters);
  };

  const { products, data, isLoading, error, refetch, hasNextPage, fetchNextPage } = useGetProductsQuery(selectedFilters) as {
    products: Product[],
    data: any,
    isLoading: boolean,
    error: any,
    refetch: any,
    hasNextPage: boolean,
    fetchNextPage: () => void
  };

  const hasMore: boolean = hasNextPage ? hasNextPage : false;

  const { data: filterCountsData, isLoading: filterCountsLoading, error: filterCountsError } = useGetFilterCountsQuery();
  
  const [showMoreSizes, setShowMoreSizes] = useState<boolean>(false);

  useEffect(() => {
    refetch(selectedFilters);
  }, [selectedFilters]);

  return (
    isLoading || filterCountsLoading ? <LoadingSpinner /> : error ? <h4>{getError(error as ApiError)}</h4> : (
      <>
        <Navbar />
        <Helmet>
          <title>F y M Indumentaria</title>
        </Helmet>
        <div className='sub-navbar'>
          <h2 className="navigation-path"><Link to="/">Inicio</Link> / <Link to="/products">Productos</Link></h2>
          <ul className="filters-container">
            {selectedFilters.category && (
              <li onClick={() => handleFilterChange("category", "")}>
                {selectedFilters.category}
              </li>
            )}
            {selectedFilters.size && (
              <li onClick={() => handleFilterChange("size", "")}>
                {selectedFilters.size}
              </li>
            )}
            {selectedFilters.color && (
              <li onClick={() => handleFilterChange("color", "")}>
                <div style={{ backgroundColor: selectedFilters.color }}></div>
              </li>
            )}
            {selectedFilters.priceMin && selectedFilters.priceMax && (
              <li onClick={() => handleFilterChange("", "")}>{`$${selectedFilters.priceMin} - $${selectedFilters.priceMax}`}</li>
            )}
            {selectedFilters.priceMin && !selectedFilters.priceMax && (
              <li onClick={() => handleFilterChange("priceMin", "")}>{`Desde $${selectedFilters.priceMin}`}</li>
            )}
            {!selectedFilters.priceMin && selectedFilters.priceMax && (
              <li onClick={() => handleFilterChange("priceMax", "")}>{`Hasta $${selectedFilters.priceMax}`}</li>
            )}
          </ul>
        </div>
        <main className="home-main">
          <article className="home-filters-container">
            <section id="home-title-section">
              <h2>Filtros</h2>
              <span>{data?.pages[0].totalDocs} resultados</span>
            </section>
            <section id="home-category-section">
              <h4>Categoría</h4>
              <ul>
                {
                  filterCountsData.categories.map((category: any) => (
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
                  filterCountsData.sizes.map((size: any) => (
                    <li key={size._id} onClick={() => handleFilterChange("size", size._id)}>
                      {`${size._id} (${size.count})`}
                    </li>
                  ))
                }
              </ul>
              {
                showMoreSizes ? (
                    <>
                      <ul>
                        <li>16 años (23)</li>
                        <li>XS (12)</li>
                        <li>S (15)</li>
                        <li>M (18)</li>
                        <li>L (11)</li>
                        <li>XL (12)</li>
                        <li>2XL (8)</li>
                        <li>3XL (3)</li>
                        <li>4XL (6)</li>
                      </ul>
                      <span onClick={() => setShowMoreSizes(!showMoreSizes)}>Mostrar menos</span>
                    </>
                  ) : (
                    <span onClick={() => setShowMoreSizes(!showMoreSizes)}>Mostrar más</span>
                  )
              }
            </section>
            <div className="home-separator"></div>
            <section id="home-color-section">
              <h4>Color</h4>
              <ul>
                {
                  filterCountsData.colors.map((color: any) => (
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
                  filterCountsData.priceRanges.map((priceRange: any) => (
                    <li key={priceRange.name} onClick={()=> {
                      handleFilterChange("priceMin", priceRange.price.priceMin);
                      handleFilterChange("priceMax", priceRange.price.priceMax);
                    }}>
                      {`${priceRange.name} (${priceRange.count})`}
                    </li>
                  ))
                }
              </ul>
              <div>
                <input type="number" placeholder="Min" onChange={(e) => handleFilterChange("priceMin", e.target.value)} />
                <span>-</span>
                <input type="number" placeholder="Max" onChange={(e) => handleFilterChange("priceMax", e.target.value)} />
                <button><ArrowForwardIosIcon sx={{ fontSize: 10 }} /></button>
              </div>
            </section>
          </article>
          <article className="home-products-container">
            <InfiniteScroll
              dataLength={products.length}
              hasMore={hasMore}
              next={()=> fetchNextPage()}
              loader={<h4>Loading...</h4>}
            >
              {
                data?.pages[0].totalDocs !== 0 ? (
                  <ul>
                    {
                      products.map((product: Product) => (
                        <li key={product.slug}>
                          <ProductItem product={product} />
                        </li>
                      ))
                    }
                  </ul>
                ) : <h5>No hay productos</h5>
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