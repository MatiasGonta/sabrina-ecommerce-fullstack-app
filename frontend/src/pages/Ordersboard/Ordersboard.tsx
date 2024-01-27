import { Navbar, Sidebar, OrderTable } from "@/components";
import { Footer } from '@/components/ui';
import { Helmet } from "react-helmet-async";
import '@/styles/pages/Ordersboard/Ordersboard.scss';

interface OrdersboardInterface {}

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
          <h2 className="ordersboard__control-panel__title">Pedidos</h2>
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