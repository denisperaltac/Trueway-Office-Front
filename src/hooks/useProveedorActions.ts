import { addProveedorSlice, Proveedores } from "../store/proveedor/slice";
import { useAppDispatch } from "./store";

export const useProveedorActions = () => {
  const dispatch = useAppDispatch();

  const addProveedor = (props: Proveedores) => {
    dispatch(addProveedorSlice(props));
  };

  return { addProveedor };
};
