import { ColorBadge } from "@/components/ui";
import { Product } from "@/models";
import { calculateTotalStock } from "@/utilities";
import { Fade, Modal, Backdrop } from '@mui/material';
import { useState } from "react";

interface ProductStockInterface {
    product: Product;
}

const ProductStock: React.FC<ProductStockInterface> = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        if (totalStock === 0) return;

        setIsOpen(true)
    };
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

    return (
        // <div className="product-stock" onMouseEnter={handleOpen} onMouseLeave={handleClose}>
        //     <span className="product-stock__total">{totalStock}</span>
        //     {
        //         isOpen && totalStock > 0 &&
        //         <div 
        //             className={`product-stock__modal ${isOpen ? "product-stock__modal--open" : ''}`}
        //             onMouseEnter={handleOpen}
        //             onMouseLeave={handleClose}
        //             style={{ height: `${stock.length * 35}px` }}
        //         >
        // <ul className="product-stock__modal__list">
        //     {
        //         stock.map(([variant, amount], index) => (
        //             <li key={index}>
        //                 <span>
        //                     {variant}: <strong>{amount}</strong>
        //                 </span>
        //             </li>
        //         ))
        //     }
        // </ul>
        //         </div>
        //     }
        // </div>
        <div className="product-stock">
            <div className="product-stock__total" onClick={handleOpen}>
                <span>{totalStock}</span>
            </div>

            <Modal
                open={isOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={isOpen}>
                    <div className="product-stock__modal">
                        <div className="product-stock__modal__header">
                            <strong>Tipo</strong>
                            <strong>Cantidad</strong>
                        </div>
                        <ul className="product-stock__modal__list">
                            {
                                stock.map(([variant, amount], index) => {
                                    const [color, size] = variant.split('-');

                                    return (
                                        <li key={index}>
                                            {/* <span>
                                                {variant}: <strong>{amount}</strong>
                                            </span> */}
                                            <div>
                                                <span>Color: <ColorBadge color={color} size="medium" /></span>
                                                <span>Talle: {size}</span>
                                            </div>
                                            <strong>{amount}</strong>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default ProductStock