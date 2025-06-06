export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: "admin" | "usuario";
  activo: boolean;
  fechaCreacion: string;
  ultimoAcceso?: string;
}

export interface UsuarioFormData {
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  rol: "admin" | "usuario";
  activo: boolean;
}
