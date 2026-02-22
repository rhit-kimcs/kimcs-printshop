import { trpc } from "@/utils/trpc";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useProfile() {
  const useListProfiles = (uid: number) =>
    useQuery(trpc.profile.listProfiles.queryOptions({ uid }));

  const useGetProfile = (id: number, uid: number) =>
    useQuery(trpc.profile.getProfile.queryOptions({ id, uid }));

  return { useGetProfile, useListProfiles };
}
