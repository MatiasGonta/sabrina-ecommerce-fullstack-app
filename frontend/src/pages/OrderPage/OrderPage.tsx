import { LoadingSpinner } from "@/components";
import { ThemeContext } from "@/context";
import { useGetOrderDetailsQuery } from "@/hooks";
import { ApiError } from "@/models";
import { getError } from "@/utilities";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";


const OrderPage = () => {
    const { userInfo } = useContext(ThemeContext);
    
    const params = useParams();
    const { id: orderId } = params;

    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId!);

  return isLoading ? <LoadingSpinner /> : error ? <h2>{getError(error as ApiError)}</h2> : !order ? <h2>Order Not Found</h2> : (
    <div>
        <Helmet>
            <title>Order {orderId}</title>
        </Helmet>
        <h1>Order {orderId}</h1>
        <div>
            <h2>Shipping</h2>
            <div>
                <strong>Name:</strong> {order!.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
            </div>
            {
                order.isDelivered ? <h2>Delivered at {order.deliveredAt}</h2> : <h2>Not Delivered</h2>
            }
        </div>
        <div>
            <h2>Payment</h2>
            <div>
                <strong>Method:</strong> {order.paymentMethod}
            </div>
            {
                order.isPaid ? <h2>Delivered at {order.paidAt}</h2> : <h2>Not Paid</h2>
            }
        </div>
        <div>
            <h2>Items</h2>
            <ul>
                {
                    order.orderItems.map((item) => 
                       <li key={item._id}>
                            <div>
                                <img 
                                    src={item.image}
                                    alt={item.name}
                                    className="img-fluid rounded thumbnail"
                                />
                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                            </div>
                            <div>
                                <span>{item.quantity}</span>
                            </div>
                            <div>${item.price}</div>
                       </li> 
                    )
                }
            </ul>
        </div>
        <div>
            <h2>Order Summary</h2>
            <div>
                <span>Items:</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
            </div>
            <div>
                <span>Shipping:</span>
                <span>${order.shippingPrice.toFixed(2)}</span>
            </div>
            <div>
                <span>Tax:</span>
                <span>${order.taxPrice.toFixed(2)}</span>
            </div>
            <div>
                <div>
                    <strong>Order Total:</strong>
                </div>
                <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderPage