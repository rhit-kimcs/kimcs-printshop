import { trpc } from "@/utils/trpc";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useDepartment() {
  const useGetDepartment = (id: number, uid: number) =>
    useQuery(trpc.department.getDepartment.queryOptions({ id, uid }));

  const useListDepartments = (uid: number) =>
    useQuery(trpc.department.listDepartments.queryOptions({ uid }));

  const useAddDepartment = () =>
    useMutation(trpc.department.addDepartment.mutationOptions());

  return { useGetDepartment, useListDepartments, useAddDepartment };
}
