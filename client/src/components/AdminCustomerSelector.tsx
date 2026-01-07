import { useAuth } from "@/hooks/useAuth";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useImpersonation } from "@/context/ImpersonationContext";

export default function AdminCustomerSelector() {
  const { isAdmin } = useAuth();
  const { data } = useAdminUsers();
  const { activeCustomer, impersonate, stopImpersonation } = useImpersonation();

  if (!isAdmin) return null;

  const customers = data?.data.filter(u => u.role === "user") ?? [];

  return (
    <div className="mb-4 rounded border bg-yellow-50 p-4">
      <div className="flex items-center gap-3">
        <strong>Admin impersonation:</strong>

        <select
          value={activeCustomer?.id ?? ""}
          onChange={e => {
            const user = customers.find(c => c.id === e.target.value);
            if (user) impersonate(user);
          }}
          className="border rounded px-2 py-1"
        >
          <option value="">— Select customer —</option>
          {customers.map(u => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>

        {activeCustomer && (
          <button
            onClick={stopImpersonation}
            className="text-sm underline"
          >
            Stop impersonation
          </button>
        )}
      </div>
    </div>
  );
}
