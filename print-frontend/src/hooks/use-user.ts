import { trpc } from "@/utils/trpc";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useUser() {
  const useGetUser = (id: number) =>
    useQuery(trpc.user.getUser.queryOptions({ id }));

  const useUpdateUser = useMutation(trpc.user.updateUser.mutationOptions());
  const useUpdateUserProfile = useMutation(
    trpc.user.updateUserProfile.mutationOptions(),
  );

  return { useGetUser, useUpdateUser, useUpdateUserProfile };
}
