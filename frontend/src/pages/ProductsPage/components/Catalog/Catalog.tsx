import { useNavigate } from "react-router-dom";
import { FiltersContext } from "../../context";
import { useContext, useEffect } from "react";
import { ApiError, LoadingSpinnerType, Product, Routes } from "@/models";
import { filterParamsUrlGenerator, getError } from "@/utilities";
import { useGetProductsCatalogQuery } from "@/hooks";
import { LoadingSpinner, ProductsListWrapper } from "@/components/ui";
import { ProductItem } from "@/components";
import InfiniteScroll from "react-infinite-scroll-component";

interface CatalogInterface { }

const Catalog: React.FC<CatalogInterface> = () => {
    const { filters, handleFilteredProductsFounded } = useContext(FiltersContext);

    const navigate = useNavigate();

    // Getting products
    const { products, totalProducts, isLoading, error, refetch, hasNextPage, fetchNextPage } = useGetProductsCatalogQuery(filters);

    useEffect(() => {
        handleFilteredProductsFounded(totalProducts);
    }, [totalProducts]);

    useEffect(() => {
        const newQueryParams = filterParamsUrlGenerator(filters);

        refetch();
        navigate(`${Routes.PRODUCTS}?${newQueryParams}`);
    }, [filters]);

    return (
        isLoading
            ? <LoadingSpinner type={LoadingSpinnerType.FLEX} /> : error
                ? <h4>{getError(error as ApiError)}</h4> : (
                    <section className="products-catalog">
                        <InfiniteScroll
                            dataLength={products.length}
                            hasMore={hasNextPage}
                            next={() => fetchNextPage()}
                            loader={<LoadingSpinner type={LoadingSpinnerType.FLEX} />}
                        >
                            <ProductsListWrapper isEmpty={totalProducts !== 0}>
                                {
                                    products.map((product: Product, index: number) => <ProductItem key={index} product={product} />)
                                }
                            </ProductsListWrapper>
                        </InfiniteScroll>
                    </section>
                )
    )
}

export default Catalog