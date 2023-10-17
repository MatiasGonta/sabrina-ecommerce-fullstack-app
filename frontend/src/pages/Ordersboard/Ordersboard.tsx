import { Navbar, Sidebar, Footer, OrderTable } from "@/components";
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
      <main className="ordersboard admin">
        <Sidebar page="ordersboard" />
        <article className="ordersboard__control-panel">
          <h2>Pedidos</h2>
          <section>
            <OrderTable itemsPerPage={10} type="admin" />
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}

export default Ordersboard