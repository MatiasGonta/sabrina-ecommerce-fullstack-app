import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Footer, LoadingSpinner, Navbar, ProductItem } from "@/components";
import { useGetProductsQuery } from "@/hooks";
import { ApiError } from "@/models";
import { getError } from "@/utilities";
import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import '@/styles/Home.scss';
import { Link } from 'react-router-dom';

interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [showMoreSizes, setShowMoreSizes] = useState<boolean>(false);

  // Obtain all unique colors
  const allColors: string[] = products ? products.reduce<string[]>((acc, product) => [...acc, ...product.colors], []) : [];
  const allUniqueColors: Set<string> = new Set(allColors);
  const allUniqueColorsArray: string[] = [...allUniqueColors];

  interface FiltersInterface {
    category: string;
    size: string;
    color: string;
    priceMin: string;
    priceMax: string;
  }

  const emptyFiltersValue: FiltersInterface = {
    category: "",
    size: "",
    color: "",
    priceMin: "",
    priceMax: "",
  };
  
  const [filters, setFilters] = useState<FiltersInterface>(emptyFiltersValue);

  const handleCategoryChange = (category: string) => {
    setFilters({ ...filters, category });
  };
  
  const handleSizeChange = (size: string) => {
    setFilters({ ...filters, size });
  };
  
  const handleColorChange = (color: string) => {
    setFilters({ ...filters, color });
  };
  
  const handlePriceChange = (min: string, max: string) => {
    setFilters({ ...filters, priceMin: min, priceMax: max });
  };a

  const filteredProducts = products?.filter((product) => {
    // Filtrar por categoría
    if (filters.category && product.category !== filters.category) {
      return false;
    }
  
    // Filtrar por talla
    if (filters.size && !product.sizes.includes(filters.size)) {
      return false;
    }
  
    // Filtrar por color
    if (filters.color && !product.colors.includes(filters.color)) {
      return false;
    }
  
    // Filtrar por precio
    if (
      (filters.priceMin && product.price < parseFloat(filters.priceMin)) ||
      (filters.priceMax && product.price > parseFloat(filters.priceMax))
    ) {
      return false;
    }
  
    return true;
  });

  return (
    isLoading ? <LoadingSpinner /> : error ? <h4>{getError(error as ApiError)}</h4> : (
      <>
        <Navbar />
        <div className='sub-navbar'>
          <h2 className="navigation-path"><Link to="/">Inicio</Link> / <Link to="/products">Productos</Link></h2>
          <ul className="filters-container">
            {
              filters.category !== '' && <li onClick={() => handleCategoryChange('')}>{filters.category}</li>
            }
            {
              filters.color !== '' && <li onClick={() => handleColorChange('')}>{filters.color}</li>
            }
            {
              filters.size !== '' && <li onClick={() => handleSizeChange('')}>{filters.size}</li>
            }
            {
              filters.priceMin !== '' && <li onClick={() => handlePriceChange('', filters.priceMax)}>{filters.priceMin}</li>
            }
            {
              filters.priceMax !== '' && <li onClick={() => handlePriceChange(filters.priceMin, '')}>{filters.priceMax}</li>
            }
          </ul>
        </div>
        <main className="home-main">
          <article className="home-filters-container">
            <section id="home-title-section">
              <h2 onClick={() => setFilters(emptyFiltersValue)}>Filtros</h2>
              <span>{filteredProducts!.length} resultados</span>
            </section>
            <section id="home-category-section">
              <h4>Categoría</h4>
              <ul>
                <li onClick={() => handleCategoryChange('Shirts')}>Remeras (34)</li>
                <li onClick={() => handleCategoryChange('Buzos')}>Buzos (42)</li>
                <li onClick={() => handleCategoryChange('Pants')}>Pantalones (56)</li>
                <li onClick={() => handleCategoryChange('Access')}>Accesorios (18)</li>
                <li onClick={() => handleCategoryChange('Camperas')}>Camperas (12)</li>
              </ul>
            </section>
            <div className="home-separator"></div>
            <section id="home-size-section">
              <h4>Talle</h4>
              <ul>
                <li onClick={() => handleSizeChange('16 años')}>16 años (23)</li>
                <li onClick={() => handleSizeChange('XS')}>XS (12)</li>
                <li onClick={() => handleSizeChange('S')}>S (15)</li>
                <li onClick={() => handleSizeChange('M')}>M (18)</li>
                <li onClick={() => handleSizeChange('L')}>L (11)</li>
                <li onClick={() => handleSizeChange('XL')}>XL (12)</li>
                <li onClick={() => handleSizeChange('2XL')}>2XL (8)</li>
                <li onClick={() => handleSizeChange('3XL')}>3XL (3)</li>
                <li onClick={() => handleSizeChange('4XL')}>4XL (6)</li>
              </ul>
              {
                showMoreSizes ? (
                    <>
                      <ul>
                        <li onClick={() => handleSizeChange('16 años')}>16 años (23)</li>
                        <li onClick={() => handleSizeChange('XS')}>XS (12)</li>
                        <li onClick={() => handleSizeChange('S')}>S (15)</li>
                        <li onClick={() => handleSizeChange('M')}>M (18)</li>
                        <li onClick={() => handleSizeChange('L')}>L (11)</li>
                        <li onClick={() => handleSizeChange('XL')}>XL (12)</li>
                        <li onClick={() => handleSizeChange('2XL')}>2XL (8)</li>
                        <li onClick={() => handleSizeChange('3XL')}>3XL (3)</li>
                        <li onClick={() => handleSizeChange('4XL')}>4XL (6)</li>
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
                  allUniqueColorsArray.map(color => (
                    <li key={color} onClick={() => handleColorChange(color)}>
                      <div style={{ backgroundColor: color }}></div>
                    </li>
                  ))
                }
              </ul>
            </section>
            <div className="home-separator"></div>
            <section id="home-price-section">
              <h4>Precio</h4>
              <ul>
                <li>Hasta $5.000 (5)</li>
                <li>$5.000 a $7.500 (12)</li>
                <li>Más de $7.500 (24)</li>
              </ul>
              <div>
                <input type="number" placeholder="Min" onChange={(e) => handlePriceChange(e.target.value, filters.priceMax)} value={filters.priceMin} />
                <span>-</span>
                <input type="number" placeholder="Max" onChange={(e) => handlePriceChange(filters.priceMin, e.target.value)} value={filters.priceMax} />
                <button><ArrowForwardIosIcon sx={{ fontSize: 10 }} /></button>
              </div>
            </section>
          </article>
          <article className="home-products-container">
            <ul>
              <Helmet>
                <title>F y M Indumentaria</title>
              </Helmet>
              {
                filteredProducts!.map(product => (
                  <li key={product.slug}>
                    <ProductItem product={product} />
                  </li>
                ))
              }
            </ul>
          </article>
        </main>
        <Footer />
      </>
    )
  )
}

export default Home