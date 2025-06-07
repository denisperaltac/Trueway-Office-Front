import { BaseUrl } from "../config/config";
import { Usuario, UsuarioFormData } from "../types/usuario";
import axiosInstance from "../config/axios";

export const usuarioService = {
  obtenerUsuarios: async (): Promise<Usuario[]> => {
    const response = await axiosInstance.get(`${BaseUrl}usuarios`);
    return response.data.result;
  },

  obtenerUsuario: async (id: number): Promise<Usuario> => {
    const response = await axiosInstance.get(`${BaseUrl}usuarios/${id}`);
    return response.data;
  },

  crearUsuario: async (usuario: UsuarioFormData): Promise<Usuario> => {
    const response = await axiosInstance.post(`${BaseUrl}usuarios`, usuario);
    return response.data;
  },

  actualizarUsuario: async (
    id: number,
    usuario: UsuarioFormData
  ): Promise<Usuario> => {
    const response = await axiosInstance.put(
      `${BaseUrl}usuarios/${id}`,
      usuario
    );
    return response.data;
  },

  eliminarUsuario: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${BaseUrl}usuarios/${id}`);
  },
};
