import { createContext, useContext, useState, ReactNode } from "react";
import type { AuthUser } from "@/hooks/useAuth";

type ImpersonationContextType = {
  activeCustomer: AuthUser | null;
  impersonate: (user: AuthUser) => void;
  stopImpersonation: () => void;
};

const ImpersonationContext = createContext<ImpersonationContextType | null>(null);

export function ImpersonationProvider({ children }: { children: ReactNode }) {
  const [activeCustomer, setActiveCustomer] = useState<AuthUser | null>(null);

  return (
    <ImpersonationContext.Provider
      value={{
        activeCustomer,
        impersonate: setActiveCustomer,
        stopImpersonation: () => setActiveCustomer(null),
      }}
    >
      {children}
    </ImpersonationContext.Provider>
  );
}

export function useImpersonation() {
  const ctx = useContext(ImpersonationContext);
  if (!ctx) {
    throw new Error("useImpersonation must be used within ImpersonationProvider");
  }
  return ctx;
}
