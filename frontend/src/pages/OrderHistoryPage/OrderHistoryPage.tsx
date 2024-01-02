import { Footer, Navbar, OrderTable } from "@/components";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Routes } from "@/models";
import '../../styles/pages/OrderHistoryPage/OrderHistoryPage.scss';

const OrderHistoryPage = () => {
  return (
    <>
        <Helmet>
            <title>Mis Compras - SABRINA</title>
        </Helmet>
        <Navbar />
        <div className='sub-navbar'>
            <h2><Link to={Routes.HOME}>Inicio</Link> / Compras</h2>
        </div>
        <main className="order-history-main">
            <article>
                <section>
                    <OrderTable itemsPerPage={10} type="default" user={true} />
                </section>
            </article>
        </main>
        <Footer />
    </>
  )
}

export default OrderHistoryPage