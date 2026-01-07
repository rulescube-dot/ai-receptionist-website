import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminGuard from "@/components/AdminGuard";
import { Button } from "@/components/ui/button";

type AdminUser = {
  id: string;
  username: string;
  role: "admin" | "user";
};

export default function AdminPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<{ data: AdminUser[] }>({
    queryKey: ["/api/admin/users"],
  });

  const updateRole = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: "admin" | "user" }) => {
      const res = await fetch(`/api/admin/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role }),
      });

      if (!res.ok) throw new Error("Failed to update role");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
  });

  return (
    <AdminGuard>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Admin – Users</h1>

        {isLoading && <p>Loading users…</p>}

        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Username</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map(u => (
              <tr key={u.id} className="border-b">
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateRole.mutate({
                        id: u.id,
                        role: u.role === "admin" ? "user" : "admin",
                      })
                    }
                  >
                    Make {u.role === "admin" ? "User" : "Admin"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminGuard>
  );
}
