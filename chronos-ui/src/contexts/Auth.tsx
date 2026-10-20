import useLocalStorage from "@/services/LocalStorage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useSnackbarContext } from "./Snacks";

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
}

export type Role = "ADMIN" | "MANAGER" | "EMPLOYEE";

export interface Auth {
  isAuthenticated: boolean;
  user: UserDetails | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<Auth>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: async () => {}
});

export function AuthProvider({ children }: AuthProviderProps) {
  const localStorage = useLocalStorage();
  const { showError } = useSnackbarContext();

  const [initialized, setInitialized] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserDetails | null>(null);

  const login = (email: string, password: string) => {
    const payload = { email, password };
    return axios.post("http://localhost:8080/api/v1/auth/login", payload)
      .then(response => {
        const token = response.data.authToken;
        const parsedToken = jwtDecode(token) as {
          firstName: string;
          lastName: string;
          sub: string;
          roles: Role[];
        };
        setUser({
          firstName: parsedToken.firstName,
          lastName: parsedToken.lastName,
          email: parsedToken.sub,
          roles: parsedToken.roles
        });
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
      })
      .catch(error => showError(error.message, "Failed to login"));
  }

  const logout = () => {
    const payload = {};
    const config = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    };
    return axios.post("http://localhost:8080/api/v1/auth/logout", payload, config)
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUser(null);
        }
      })
      .catch(error => showError(error.message, "Failed to logout"));
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = jwtDecode(token) as {
        firstName: string;
        lastName: string;
        sub: string;
        roles: Role[];
      };
      setUser({
        firstName: parsedToken.firstName,
        lastName: parsedToken.lastName,
        email: parsedToken.sub,
        roles: parsedToken.roles
      });

      axios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      axios.interceptors.response.use(
        response => response,
        error => {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setUser(null);
            // TODO: navigate to login page
            // navigate("/login");
          }
          return Promise.reject(error);
        }
      );

      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    setInitialized(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        user: user,
        login: login,
        logout: logout
      }}
    >
      {initialized && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
}