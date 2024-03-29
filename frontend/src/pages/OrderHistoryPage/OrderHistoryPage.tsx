import { Navbar, OrderTable } from "@/components";
import { Footer, SubNavbar } from '@/components/ui';
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

        <SubNavbar>
            <span>
                <Link to={Routes.HOME}>Inicio</Link> / Compras
            </span>
        </SubNavbar>

        <main>
            <section>
                <article className="order-history-table">
                    <OrderTable itemsPerPage={10} template="default" user={true} />
                </article>
            </section>
        </main>
        <Footer />
    </>
  )
}

export default OrderHistoryPage