const API = "http://localhost/tasktrackr/api";

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/login.php`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
}

export async function register(email: string, password: string) {
  const res = await fetch(`${API}/register.php`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Register failed");
}

export async function logout() {
  await fetch(`${API}/logout.php`, {
    credentials: "include",
  });
}

export async function me() {
  const res = await fetch(`${API}/me.php`, {
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}
