export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  usuarioId: number;
  username: string;
  autenticado: boolean;
  mensaje: string;
}

export interface UserData {
  id: number;
  username: string;
  token?: string;
}