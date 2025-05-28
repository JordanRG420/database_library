const API_URL = "http://localhost:9000/api/auth";

interface LoginRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  usuarioId: number;
  username: string;
  autenticado: boolean;
  mensaje: string;
}

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Credenciales inválidas");
    }
    throw new Error("Error al iniciar sesión");
  }

  return await response.json();
};

export const logout = (): void => {
  // Limpiar cualquier dato de autenticación almacenado
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
};