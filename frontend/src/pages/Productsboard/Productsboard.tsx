import AddIcon from '@mui/icons-material/Add';
import { Navbar, Sidebar, Footer } from "@/components"
import { ProductTable } from "./components";
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';
import '@/styles/pages/Productsboard/Productsboard.scss';

interface ProductsboardInterface { }

const Productsboard: React.FC<ProductsboardInterface> = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Panel de Productos - SABRINA</title>
      </Helmet>
      <Navbar />
      <main className="productsboard admin">
        <Sidebar page="productsboard" />
        <article className="productsboard__statistics">
          <div>
            <h2>Productos</h2>
            <button onClick={() => navigate('/dashboard/products/create-product')}>
              <AddIcon sx={{ fontSize: 25 }} />
              <span>Crear producto</span>
            </button>
          </div>
          <section>
            <ProductTable />
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}

export default Productsboard