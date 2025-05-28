import { Autor } from "../models/autor.model";

const API_URL = "http://localhost:9000/api/autores";

interface AutorRequest {
  nombre: string;
  nacionalidad?: string;
}

interface AutorResponse {
  id: number;
  nombre: string;
  nacionalidad?: string;
}

export const createAutor = async (autor: AutorRequest): Promise<Autor> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(autor),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear el autor");
  }

  return await response.json();
};

export const getAutorById = async (id: number): Promise<Autor> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener el autor");
  }

  return await response.json();
};

export const updateAutor = async (id: number, autor: AutorRequest): Promise<Autor> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(autor),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar el autor");
  }

  return await response.json();
};

export const deleteAutor = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el autor");
  }
};
export const listarAutores = async (): Promise<Autor[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al listar los autores");
  }

  return await response.json();
};