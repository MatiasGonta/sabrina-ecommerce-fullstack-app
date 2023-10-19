import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services';
import { User } from '@/models';

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) =>
      (
        await apiClient.post<User>(`api/users/signin`, {
          email,
          password,
        })
      ).data,
  }
);

export const useSignupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
      isAdmin = false,
      verify = false
    }: {
      name: string
      email: string
      password: string
      isAdmin?: boolean
      verify?: boolean
    }) =>
      (
        await apiClient.post<{newUser: User, message: string}>(`api/users/signup`, {
          name,
          email,
          password,
          isAdmin,
          verify
        })
      ).data,
    onSuccess: () => {
      queryClient.refetchQueries(['users']);
      queryClient.refetchQueries(['users-statistics']);
    }
  });
}

export const useSendRestorePasswordEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => (await apiClient.post<{message: string}>(`api/users/reset-password`, { email })).data,
    onSuccess: () => {
      queryClient.refetchQueries(['users']);
      queryClient.refetchQueries(['users-statistics']);
    }
  });
}

export const useRestorePasswordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token, newPassword }: {
      token: string,
      newPassword: string
    }) => (await apiClient.put(`api/users/reset-password/${token}`, { newPassword })).data,
    onSuccess: () => {
      queryClient.refetchQueries(['users']);
      queryClient.refetchQueries(['users-statistics']);
    }
  });
}

export const useVerifyUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token }: { token: string }) => (await apiClient.put(`api/users/verify/${token}`)).data,
    onSuccess: () => {
      queryClient.refetchQueries(['users']);
      queryClient.refetchQueries(['users-statistics']);
    }
  });
}

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => (await apiClient.delete(`api/users/delete-user/${userId}`)).data,
    onSuccess: () => {
      queryClient.refetchQueries(['users']);
      queryClient.refetchQueries(['users-statistics']);
    }
  });
}

export const useUpdateUserMutation = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      isAdmin,
      verify
    }: {
      name: string
      email: string
      isAdmin: boolean | undefined,
      verify: boolean | undefined
    }) => (await apiClient.put(`api/users/update-user/${_id}`, { name, email, isAdmin, verify })).data,
    onSuccess: () => {
      queryClient.refetchQueries(['users']);
    }
  });
}

export const useGetProfileDetails = (token: string, _id: string) => {
  const fetchProfileDetails = async () => {
    const response = await apiClient.get(`api/users/profile/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const result = useQuery({
    queryKey: ['profileDetails'],
    queryFn: fetchProfileDetails,
    enabled: _id !== '',
    refetchInterval: false
  });

  const profileDetails: User = result.data;

  return { ...result, profileDetails };
};

export const useGetUser = (_id: string) =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => (await apiClient.get(`api/users/profile/${_id}`)).data,
    enabled: _id !== '',
    refetchInterval: false
  });

export const useGetAllUsers = (
  page: number,
  limit?: number,
  searchTerm?: string,
  orderBy?: 'createdAt' | 'isAdmin' | 'verify' | 'updatedAt',
  orderDirection?: 'asc' | 'desc'
) => {
  const fetchUsers = async () => {
    let URL = `api/users/mine?page=${page}`;

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
    queryKey: ['users', page, limit, orderBy, orderDirection, searchTerm],
    queryFn: fetchUsers,
    staleTime: 300000
  });
}

export const useGetUsersStatistics = () => 
  useQuery({
    queryKey: ['users-statistics'],
    queryFn: async () => (await apiClient.get<{totalUsers: number, newMonthUsers: number, newTodayUsers: number, newUsersPerDay: {[key: string]:number}}>(`api/users/statistics`)).data,
    staleTime: 300000,
  });