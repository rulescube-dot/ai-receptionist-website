type Props = {
  password: string;
};

export default function PasswordStrengthMeter({ password }: Props) {
  const checks = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "Uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "Lowercase letter", ok: /[a-z]/.test(password) },
    { label: "Number", ok: /[0-9]/.test(password) },
    { label: "Special character", ok: /[!@#$%^&*(),.?\":{}|<>]/.test(password) },
  ];

  const score = checks.filter(c => c.ok).length;

  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];

  return (
    <div className="space-y-2">
      {/* Strength bar */}
      <div className="h-2 w-full rounded bg-slate-200 overflow-hidden">
        <div
          className={`h-full transition-all ${colors[Math.max(score - 1, 0)]}`}
          style={{ width: `${(score / checks.length) * 100}%` }}
        />
      </div>

      {/* Rules */}
      <ul className="text-xs space-y-1">
        {checks.map(c => (
          <li key={c.label} className={c.ok ? "text-green-600" : "text-muted-foreground"}>
            {c.ok ? "✓" : "•"} {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
