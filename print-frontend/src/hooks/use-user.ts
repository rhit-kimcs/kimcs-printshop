import { trpc } from "@/utils/trpc";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useUser() {
  const useGetUser = (id: number) =>
    useQuery({
      ...trpc.user.getUser.queryOptions({ id }),
      retry: 6,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    });

  const useUpdateUser = useMutation(trpc.user.updateUser.mutationOptions());
  const useUpdateUserProfile = useMutation(
    trpc.user.updateUserProfile.mutationOptions(),
  );

  return { useGetUser, useUpdateUser, useUpdateUserProfile };
}
