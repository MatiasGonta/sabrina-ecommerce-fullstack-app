import { Navbar, Sidebar, OrderTable } from "@/components";
import { Footer } from '@/components/ui';
import { Helmet } from "react-helmet-async";
import '@/styles/pages/Ordersboard/Ordersboard.scss';
import { Typography } from "@mui/material";

interface OrdersboardInterface { }

const Ordersboard: React.FC<OrdersboardInterface> = () => {
  return (
    <>
      <Helmet>
        <title>Panel de Pedidos - SABRINA</title>
      </Helmet>

      <Navbar />

      <main className="main--admin">
        <Sidebar />

        <section className="ordersboard__control-panel">
          <Typography fontSize={24} mb="25px" fontWeight="bold" component="h2" noWrap={false}>
            Pedidos
          </Typography>
          <article className="ordersboard__control-panel__orders">
            <OrderTable itemsPerPage={10} template="admin" />
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Ordersboard