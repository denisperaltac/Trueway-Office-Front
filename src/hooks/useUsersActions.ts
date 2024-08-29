import { deleteUsuario } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUsersActions = () => {
  const dispatch = useAppDispatch();

  const removeUser = (id: Number) => {
    dispatch(deleteUsuario(id));
  };
  return { removeUser };
};
