import { useState, useEffect } from "react";
import { Usuario, UsuarioFormData } from "../../types/usuario";
import { usuarioService } from "../../services/usuarioService";
import { UsuarioForm } from "./components/UsuarioForm";
import { UsuarioList } from "./components/UsuarioList";

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] =
    useState<Usuario | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);

  const cargarUsuarios = async () => {
    try {
      const data = await usuarioService.obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleCrearUsuario = async (usuario: Omit<Usuario, "userId">) => {
    try {
      await usuarioService.crearUsuario(usuario as UsuarioFormData);
      await cargarUsuarios();
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  const handleActualizarUsuario = async (
    id: number,
    usuario: Omit<Usuario, "userId">
  ) => {
    try {
      await usuarioService.actualizarUsuario(id, usuario as UsuarioFormData);
      await cargarUsuarios();
      setUsuarioSeleccionado(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleEliminarUsuario = async (id: number) => {
    if (window.confirm("¿Está seguro de que desea eliminar este usuario?")) {
      try {
        await usuarioService.eliminarUsuario(id);
        await cargarUsuarios();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <button
          onClick={() => {
            setUsuarioSeleccionado(null);
            setMostrarFormulario(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nuevo Usuario
        </button>
      </div>

      {mostrarFormulario && (
        <UsuarioForm
          usuario={usuarioSeleccionado}
          onSubmit={
            usuarioSeleccionado
              ? (data) =>
                  handleActualizarUsuario(usuarioSeleccionado.userId, data)
              : handleCrearUsuario
          }
          onCancel={() => {
            setMostrarFormulario(false);
            setUsuarioSeleccionado(null);
          }}
        />
      )}

      <UsuarioList
        usuarios={usuarios}
        onEdit={(usuario) => {
          setUsuarioSeleccionado(usuario);
          setMostrarFormulario(true);
        }}
        onDelete={handleEliminarUsuario}
      />
    </div>
  );
};
