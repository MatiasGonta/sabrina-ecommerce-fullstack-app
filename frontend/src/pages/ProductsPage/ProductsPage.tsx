import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Footer, LoadingSpinner, Navbar, ProductItem, PurchaseInfoBanner } from "@/components";
import { ProductSearchBar } from "./components";
import { useGetFilterCountsQuery, useGetProductsCatalogQuery } from "@/hooks";
import { ApiError, FiltersInterface, FilterItem, Product, COLORS, Routes, LoadingSpinnerType } from "@/models";
import { getError, filterParamsUrlGenerator } from "@/utilities";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import '@/styles/pages/ProductsPage/ProductsPage.scss';
import { ProductsListWrapper } from '@/components/ui';

type PriceRange = {
  minPrice: string;
  maxPrice: string;
}

const emptyPriceRange: PriceRange = {
  minPrice: '',
  maxPrice: ''
}

interface ProductsPageInterface { }

const ProductsPage: React.FC<ProductsPageInterface> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const initialSelectedFilters: FiltersInterface = {
    category: queryParams.getAll('category').flatMap(value => value.split('|')),
    brand: queryParams.getAll('brand').flatMap(value => value.split('|')),
    color: queryParams.getAll('color').flatMap(value => value.split('|')),
    size: queryParams.getAll('size').flatMap(value => value.split('|')),
    priceMin: queryParams.get('priceMin'),
    priceMax: queryParams.get('priceMax'),
  };

  const [selectedFilters, setSelectedFilters] = useState<FiltersInterface>(initialSelectedFilters);

  // Brands
  const [visibleBrands, setVisibleBrands] = useState(7);

  const handleShowMoreBrands = (length: number) => {
    setVisibleBrands(length);
  };

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
    if (filterType !== 'priceMin' && filterType !== 'priceMax' && filterIndex) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: prevFilters[filterType]!.filter((item: string) => item !== filterIndex),
      }));
    } else {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: null,
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
  const { products, totalProducts, isLoading, error, refetch, hasNextPage, fetchNextPage } = useGetProductsCatalogQuery(selectedFilters);

  useEffect(() => {
    const newQueryParams = filterParamsUrlGenerator(selectedFilters);

    refetch();
    navigate(`${Routes.PRODUCTS}/?${newQueryParams}`);
  }, [selectedFilters]);

  // Getting filters
  const { categories, brands, colors, sizes, isLoading: filterCountsLoading, error: filterCountsError } = useGetFilterCountsQuery();

  return (
    isLoading || filterCountsLoading
      ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX} /> : error || filterCountsError
        ? <h4>{getError(error as ApiError)}</h4> : (
          <>
            <Navbar />
            <Helmet>
              <title>Productos - SABRINA</title>
            </Helmet>
            
            <div className='sub-navbar'>
              <h2 className="sub-navbar__route-path"><Link to={Routes.HOME}>Inicio</Link> / Productos</h2>
              <ProductSearchBar products={products} />
              <div className="sub-navbar__filters-btn" onClick={() => setOpen(true)}>
                <span>Filtrar</span>
                <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
              </div>
            </div>

            <main className="main--products-page">
              <aside className={`filters-wrapper ${open && "sb-open"}`}>
                <article className="filters-wrapper__head">
                  <div onClick={() => setOpen(false)}>
                    <ArrowBackIosNewIcon sx={{ fontSize: 32.5 }} />
                    <h2>Filtros</h2>
                  </div>
                  <span>{totalProducts} resultados</span>

                  <ul className="filters-wrapper__head__list">
                    {selectedFilters.category && selectedFilters.category.map((c) => (
                      <li className="filters-wrapper__head__list__selected-filter" key={c} onClick={() => handleRemoveFilter('category', c)}>
                        <HighlightOffIcon sx={{ fontSize: 15 }} />
                        <span>{c}</span>
                      </li>
                    ))}
                    {selectedFilters.brand && selectedFilters.brand.map((b) => (
                      <li className="filters-wrapper__head__list__selected-filter" key={b} onClick={() => handleRemoveFilter('brand', b)}>
                        <HighlightOffIcon sx={{ fontSize: 15 }} />
                        <span>{b}</span>
                      </li>
                    ))}
                    {selectedFilters.size && selectedFilters.size.map((s) => (
                      <li className="filters-wrapper__head__list__selected-filter" key={s} onClick={() => handleRemoveFilter('size', s)}>
                        <HighlightOffIcon sx={{ fontSize: 15 }} />
                        <span>{s}</span>
                      </li>
                    ))}
                    {selectedFilters.color && selectedFilters.color.map((c) => (
                      <li className="filters-wrapper__head__list__selected-filter" key={c} onClick={() => handleRemoveFilter('color', c)}>
                        <HighlightOffIcon sx={{ fontSize: 15 }} />
                        <div className="color-selected">
                          <div style={{ backgroundColor: COLORS[c as keyof typeof COLORS] }}></div>
                        </div>
                      </li>
                    ))}
                    {selectedFilters.priceMin && selectedFilters.priceMax && (
                      <li className="filters-wrapper__head__list__selected-filter" key={`${selectedFilters.priceMin}-${selectedFilters.priceMax}`} onClick={() => {
                        handleRemoveFilter('priceMin')
                        handleRemoveFilter('priceMax')
                      }}>
                        <HighlightOffIcon sx={{ fontSize: 15 }} />
                        <span>{`Entre $${selectedFilters.priceMin} - $${selectedFilters.priceMax}`}</span>
                      </li>
                    )}
                    {selectedFilters.priceMin && !selectedFilters.priceMax && (
                      <li className="filters-wrapper__head__list__selected-filter" key={selectedFilters.priceMin} onClick={() => handleRemoveFilter('priceMin')}>
                        <HighlightOffIcon sx={{ fontSize: 15 }} />
                        <span>{`Desde $${selectedFilters.priceMin}`}</span>
                      </li>
                    )}
                    {!selectedFilters.priceMin && selectedFilters.priceMax && (
                      <li className="filters-wrapper__head__list__selected-filter" key={selectedFilters.priceMax} onClick={() => handleRemoveFilter('priceMax')}>
                        <HighlightOffIcon sx={{ fontSize: 15 }} />
                        <span>{`Hasta $${selectedFilters.priceMax}`}</span>
                      </li>
                    )}
                  </ul>
                </article>
                <article className="filters-wrapper__category">
                  <h4 className="filters-wrapper__category__title">Categoría</h4>
                  <ul className="filters-wrapper__category__list">
                    {
                      categories.map((category: FilterItem) => (
                        <li key={category._id}>
                          <span onClick={() => handleAddFilter('category', category._id)}>{`${category._id} (${category.count})`}</span>
                        </li>
                      ))
                    }
                  </ul>
                </article>
                <article className="filters-wrapper__size">
                  <h4 className="filters-wrapper__size__title">Talle</h4>
                  <ul className="filters-wrapper__size__list">
                    {
                      sizes.map((size: FilterItem) => (
                        <li key={size._id}>
                          <span onClick={() => handleAddFilter('size', size._id)}>{`${size._id} (${size.count})`}</span>
                        </li>
                      ))
                    }
                  </ul>
                </article>
                <article className="filters-wrapper__color">
                  <h4 className="filters-wrapper__color__title">Color</h4>
                  <ul className="filters-wrapper__color__list">
                    {
                      colors.map((color: FilterItem) => (
                        <li
                          key={color._id}
                          className="filters-wrapper__color__list__color-filter"
                          onClick={() => handleAddFilter('color', color._id)}
                        >
                          <Tooltip title={color._id}>
                            <div className="filters-wrapper__color__list__color-filter__square" style={{ backgroundColor: COLORS[color._id as keyof typeof COLORS] }}></div>
                          </Tooltip>
                        </li>
                      ))
                    }
                  </ul>
                </article>
                <article className="filters-wrapper__brand">
                  <h4 className="filters-wrapper__brand__title">Marca</h4>
                  <ul className="filters-wrapper__brand__list">
                    {brands.slice(0, visibleBrands).map((brand: FilterItem) => (
                      <li key={brand._id}>
                        <span onClick={() => handleAddFilter('brand', brand._id)}>{`${brand._id} (${brand.count})`}</span>
                      </li>
                    ))}
                  </ul>
                  {
                    brands.length > 7 && (
                      brands.length > 7 && visibleBrands !== brands.length
                        ? (
                          <button className="filters-wrapper__brand__btn" onClick={() => handleShowMoreBrands(brands.length)}>Ver más</button>
                        )
                        : (
                          <button className="filters-wrapper__brand__btn" onClick={() => handleShowMoreBrands(7)}>Ver menos</button>
                        )
                    )
                  }
                </article>
                <article className="filters-wrapper__price">
                  <h4 className="filters-wrapper__price__title">Precio</h4>
                  <form className="filters-wrapper__price__form" onSubmit={(e) => handlePriceRangeSubmit(e)}>
                    <input
                      className="filters-wrapper__price__form__input-min"
                      type="number"
                      placeholder="Mínimo"
                      onChange={(e) => setPriceRange({ ...priceRange, minPrice: e.target.value })}
                    />
                    <span>-</span>
                    <input
                      className="filters-wrapper__price__form__input-max"
                      type="number"
                      placeholder="Máximo"
                      onChange={(e) => setPriceRange({ ...priceRange, maxPrice: e.target.value })}
                    />
                    <button className="filters-wrapper__price__form__btn" type='submit'>
                      <Tooltip title="Aplicar">
                        <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
                      </Tooltip>
                    </button>
                  </form>
                </article>
              </aside>

              <section className={`products-catalog ${open && "sb-open"}`}>
                <InfiniteScroll
                  dataLength={products.length}
                  hasMore={hasNextPage}
                  next={() => fetchNextPage()}
                  loader={<LoadingSpinner type={LoadingSpinnerType.FLEX} />}
                >
                  <ProductsListWrapper isEmpty={totalProducts !== 0}>
                    {
                      products.map((product: Product, index: number) => <ProductItem key={index} product={product} />)
                    }
                  </ProductsListWrapper>
                </InfiniteScroll>
              </section>
              <section className="products-page-purchase-path">
                <article>
                  <PurchaseInfoBanner />
                </article>
              </section>
            </main >
            <Footer />
          </>
        )
  )
}

export default ProductsPage