import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from "@/services";
import { CartItem, FiltersInterface, Product } from '@/models';

export const useGetProductsQuery = (filters: FiltersInterface) => {
    const fetchProducts = async ({ pageParam = 1 }) => {
        const response = await apiClient.get(`api/products?page=${pageParam}`, { params: filters })
        return response.data;
    };

    const result = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        getNextPageParam: (lastPage) => {
            if (lastPage.page === lastPage.totalPages) return false;
            return lastPage.page + 1;
        }
    });

    const products: Product[] = result.data?.pages.reduce((prevProducts, page) => prevProducts.concat(page.docs), []) || [];
    const totalProducts: number = result.data?.pages[0].totalDocs;
    const hasNextPage: boolean = result.hasNextPage ? result.hasNextPage : false;

    return { ...result, hasNextPage, products, totalProducts };
};

export const useGetFilterCountsQuery = () => {
    const result = useQuery({
        queryKey: ['filterCounts'],
        queryFn: async () => (await apiClient.get(`api/products/filter-counts`)).data
    });

    const categories = result.data?.categories;
    const colors = result.data?.colors;
    const sizes = result.data?.sizes;
    const priceRanges = result.data?.priceRanges;

    return { ...result, categories, colors, sizes, priceRanges };
}

export const useSearchProductsQuery = (searchTerm: string) => {
    const fetchSearchProducts = async ({ pageParam = 1 }) => {
        const response = await apiClient.get(`/api/products/search?q=${searchTerm}&page=${pageParam}`)
        return response.data;
    };

    const result = useInfiniteQuery({
        queryKey: ['search'],
        queryFn: fetchSearchProducts,
        getNextPageParam: (lastPage) => {
            if (lastPage.page === lastPage.totalPages) return false;
            return lastPage.page + 1;
        }
    });

    const searchProducts: Product[] = result.data?.pages.reduce((prevSearchProducts, page) => prevSearchProducts.concat(page.docs), []) || [];
    const totalSearchProducts: number = result.data?.pages[0].totalDocs;
    const hasNextPage: boolean = result.hasNextPage ? result.hasNextPage : false;

    return { ...result, hasNextPage, searchProducts, totalSearchProducts };
};

export const useGetProductDetailsBySlugQuery = (slug: string) => 
    useQuery({
        queryKey: ['products', slug],
        queryFn: async () => (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
    });

export const useUpdateProductStock = () => {
    const queryClient = useQueryClient();
      
    return useMutation({
        mutationFn: async (cartItems: CartItem[]) => await apiClient.put(`api/products/update-stock`, cartItems),
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });
};