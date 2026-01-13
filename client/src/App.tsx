import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Portal from "@/pages/portal";
import AdminPage from "@/pages/admin";
import LoginPage from "./pages/login";
import { ImpersonationProvider } from "@/context/ImpersonationContext";
import RequireAuth from "./components/RequireAuth";
import AdminGuard from "./components/AdminGuard";
import ChangePasswordPage from "./pages/change-password";
import Healthcare from "./pages/healthcare";
import RealEstate from "./pages/real-estate";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      <Route path="/healthcare" component={Healthcare} />
      <Route path="/real-estate" component={RealEstate} />
      <Route path="/portal">
        <RequireAuth redirectTo="/portal">
          <Portal />
        </RequireAuth>
      </Route>

      <Route path="/admin">
        <RequireAuth redirectTo="/admin">
          <AdminGuard>
            <AdminPage />
          </AdminGuard>
        </RequireAuth>
      </Route>

      <Route path="/change-password" component={ChangePasswordPage} />
      <Route path="/login" component={LoginPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ImpersonationProvider>
        <Toaster />
        <Router />
        </ImpersonationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
