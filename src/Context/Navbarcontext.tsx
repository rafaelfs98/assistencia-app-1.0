import { ReactNode, createContext, useEffect, useReducer } from "react";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        payload: M[Key];
        type: Key;
      };
};

type InitialState = {
  navBarVisible: boolean;
};

export const initialState: InitialState = {
  navBarVisible: true,
};

export enum NavbarTypes {
  SET_NAVBAR_VISIBLE = "SET_NAVBAR_VISIBLE",
}

export type NavbarActionsPayload = {
  [NavbarTypes.SET_NAVBAR_VISIBLE]: boolean;
};

export type AppActions =
  ActionMap<NavbarActionsPayload>[keyof ActionMap<NavbarActionsPayload>];

export const NavbarContext = createContext<
  [InitialState, (param: AppActions) => void]
>([initialState, () => null]);

const reducer = (state: InitialState, action: AppActions): InitialState => {
  switch (action.type) {
    case NavbarTypes.SET_NAVBAR_VISIBLE: {
      return {
        ...state,
        navBarVisible: action.payload,
      };
    }
    default:
      return state;
  }
};

export const NavbarContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NavbarContext.Provider value={[state, dispatch]}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext;
