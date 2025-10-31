import React, { createContext, useReducer } from 'react';
import { appReducer, initialState } from './AppReducer';

export const AppContext = createContext();

export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
