import { useQuery } from "@tanstack/react-query";

export type AuthUser = {
  id: string;
  username: string;
  role: "admin" | "user";
};

export function useAuth() {
  const { 
    data, 
    isLoading, 
    isError 
  } = useQuery<{ data: AuthUser }>({
    queryKey: ["/api/me"],
    retry: false,
  });

  const status = (isError as any)?.status;
  const user = data?.data ?? null;

  return {
    user: data?.data ?? null,
    isLoading,
    isAuthenticated: !!data?.data,
    isAdmin: data?.data?.role === "admin",
    isDisabled: status === 403, 
  };
}
