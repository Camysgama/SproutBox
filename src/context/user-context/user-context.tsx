import { createContext, ReactNode, useEffect, useState } from "react";

export const UserContext = createContext<IUser | null>(null);

export interface IUser {
  id?: string;
  setId(id: string): void;
  isSignedIn: boolean;
  setIsSignedIn(isSignedIn: boolean): void;
}

interface IUserContextProvider {
  children: ReactNode;
}

interface IStorageUser {
  id: string;
  isSignedIn: boolean;
}

export function UserContextProvider({ children }: IUserContextProvider) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const user: IStorageUser = JSON.parse(
      localStorage.getItem("user") ??
        JSON.stringify({ id: null, isSignedIn: null }),
    );
    if (user.isSignedIn == true) {
      setId(user.id);
      setIsSignedIn(user.isSignedIn);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id,
        isSignedIn,
      }),
    );
  }, [id, isSignedIn]);

  return (
    <UserContext.Provider value={{ id, setId, isSignedIn, setIsSignedIn }}>
      {children}
    </UserContext.Provider>
  );
}
