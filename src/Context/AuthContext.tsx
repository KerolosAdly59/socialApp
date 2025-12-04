import React, {  useEffect, useState, type ReactNode } from 'react'

export type AuthContextType = {
  token: string | null;
  logout: () => void;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  insertUserToken: (tkn: string) => void;
};

export const authContext = React.createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {


  const [token, setToken] = useState<string | null>(null)



  function insertUserToken(tkn: string) {

    setToken(tkn)
    console.log(tkn);
  }

  function logout() {

    localStorage.removeItem("token");
    setToken(null)

  }

  useEffect(function () {
    if (localStorage.getItem("token") != null) {
      setToken(localStorage.getItem("token"))
    }
  }, [])

  return (
    <authContext.Provider value={{

      token,
      setToken,
      insertUserToken,
      logout,
    }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider
