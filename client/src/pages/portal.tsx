import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Calendar,
  Settings,
  LogOut,
  BarChart3,
  Zap,
  MoveDiagonal2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/auth";
import { useImpersonation } from "@/context/ImpersonationContext";
import AdminCustomerSelector from "@/components/AdminCustomerSelector";
import { useLocation } from "wouter";
import { useEffect } from "react";
// Mock data

const mockUser = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  company: "Digital Agency Inc",
};

const mockUsage = [
  {
    label: "Voice Calls Handled",
    value: "1,247",
    icon: Phone,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "Chat Messages",
    value: "8,392",
    icon: MessageCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "Appointments Booked",
    value: "543",
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const mockPreferences = [
  {
    id: "voice",
    label: "Voice Channel",
    description: "Enable AI to answer phone calls",
    icon: Phone,
    enabled: true,
  },
  {
    id: "chat",
    label: "Chat Widget",
    description: "Enable live chat on your website",
    icon: MessageCircle,
    enabled: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp Integration",
    description: "Enable booking via WhatsApp",
    icon: Zap,
    enabled: false,
  },
  {
    id: "calendar",
    label: "Calendar Sync",
    description: "Auto-sync with your calendar",
    icon: Calendar,
    enabled: true,
  },
];


export default function Portal() {

  const { user , isLoading, isAuthenticated, isAdmin, isDisabled } = useAuth();

  const { activeCustomer } = useImpersonation();

  const [preferences, setPreferences] = useState(mockPreferences);
  
 
// 🔄 loading
  if (isLoading) {
    return <div className="p-8">Loading…</div>;
  }

// ⛔ disabled
  if (isDisabled) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">Account Disabled</h1>
        <p>
          Your account has been disabled. Please contact support for more information.
        </p>
      </div>
    );
  }


  const effectiveUser = activeCustomer ?? user;

  if (!effectiveUser) {
    return null;
  }

  const togglePreference = (id: string) => {
    setPreferences(
      preferences.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };




  // ✅ from here on, user is guaranteed
  return (
    <>
      {/* Admin-only selector */}
      {isAdmin && <AdminCustomerSelector />}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-foreground">
        {/* 🔵 Admin banner */}
        {isAdmin && (
          <div className="mx-6 mt-4 rounded border border-blue-300 bg-blue-50 p-3 text-sm">
            Admin mode — viewing customer portal as{" "}
            <strong>{effectiveUser.username}</strong>
          </div>
        )}
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
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

            <div className="flex items-center gap-4">
              <Link href="/change-password">
                <button className="text-sm text-muted-foreground hover:underline">
                  Change password
                </button>
              </Link>

              <span className="text-sm text-muted-foreground hidden sm:inline">
                {effectiveUser.username}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  await logout();
                  window.location.href = "/";
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-heading font-bold mb-2">
            Welcome back, {effectiveUser.username}!
          </h1>
          <p className="text-lg text-muted-foreground">{mockUser.company}</p>
        </motion.div>

        {/* Usage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-heading font-bold">Your Usage</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mockUsage.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Card className="border-border hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-heading font-bold">
                        {stat.value}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Preferences/Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-heading font-bold">Preferences</h2>
          </div>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="space-y-6">
                {preferences.map((pref, idx) => {
                  const Icon = pref.icon;
                  return (
                    <motion.div
                      key={pref.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + idx * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {pref.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {pref.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={pref.enabled}
                        onCheckedChange={() => togglePreference(pref.id)}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="mt-8 flex gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Save Preferences
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
