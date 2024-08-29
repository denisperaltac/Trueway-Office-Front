import { logIn, logOut, User } from "../store/user/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const logInUser = (props: User) => {
    dispatch(logIn(props));
  };

  const logOutUser = () => {
    dispatch(logOut());
  };
  return { logInUser, logOutUser };
};
