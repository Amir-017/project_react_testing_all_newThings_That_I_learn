import { useAuthStore } from "../Store/tokenStore";
import { useUiStore } from "../Store/uiStore";

export function Component() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Zustand state</h1>
      <p className="mt-2">Theme: {theme}</p>
      <p className="mt-1">Authentication: {token ? "Signed in" : "Signed out"}</p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={toggleTheme} className="rounded bg-blue-500 px-4 py-2 text-white">
          Toggle theme
        </button>
        <button type="button" onClick={logout} className="rounded border px-4 py-2">
          Clear token
        </button>
      </div>
    </main>
  );
}