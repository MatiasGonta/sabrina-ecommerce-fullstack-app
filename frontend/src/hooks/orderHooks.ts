import { Order, CartItem, ShippingAddress, User } from '@/models';
import { apiClient } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetPaypalClientIdQuery = () =>
  useQuery({
    queryKey: ['paypal-clientId'],
    queryFn: async () => (await apiClient.get<{ clientId: string }>(`/api/keys/paypal`)).data,
  });

export const useCreateMercadoPagoOrder = () =>
  useMutation({
    mutationFn: async ({ user, order }: { user: User, order: Order }) => (await apiClient.post(`/api/keys/mercadopago/create-order`, { user, order })).data,
  });

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['order', id],
    queryFn: async () => (await apiClient.get<Order>(`api/orders/${id}`)).data,
    staleTime: 300000
  });

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: CartItem[]
      shippingAddress: ShippingAddress
      paymentMethod: string
      itemsPrice: number
      shippingPrice: number
      taxPrice: number
      totalPrice: number
    }) => (await apiClient.post<{ message: string; order: Order }>(`api/orders/create-order`, order)).data,
  });

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, delivered, paid, paymentMethod, paymentId }: {
      orderId: string,
      delivered: boolean,
      paid: boolean,
      paymentMethod: 'PayPal' | 'MercadoPago' | 'Efectivo' | 'Otros' | 'Transferencia' | 'Depósito' | 'Rapi Pago' | 'Pago Fácil' | 'Billetera Santa Fe';
      paymentId?: string
    }) => (await apiClient.put(`api/orders/update-order/${orderId}`, { delivered, paid, paymentMethod, paymentId })).data,
    onSuccess: () => {
      queryClient.refetchQueries(['order']);
      queryClient.refetchQueries(['order-history-all']);
    }
  });
}

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => (await apiClient.delete(`api/orders/delete-order/${orderId}`)).data,
    onSuccess: () => {
      queryClient.refetchQueries(['order-history-all']);
    }
  });
}

export const useGetAllOrdersHistoryQuery = (
  page: number,
  searchTerm?: string,
  orderBy?: 'createdAt' | 'totalPrice' | 'paidAt' | 'deliveredAt',
  orderDirection?: 'asc' | 'desc',
  limit?: number,
  user?: boolean
) => {
  const fetchOrders = async () => {
    let URL = `/api/orders/mine?page=${page}`;

    if (searchTerm) {
      URL += `&q=${searchTerm}`;
    }

    if (orderBy && orderDirection) {
      URL += `&sort=${orderBy}&order=${orderDirection}`;
    }

    if (limit) {
      URL += `&limit=${limit}`;
    }

    if (user) {
      URL += `&user=${user}`;
    }

    const response = await apiClient.get(URL);
    return response.data;
  };

  return useQuery({
    queryKey: ['order-history-all', page, searchTerm, orderBy, orderDirection, limit, user],
    queryFn: fetchOrders,
    staleTime: 300000
  });
};


export const useGetSales = () =>
  useQuery({
    queryKey: ['sales'],
    queryFn: async () => (await apiClient.get(`/api/orders/sales`)).data
  });