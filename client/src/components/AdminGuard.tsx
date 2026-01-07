import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { user, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return <div className="p-8">Loading…</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">Access denied</h1>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
