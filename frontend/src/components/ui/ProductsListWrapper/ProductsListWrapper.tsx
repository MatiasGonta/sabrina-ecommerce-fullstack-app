interface ProductsListWrapperInterface {
    isEmpty: boolean;
    children: React.ReactNode;
}

const ProductsListWrapper: React.FC<ProductsListWrapperInterface> = ({ isEmpty, children }) => {
    return (
        <>
            {
                isEmpty
                    ? (<p className="products-list-empty-msg">No hay productos que cumplan con los requisitos</p>)
                    : (<ul className="products-list-wrapper">{children}</ul>)
            }
        </>
    )
}

export default ProductsListWrapper