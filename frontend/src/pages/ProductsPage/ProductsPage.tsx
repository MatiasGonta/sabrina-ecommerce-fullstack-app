import { Navbar } from "@/components";
import { Footer, PurchaseInfoBanner } from '@/components/ui';
import { Catalog, Filtersboard, ProductSearchBar } from "./components";
import { FiltersInterface, Routes } from "@/models";
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { FiltersProvider } from './context';
import '@/styles/pages/ProductsPage/ProductsPage.scss';

interface ProductsPageInterface { }

const ProductsPage: React.FC<ProductsPageInterface> = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const initialSelectedFilters: FiltersInterface = {
    category: queryParams.getAll('category').flatMap(value => value.split('|')),
    brand: queryParams.getAll('brand').flatMap(value => value.split('|')),
    color: queryParams.getAll('color').flatMap(value => value.split('|')),
    size: queryParams.getAll('size').flatMap(value => value.split('|')),
    priceMin: queryParams.get('priceMin'),
    priceMax: queryParams.get('priceMax'),
    q: queryParams.get('q'),
  };

  return (
    <FiltersProvider defaultValue={initialSelectedFilters}>
      <Navbar />
      <Helmet>
        <title>Productos - SABRINA</title>
      </Helmet>

      <div className='sub-navbar'>
        <h2 className="sub-navbar__route-path"><Link to={Routes.HOME}>Inicio</Link> / Productos</h2>
        <ProductSearchBar />
      </div>

      <main className="main--products-page">
        <Filtersboard />

        <Catalog />
        <section className="products-page-purchase-path">
          <article>
            <PurchaseInfoBanner />
          </article>
        </section>
      </main >
      <Footer />
    </FiltersProvider>
  )
}

export default ProductsPage