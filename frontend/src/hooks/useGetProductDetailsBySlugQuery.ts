import { Product } from "@/models";
import { apiClient } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetProductDetailsBySlugQuery = (slug: string) => {
    return useQuery({
      queryKey: ['products', slug],
      queryFn: async () => (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
    });
  }