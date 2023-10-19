import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartItem as CartItemData } from "@/models";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from "@/redux/states/cart.state";

interface CartItemInterface {
    item: CartItemData;
}

const CartItem: React.FC<CartItemInterface> = ({ item }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const updatedCartHandler = (item: CartItemData, quantity: number) => {
        if (item.countInStock < quantity) {
            toast.warn('Lo siento. Producto sin stock');
            return;
        }
        dispatch(addItemToCart({ ...item, quantity }));
    }    

    const removeItemHandler = (item: CartItemData) => dispatch(removeItemFromCart(item));

    const editItemHandler = (item: CartItemData) => {
        dispatch(removeItemFromCart(item));
        navigate(`/products/${item.slug}`);
    };

  return (
    <li key={item._id} className='cart-item'>
        <div className='cart-item__info'>
            <img src={item.image} alt={item.name} />
            <div>
                <Link to={`/products/${item.slug}`}>{item.name}</Link>
                {
                    item.sizeSelected !== ''
                        ? <span>Color: {item.colorSelected}, Talle: {item.sizeSelected}</span>
                        : <span>Color: {item.colorSelected}</span>
                }
                <div>
                    <span onClick={() => editItemHandler(item)}>Editar</span>
                    <span onClick={() => removeItemHandler(item)}>Eliminar</span>
                </div>
            </div>
        </div>
        <div className='cart-item__quantity'>
            <div>
                <button 
                    className={item.quantity === 1 ? 'minor-button  disable' : 'minor-button'} 
                    onClick={() => updatedCartHandler(item, item.quantity - 1)} 
                    disabled={item.quantity === 1}
                >
                    <RemoveIcon sx={{ fontSize: 30 }} />
                </button>
                <span>{item.quantity}</span>
                <button 
                    className={item.countInStock - item.quantity === 0 ? 'plus-button disable' : 'plus-button'} 
                    onClick={() => updatedCartHandler(item, item.quantity + 1)} 
                    disabled={item.quantity === item.countInStock}
                >
                    <AddIcon sx={{ fontSize: 30 }} />
                </button>
            </div>
            <span id="item-stock">{item.countInStock - item.quantity} disponibles</span>
        </div>
        <div className='cart-item__price'>
            <span>$ {item.price.toFixed(2)}</span>
        </div>
    </li>
  )
}

export default CartItem