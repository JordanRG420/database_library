import axios from "axios";


const API_URL = "http://localhost:9000/api/prestamos";

interface PrestamoRequest {
  libroId: number;
  usuarioId: number;
}

interface PrestamoResponse {
  id: number;
  libroId: number;
  libroTitulo: string;
  usuarioId: number;
  usuarioNombre: string;
  fechaPrestamo: string;
  fechaDevolucion?: string;
  devuelto: boolean;
}

export const crearPrestamo = async (prestamo: PrestamoRequest): Promise<PrestamoResponse> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prestamo),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear el préstamo");
  }

  return await response.json();
};

export const obtenerPrestamo = async (id: number): Promise<PrestamoResponse> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener el préstamo");
  }

  return await response.json();
};

export const actualizarPrestamo = async (id: number, prestamo: PrestamoRequest): Promise<PrestamoResponse> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prestamo),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar el préstamo");
  }

  return await response.json();
};

export const eliminarPrestamo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el préstamo");
  }
};

export const devolverLibro = async (id: number): Promise<PrestamoResponse> => {
  const response = await fetch(`${API_URL}/${id}/devolver`, {
    method: "PUT",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al registrar la devolución");
  }

  return await response.json();
};

export const listarPrestamos = async (): Promise<PrestamoResponse[]> => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los préstamos");
  }

  return await response.json();
};


export const marcarComoDevuelto = async (id: number) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/devolver`);
    return response.data;
  } catch (error: any) {
    console.error("Error en marcarComoDevuelto:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al devolver el libro");
  }
};

