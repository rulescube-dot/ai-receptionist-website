import { useQuery } from "@tanstack/react-query";

export type AdminUser = {
  id: string;
  username: string;
  role: "admin" | "user";
};

export function useAdminUsers() {
  return useQuery<{ data: AdminUser[] }>({
    queryKey: ["/api/admin/users"],
  });
}
