import React, { useEffect, createContext, useState } from "react";
import { makeUnauthenticatedGetMySongRequest} from "../utils/serverHelpers";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  console.log(currentUser)

  useEffect (() => {
    const getCurrentUser = async () => {
        try {
            const response = await makeUnauthenticatedGetMySongRequest('/auth/info')
            setCurrentUser(response)
        }
        catch (error) {
            console.log("Error fetching info user: ", error)
        }
    }
    getCurrentUser()
  }, [currentUser])

  return (
    <authContext.Provider value={{ currentUser }}>
      {children}
    </authContext.Provider>
  );
}

export default authContext;
