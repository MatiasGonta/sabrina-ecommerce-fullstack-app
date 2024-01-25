import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from "@/services";
import { CartItem, FiltersInterface, Product, SearchProduct, TypeWithKey } from '@/models';

export const useGetProductsCatalogQuery = (filters?: FiltersInterface) => {
  const fetchProducts = async ({ pageParam = 1 }) => {
    const response = await apiClient.get(`api/products?page=${pageParam}`, { params: filters })
    return response.data;
  };

  const result = useInfiniteQuery({
    queryKey: ['catalog'],
    queryFn: fetchProducts,
    staleTime: 300000,
    getNextPageParam: (lastPage) => {
      if (lastPage.page === lastPage.totalPages) return false;
      return lastPage.page + 1;
    }
  });

  const productDocs = result.data?.pages.flatMap((page) => page.docs) || [];
  
  // Filter duplicate products by _id
  const uniqueProducts = productDocs.filter((product, index, self) => {
    return index === self.findIndex((p) => p._id === product._id);
  });

  const products: Product[] = uniqueProducts || [];
  
  return {
    ...result,
    hasNextPage: result.hasNextPage ? result.hasNextPage : false,
    products,
    totalProducts: result.data?.pages[0].totalDocs
  };
};

export const useGetProductsQuery = (
    page: number,
    limit?: number,
    searchTerm?: string,
    orderBy?: 'price' | 'createdAt' | 'updatedAt',
    orderDirection?: 'asc' | 'desc'
  ) => {
    const fetchProducts = async () => {
      let URL = `api/products/mine?page=${page}`;
  
      if (searchTerm) {
        URL += `&q=${searchTerm}`;
      }
  
      if (limit) {
        URL += `&limit=${limit}`;
      }
  
      if (orderBy && orderDirection) {
        URL += `&sort=${orderBy}&order=${orderDirection}`;
      }
      
      const response = await apiClient.get(URL);
      return response.data;
    };
  
    return useQuery({
      queryKey: ['products', page, limit, orderBy, orderDirection, searchTerm],
      queryFn: fetchProducts,
      staleTime: 300000
    });
  }

export const useGetFilterCountsQuery = () => {

  const result = useQuery({
    queryKey: ['filterCounts'],
    queryFn: async () => (await apiClient.get(`api/products/filter-counts`)).data,
    staleTime: 300000
  });

  return {
    ...result,
    categories: result.data?.categories,
    brands: result.data?.brands,
    colors: result.data?.colors,
    sizes: result.data?.sizes,
    priceRanges: result.data?.priceRanges
  };
}

export const useSearchProductsQuery = (searchTerm: string) => {
  const fetchSearchProducts = async ({ pageParam = 1 }) => {
    const response = await apiClient.get(`/api/products/search?q=${searchTerm}&page=${pageParam}`)
    return response.data;
  };

  const result = useInfiniteQuery({
    queryKey: ['search'],
    queryFn: fetchSearchProducts,
    staleTime: 300000,
    getNextPageParam: (lastPage) => {
      if (lastPage.page === lastPage.totalPages) return false;
      return lastPage.page + 1;
    }
  });

  const searchDocs = result.data?.pages.flatMap((page) => page.docs) || [];

  // Filter duplicate products by _id
  const uniqueProducts = searchDocs.filter((product, index, self) => {
    return index === self.findIndex((p) => p._id === product._id);
  });

  // Format search products
  const searchProducts: SearchProduct[] = uniqueProducts.map(({ name, images, slug }) => ({
    name,
    image: images[0],
    slug
  }));

  return {
    ...result,
    hasNextPage: result.hasNextPage ? result.hasNextPage : false,
    searchProducts,
    totalSearchProducts: result.data?.pages[0].totalDocs
  };
};

export const useGetProductDetailsBySlugQuery = (slug: string) => {
  const result = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => (await apiClient.get<{product: Product, relatedProducts: Product[]}>(`api/products/slug/${slug}`)).data,
    staleTime: 300000
  });

  return {
    ...result,
    product: result.data?.product,
    relatedProducts: result.data?.relatedProducts.filter(product => product._id !== result.data?.product._id)
  }
}

export const useGetCartItemsStockByIdQuery = (itemsId: string[]) => {
  const result = useQuery({
    queryKey: ['stock', itemsId],
    queryFn: async () => (await apiClient.get(`api/products/stock`, { params: itemsId })).data,
    staleTime: 75000
  });

  const stock: TypeWithKey<TypeWithKey<number>> = result.data;

  return { ...result, stock };
}

export const useUpdateProductStock = () => {
  const queryClient = useQueryClient();
      
  return useMutation({
    mutationFn: async ({ orderItems, action }: { orderItems: CartItem[], action: 'restore' | 'discount' }) => await apiClient.put(`api/products/update-stock?action=${action}`, orderItems),
    onSuccess: () => {
      queryClient.refetchQueries(['filterCounts']);
      queryClient.refetchQueries(['product']);
      queryClient.refetchQueries(['products']);
      queryClient.refetchQueries(['catalog']);
    },
  });
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: any) => await apiClient.post(`api/products/create-product`, newProduct, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }),
    onSuccess: () => {
      queryClient.refetchQueries(['filterCounts']);
      queryClient.refetchQueries(['products']);
      queryClient.refetchQueries(['catalog']);
    }
  });
}

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateProduct: any) => await apiClient.put(`api/products/update-product`, updateProduct, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }),
    onSuccess: () => {
      queryClient.refetchQueries(['filterCounts']);
      queryClient.refetchQueries(['product']);
      queryClient.refetchQueries(['products']);
      queryClient.refetchQueries(['catalog']);
    }
  });
}

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (productId: string) => (await apiClient.delete(`api/products/delete-product/${productId}`)).data,
    onSuccess: () => {
      queryClient.refetchQueries(['filterCounts']);
      queryClient.refetchQueries(['products']);
      queryClient.refetchQueries(['catalog']);
    }
  });
}