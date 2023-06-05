import React from "react";
import { useAppDispatch } from "./features/Hook";
import { authBoot } from "./features/auth/authSlice";

interface AuthProviderInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

const AuthProvider = ({ children }: AuthProviderInterface) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(authBoot());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{children}</div>;
};

export default AuthProvider;
