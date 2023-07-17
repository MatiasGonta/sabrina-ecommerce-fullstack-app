import { useQuery } from '@tanstack/react-query';
import { Product } from "@/models";
import { apiClient } from "@/services";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
  }
);