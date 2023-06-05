import { createContext, useReducer, ReactNode, Dispatch } from "react";
import DarkModeReducer from "./darkModeReducer";

interface Props {
  children: ReactNode;
}

const INITIAL_STATE = {
  darkMode: false,
};

interface DarkModeContextType {
  darkMode: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: INITIAL_STATE.darkMode,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

export const DarkModeContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
