import { addCategoriasSlice, Categorias } from "../store/categorias/slice";
import { useAppDispatch } from "./store";

export const useCategoriaActions = () => {
  const dispatch = useAppDispatch();

  const addCategorias = (props: Categorias) => {
    dispatch(addCategoriasSlice(props));
  };

  return { addCategorias };
};
