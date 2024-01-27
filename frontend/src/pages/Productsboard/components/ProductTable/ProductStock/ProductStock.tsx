import { Product } from "@/models";
import { calculateTotalStock } from "@/utilities";
import { useState } from "react";

interface ProductStockInterface {
    product: Product;
}

const ProductStock: React.FC<ProductStockInterface> = ({ product }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const totalStock = calculateTotalStock(product);

    // Product stock array
    const stock = Object.entries(product.countInStockByVariant).filter(([variant, amount]) => amount > 0);

    // Sorting the stock variables
    stock.sort((a, b) => {
        const variantA = a[0];
        const variantB = b[0];

        if (variantA < variantB) return -1;
        if (variantA > variantB) return 1;
        return 0;
    });

    console.log(stock.length * 35 > 165);

    return (
        <div className="product-stock" onMouseEnter={handleOpen} onMouseLeave={handleClose}>
            <span className="product-stock__total">{totalStock}</span>
            {
                isOpen && totalStock > 0 &&
                <div 
                    className={`product-stock__modal ${isOpen ? "product-stock__modal--open" : ''}`}
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleClose}
                    style={{ height: `${stock.length * 35}px` }}
                >
                    <ul className="product-stock__modal__list">
                        {
                            stock.map(([variant, amount], index) => (
                                <li key={index}>
                                    <span>
                                        {variant}: <strong>{amount}</strong>
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default ProductStock