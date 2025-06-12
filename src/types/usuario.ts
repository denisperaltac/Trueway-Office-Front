export interface Usuario {
  userId: number;
  name: string;
  email: string;
  phone: string;
  rol: "admin" | "usuario";
  activo: boolean;
  password: string;
  deleted: boolean;
}

export interface UsuarioFormData {
  name: string;
  email: string;
  phone: string;
  rol: "admin" | "usuario";
  activo: boolean;
  password: string;
  deleted?: boolean;
}
