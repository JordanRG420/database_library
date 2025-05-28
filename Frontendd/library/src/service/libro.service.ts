const API_URL = "http://localhost:9000/api/libros";

interface LibroRequest {
  titulo: string;
  autorId: number;
  categoriaId: number;
  fechaPublicacion?: string;
}

interface LibroResponse {
  id: number;
  titulo: string;
  autorId: number;
  autorNombre: string;
  categoriaId: number;
  categoriaNombre: string;
  fechaPublicacion?: string;
  disponible: boolean;
}

export const crearLibro = async (libro: LibroRequest): Promise<LibroResponse> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(libro),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear el libro");
  }

  return await response.json();
};

export const obtenerLibro = async (id: number): Promise<LibroResponse> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener el libro");
  }

  return await response.json();
};

export const actualizarLibro = async (id: number, libro: LibroRequest): Promise<LibroResponse> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(libro),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar el libro");
  }

  return await response.json();
};

export const eliminarLibro = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el libro");
  }
};

export const listarLibros = async (): Promise<LibroResponse[]> => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los libros");
  }

  return await response.json();
};

export const buscarLibros = async (
  titulo?: string,
  autorId?: number,
  categoriaId?: number
): Promise<LibroResponse[]> => {
  const params = new URLSearchParams();
  if (titulo) params.append('titulo', titulo);
  if (autorId) params.append('autorId', autorId.toString());
  if (categoriaId) params.append('categoriaId', categoriaId.toString());

  const response = await fetch(`${API_URL}/buscar?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al buscar libros");
  }

  return await response.json();
};

export const listarLibrosDisponibles = async (): Promise<LibroResponse[]> => {
  const response = await fetch(`${API_URL}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los libros disponibles");
  }

  return await response.json();
};