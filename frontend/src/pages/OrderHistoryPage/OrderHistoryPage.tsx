import { Navbar, OrderTable } from "@/components";
import { Footer } from '@/components/ui';
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
            <h2 className="sub-navbar__route-path"><Link to={Routes.HOME}>Inicio</Link> / Compras</h2>
        </div>
        <main>
            <section>
                <article className="order-history-table">
                    <OrderTable itemsPerPage={10} type="default" user={true} />
                </article>
            </section>
        </main>
        <Footer />
    </>
  )
}

export default OrderHistoryPage