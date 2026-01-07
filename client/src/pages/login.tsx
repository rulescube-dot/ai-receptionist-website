import { useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }

      // Go to portal by default
      navigate("/portal");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-6 rounded border w-96">
        <h1 className="text-xl font-bold mb-4">Dev Login</h1>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="username (admin or user)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {error && (
          <div className="text-sm text-red-600 mb-2">{error}</div>
        )}

        <button
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading || !username}
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        <p className="text-xs text-muted-foreground mt-3">
          Use <code>admin</code> or <code>user1</code>
        </p>
      </div>
    </div>
  );
}
