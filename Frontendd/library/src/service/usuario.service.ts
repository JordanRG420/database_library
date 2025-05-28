const API_URL = "http://localhost:9000/api/usuarios";

export interface Usuario {
  id: number;
  username: string;
}

interface UsuarioRequest {
  username: string;
  password: string;
}

interface UsuarioResponse {
  id: number;
  username: string;
}

export const crearUsuario = async (usuario: UsuarioRequest): Promise<Usuario> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear el usuario");
  }

  return await response.json();
};

export const obtenerUsuario = async (id: number): Promise<UsuarioResponse> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener el usuario");
  }

  return await response.json();
};

export const actualizarUsuario = async (id: number, usuario: UsuarioRequest): Promise<UsuarioResponse> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar el usuario");
  }

  return await response.json();
};

export const eliminarUsuario = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el usuario");
  }
};

export const listarUsuarios = async (): Promise<UsuarioResponse[]> => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los usuarios");
  }

  return await response.json();
};

