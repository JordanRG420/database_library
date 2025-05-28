const API_URL = "http://localhost:9000/api/usuarios";

export interface Usuario {
  id: number;
  username: string;
}

interface UsuarioRequest {
  username: string;
  password: string;
}

export const listarUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener los usuarios");
    }

    const data = await response.json();
    
    // Verificación de estructura de datos
    if (!Array.isArray(data)) {
      throw new Error("La respuesta no es un array de usuarios");
    }
    
    if (data.length > 0 && (!data[0].id || !data[0].username)) {
      console.warn("Los usuarios no tienen la estructura esperada:", data);
    }
    
    return data;
  } catch (error) {
    console.error("Error en listarUsuarios:", error);
    throw error;
  }
};

// (Las otras funciones permanecen igual)
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

export const obtenerUsuario = async (id: number): Promise<Usuario> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener el usuario");
  }

  return await response.json();
};

export const actualizarUsuario = async (id: number, usuario: UsuarioRequest): Promise<Usuario> => {
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