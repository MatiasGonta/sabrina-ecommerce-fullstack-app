import { CartItem } from "@/models"

interface OrderItemInterface {
    item: CartItem;
}

const OrderItem: React.FC<OrderItemInterface> = ({ item }) => {
  return (
    <li className="order-item">
        <div>
            <img
                src={item.image}
                alt={item.name}
                className="order-item__image"
            />
            <div className="order-item__details">
                <span>{item.name}</span>
                {
                    item.sizeSelected !== ''
                        ? <span>Color: {item.colorSelected}, Talle: {item.sizeSelected}</span>
                        : <span>Color: {item.colorSelected}</span>
                }
            </div>
        </div>
        <div>
            <span className="order-item__quantity">{item.quantity}</span>
        </div>
        <strong className="order-item__price">${item.price.toFixed(2)}</strong>
    </li>
  )
}

export default OrderItem