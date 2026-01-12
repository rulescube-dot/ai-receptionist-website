import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

export default function RequireAuth({
  children,
  redirectTo,
}: {
  children: ReactNode;
  redirectTo: string;
}) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation(`/login?redirect=${redirectTo}`);
    }
  }, [isLoading, user, redirectTo, setLocation]);

  if (isLoading || !user) {
    return <div className="p-8">Loading…</div>;
  }

  return <>{children}</>;
}
