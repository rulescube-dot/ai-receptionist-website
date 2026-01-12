import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">Access denied</h1>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
