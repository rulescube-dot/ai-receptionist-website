import { useQuery } from "@tanstack/react-query";

export type AuthUser = {
  id: string;
  username: string;
  role: "admin" | "user";
};

export function useAuth() {
  const { data, isLoading, isError } = useQuery<{ user: AuthUser }>({
    queryKey: ["/api/me"],
    retry: false,
  });

  const user = data?.user;

  return {
    user,
    isLoading,
    isError,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };
}
