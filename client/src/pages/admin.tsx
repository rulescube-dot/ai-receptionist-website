import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminGuard from "@/components/AdminGuard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { logout } from "@/lib/auth";
import { Phone, LogOut, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type AdminUser = {
  id: string;
  username: string;
  role: "admin" | "user";
  active: boolean;
};

export default function AdminPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<{ data: AdminUser[] }>({
    queryKey: ["/api/admin/users"],
  });

  const [newUsername, setNewUsername] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "user">("user");
  const [createdPassword, setCreatedPassword] = useState<string | null>(null);

  const [resetPasswordInfo, setResetPasswordInfo] = useState<{
    username: string;
    tempPassword: string;
  } | null>(null);

  const createUser = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: newUsername,
          role: newRole,
        }),
      });

      if (!res.ok) throw new Error("Failed to create user");
      return res.json();
    },
    onSuccess: (data) => {
      setCreatedPassword(data.tempPassword);
      setNewUsername("");
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
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

  const toggleActive = useMutation({
  mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
    const endpoint = active
      ? `/api/admin/users/${id}/enable`
      : `/api/admin/users/${id}/disable`;

    const res = await fetch(endpoint, {
      method: "PATCH",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to update user status");
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
  },
});


  const { user } = useAuth();

  return (
    <AdminGuard>
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span className="font-heading font-bold text-lg">
                  AI Receptionist
                </span>
              </div>
            </Link>

            <Link href="/change-password">
              <button className="text-sm text-muted-foreground hover:underline">
                Change password
              </button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await logout();
                window.location.href = "/";
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Admin – Users</h1>

        {isLoading && <p>Loading users…</p>}

      <div className="mb-8 border p-4 rounded">
        <h2 className="font-semibold mb-2">Create User</h2>

        <input
          className="border px-2 py-1 mr-2"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <select
          className="border px-2 py-1 mr-2"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value as any)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <Button size="sm" onClick={() => createUser.mutate()}>
          Create
        </Button>

        {createdPassword && (
        <div className="mt-3 rounded border border-red-300 bg-red-50 p-3 text-sm">
          <p className="font-semibold">Temporary password (shown once):</p>
          <code className="block mt-1 text-red-700 font-mono">
            {createdPassword}
          </code>
        </div>

        )}
      </div>
        {resetPasswordInfo && (
          <div className="mb-6 rounded border border-yellow-300 bg-yellow-50 p-4">
            <p className="font-semibold text-yellow-900">
              ⚠ Temporary password for <strong>{resetPasswordInfo.username}</strong>
            </p>

            <div className="mt-2 flex items-center gap-2">
              <code className="rounded bg-white px-3 py-1 font-mono text-sm">
                {resetPasswordInfo.tempPassword}
              </code>

              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    resetPasswordInfo.tempPassword
                  );
                }}
              >
                Copy
              </Button>
            </div>

            <p className="mt-2 text-sm text-yellow-800">
              This password is shown only once. Make sure to store it securely.
            </p>

            <div className="mt-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setResetPasswordInfo(null)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}
      
        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Username</th>
              <th className="text-left p-2">Active</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Reset Password</th>
              <th className="text-left p-2">DELETE (Danger)</th>
            </tr>
          </thead>
            <tbody>
              {data?.data.map(u => (
                <tr key={u.id} className="border-b">
                  <td className="p-2">{u.username}</td>

                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={u.active}
                        disabled={u.id === user?.id}
                        onCheckedChange={(checked) =>
                          toggleActive.mutate({ id: u.id, active: checked })
                        }
                      />

                      <span
                        className={`text-sm font-medium ${
                          u.active === false ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {u.active === false ? "Disabled" : "Enabled"}
                      </span>
                    </div>
                  </td>

                  {/* Role toggle */}
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

                  {/* Reset password */}
                  <td className="p-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        if (!confirm(`Reset password for ${u.username}?`)) return;

                        const res = await fetch(
                          `/api/admin/users/${u.id}/reset-password`,
                          { method: "POST", credentials: "include" }
                        );

                        if (!res.ok) {
                          alert("Failed to reset password");
                          return;
                        }

                        const data = await res.json();

                        setResetPasswordInfo({
                          username: u.username,
                          tempPassword: data.tempPassword,
                        });
                      }}
                    >
                      Reset Password
                    </Button>

                  </td>

                  {/* Delete user */}
                  <td className="p-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        if (
                          !confirm(
                            `DELETE USER ${u.username}?\n\nThis cannot be undone.`
                          )
                        )
                          return;

                        await fetch(`/api/admin/users/${u.id}`, {
                          method: "DELETE",
                          credentials: "include",
                        });

                        queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
                      }}
                    >
                      Delete
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
