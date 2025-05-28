export interface Prestamo {
  id: number;
  libroId: number;
  libroTitulo: string;
  usuarioId: number;
  usuarioNombre: string;
  fechaPrestamo: string;
  fechaDevolucion?: string;
  devuelto: boolean;
}

export interface PrestamoRequest {
  libroId: number;
  usuarioId: number;
}

export interface PrestamoResponse {
  id: number;
  libroId: number;
  libroTitulo: string;
  usuarioId: number;
  usuarioNombre: string;
  fechaPrestamo: string;
  fechaDevolucion?: string;
  devuelto: boolean;
}