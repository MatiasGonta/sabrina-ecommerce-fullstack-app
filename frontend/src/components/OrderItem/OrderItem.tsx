import { CartItem } from "@/models"

interface OrderItemInterface {
    item: CartItem;
}

const OrderItem: React.FC<OrderItemInterface> = ({ item }) => {
  return (
    <li className="order-item">
        <div className="order-item__body">
            <img
                src={item.image}
                alt={item.name}
                className="order-item__body__image"
            />
            <div className="order-item__body__details">
                <span className="order-item__body__details__name">{item.name}</span>
                {
                    item.sizeSelected !== ''
                        ? <span className="order-item__body__details__feature">Color: {item.colorSelected}, Talle: {item.sizeSelected}</span>
                        : <span className="order-item__body__details__feature">Color: {item.colorSelected}</span>
                }
            </div>
        </div>
        <div>
            <span>{item.quantity}</span>
        </div>
        <strong>${item.price.toFixed(2)}</strong>
    </li>
  )
}

export default OrderItem