import { Footer, LoadingSpinner, Navbar } from "@/components";
import { useGetOrderHistoryQuery } from "@/hooks";
import { ApiError } from "@/models";
import { getError } from "@/utilities";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import '../../styles/OrderHistoryPage.scss';

const OrderHistoryPage = () => {
    const navigate = useNavigate();
    const { data: orders, isLoading, error } = useGetOrderHistoryQuery();

  return (
    <>
        <Helmet>
            <title>Mis Compras</title>
        </Helmet>
        <Navbar />
        <main className="order-history-main">
            <article>
                <section>
                    <h1>Order History</h1>
                    {
                        isLoading ? <LoadingSpinner /> : error ? <h2>{getError(error as ApiError)}</h2> : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>FECHA</th>
                                        <th>TOTAL</th>
                                        <th>PAGADO</th>
                                        <th>ENTREGADO</th>
                                        <th>DETALLE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders!.map((order) => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.substring(0,10)}</td>
                                                <td>{order.totalPrice.toFixed(2)}</td>
                                                <td>{order.isPaid ? order.paidAt.substring(0,10) : 'No'}</td>
                                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'No'}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={()=> navigate(`/order/${order._id}`)}
                                                    >Detalle</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </section>
            </article>
        </main>
        <Footer />
    </>
  )
}

export default OrderHistoryPage