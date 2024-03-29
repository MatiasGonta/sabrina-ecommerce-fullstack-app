import AddIcon from '@mui/icons-material/Add';
import { Navbar, Sidebar } from "@/components"
import { Footer } from '@/components/ui';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { Routes } from '@/models';
import { ProductTable } from './components';
import '@/styles/pages/Productsboard/Productsboard.scss';
import { Typography } from '@mui/material';

interface ProductsboardInterface { }

const Productsboard: React.FC<ProductsboardInterface> = () => {
  return (
    <>
      <Helmet>
        <title>Panel de Productos - SABRINA</title>
      </Helmet>

      <Navbar />

      <main className="productsboard main--admin">

        <Sidebar />

        <section className="productsboard__statistics">
          <div className="productsboard__header">
            <Typography fontSize={24} mb="25px" fontWeight="bold" component="h2" noWrap={false}>
              Productos
            </Typography>
            <Link className="productsboard__header__link" to={Routes.DASHBOARD_PRODUCTS_CREATE}>
              <AddIcon sx={{ fontSize: 25 }} />
              <span>Crear producto</span>
            </Link>
          </div>

          <article className="productsboard__statistics__wrapper">
            <ProductTable />
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Productsboard