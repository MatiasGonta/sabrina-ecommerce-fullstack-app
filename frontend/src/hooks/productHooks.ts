import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { apiClient } from "@/services";
import { FiltersInterface, Product } from '@/models';

export const useGetProductsQuery = (filters: FiltersInterface) => {
    const fetchProducts = async ({ pageParam = 1 }) => {
        const response = await apiClient.get(`api/products?page=${pageParam}`, { params: filters })
        return response.data;
    };

    const result = useInfiniteQuery({
        queryKey: ['products'], // Update this to match the backend pagination key
        queryFn: fetchProducts,
        getNextPageParam: (lastPage) => {
            if (lastPage.page === lastPage.totalPages) return false;
            return lastPage.page + 1;
        }
    });

    const products: Product[] = result.data?.pages.reduce((prevProducts, page) => prevProducts.concat(page.docs), []) || [];

    return { ...result, products };
};

export const useGetFilterCountsQuery = () => 
    useQuery({
        queryKey: ['filterCounts'],
        queryFn: async () => (await apiClient.get(`api/products/filter-counts`)).data
    });

export const useGetProductDetailsBySlugQuery = (slug: string) => 
     useQuery({
        queryKey: ['products', slug],
        queryFn: async () => (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
    });