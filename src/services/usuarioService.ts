import axios from "axios";
import { BaseUrl } from "../config/config";
import { Usuario, UsuarioFormData } from "../types/usuario";

export const usuarioService = {
  obtenerUsuarios: async (): Promise<Usuario[]> => {
    const response = await axios.get(`${BaseUrl}usuarios`);
    return response.data;
  },

  obtenerUsuario: async (id: number): Promise<Usuario> => {
    const response = await axios.get(`${BaseUrl}usuarios/${id}`);
    return response.data;
  },

  crearUsuario: async (usuario: UsuarioFormData): Promise<Usuario> => {
    const response = await axios.post(`${BaseUrl}usuarios`, usuario);
    return response.data;
  },

  actualizarUsuario: async (
    id: number,
    usuario: UsuarioFormData
  ): Promise<Usuario> => {
    const response = await axios.put(`${BaseUrl}usuarios/${id}`, usuario);
    return response.data;
  },

  eliminarUsuario: async (id: number): Promise<void> => {
    await axios.delete(`${BaseUrl}usuarios/${id}`);
  },
};
