

const API_URL = "http://localhost:9000/api/categorias";

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}

interface CategoriaRequest {
  nombre: string;
  descripcion?: string;
}

interface CategoriaResponse {
  id: number;
  nombre: string;
  descripcion?: string;
}

export const createCategoria = async (categoria: CategoriaRequest): Promise<Categoria> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear la categoría");
  }

  return await response.json();
};

export const getCategoriaById = async (id: number): Promise<CategoriaResponse> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener la categoría");
  }

  return await response.json();
};

export const updateCategoria = async (id: number, categoria: CategoriaRequest): Promise<CategoriaResponse> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar la categoría");
  }

  return await response.json();
};

export const deleteCategoria = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar la categoría");
  }
};

export const getAllCategorias = async (): Promise<CategoriaResponse[]> => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener las categorías");
  }

  return await response.json();
};
export const listarCategorias = async (): Promise<CategoriaResponse[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al listar las categorías");
  }

  return await response.json();
};