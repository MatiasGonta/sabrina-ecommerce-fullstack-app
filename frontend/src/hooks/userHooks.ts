import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services';
import { User, UserInfo } from '@/models';

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
        await apiClient.post<UserInfo>(`api/users/signin`, {
          email,
          password,
        })
      ).data,
  }
);

export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signup`, {
          name,
          email,
          password,
        })
      ).data,
  }
);

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) =>
      (
        await apiClient.put<UserInfo>(`api/users/profile`, {
          name,
          email,
          password,
        })
      ).data,
  }
);

export const useGetProfileDetails = (token: string, _id: string) => {
  const fetchProfileDetails = async () => {
    const response = await apiClient.get(`api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { _id }
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
