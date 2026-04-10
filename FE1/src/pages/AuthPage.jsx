// ─── AUTH PAGE — Login / Register ────────────────────────────────────────────
import { useState } from "react";
import { useAuth } from "../hooks";

export default function AuthPage({ onSuccess }) {
  const [mode, setMode]       = useState("login"); // "login" | "register"
  const { login, register, loading, error } = useAuth();

  // Login state
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  // Register state
  const [regEmail,    setRegEmail]    = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regName,     setRegName]     = useState("");

  const [regSuccess, setRegSuccess] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    const user = await login(email, password);
    if (user) onSuccess?.();
  }

  async function handleRegister(e) {
    e.preventDefault();
    const user = await register({
      email: regEmail,
      password: regPassword,
      username: regUsername,
      name: regName,
    });
    if (user) {
      setRegSuccess(true);
      setTimeout(() => setMode("login"), 1500);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-mono text-xl font-bold text-green-400">{"<devlog />"}</span>
          <p className="text-zinc-500 text-sm mt-1 font-mono">
            {mode === "login" ? "// đăng nhập để tiếp tục" : "// tạo tài khoản mới"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {["login", "register"].map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  mode === m
                    ? "bg-zinc-800 text-green-400 border border-zinc-700"
                    : "text-zinc-500 hover:text-zinc-400"
                }`}
              >
                {m === "login" ? "đăng nhập" : "đăng ký"}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-950 border border-red-800 rounded-md text-red-400 text-xs font-mono">
              {error}
            </div>
          )}

          {regSuccess && (
            <div className="mb-4 p-3 bg-green-950 border border-green-800 rounded-md text-green-400 text-xs font-mono">
              ✓ Đăng ký thành công! Chuyển sang đăng nhập...
            </div>
          )}

          {/* Login Form */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <Field label="email" value={email} onChange={setEmail} type="email" />
              <Field label="password" value={password} onChange={setPassword} type="password" />
              <SubmitBtn loading={loading} label="đăng nhập" />
            </form>
          )}

          {/* Register Form */}
          {mode === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <Field label="username" value={regUsername} onChange={setRegUsername} />
              <Field label="name" value={regName} onChange={setRegName} />
              <Field label="email" value={regEmail} onChange={setRegEmail} type="email" />
              <Field label="password" value={regPassword} onChange={setRegPassword} type="password" />
              <SubmitBtn loading={loading} label="tạo tài khoản" />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block font-mono text-xs text-zinc-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required
        className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 font-mono focus:outline-none focus:border-green-500 transition-colors"
      />
    </div>
  );
}

function SubmitBtn({ loading, label }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-50 text-zinc-950 font-mono font-semibold text-sm py-2 rounded-md transition-colors"
    >
      {loading ? "loading..." : label}
    </button>
  );
}
