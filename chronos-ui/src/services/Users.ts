import { Role } from "@/contexts/Auth";
import axios from "axios";

export interface User {
  id: number;
  deleted: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  roles: Role[];
}

export type CreateUser = Omit<User, "id" | "deleted">;
export type UpdateUser = Omit<User, "id" | "deleted" | "roles">;

export interface Users {
  getAll(): Promise<User[]>;
  get(id: number): Promise<User>;
  self(): Promise<User>;
  add(user: CreateUser): Promise<User>;
  update(id: number, user: UpdateUser): Promise<User>;
  deleteUser(id: number): Promise<void>;
  assignRole(id: number, role: Role): Promise<User>;
  removeRole(id: number, role: Role): Promise<User>;
}

export default function useUsers(): Users {
  const getAll = async (): Promise<User[]> => {
    return axios.get("http://localhost:8080/api/v1/users").then((res) => res.data);
  };

  const get = async (id: number): Promise<User> => {
    return axios.get(`http://localhost:8080/api/v1/users/${id}`).then((res) => res.data);
  };

  const self = async (): Promise<User> => {
    return axios.get("http://localhost:8080/api/v1/users/self").then((res) => res.data);
  };

  const add = async (user: CreateUser): Promise<User> => {
    return axios.post("http://localhost:8080/api/v1/users", user).then((res) => res.data);
  };

  const update = async (id: number, user: UpdateUser): Promise<User> => {
    return axios.put(`http://localhost:8080/api/v1/users/${id}`, user).then((res) => res.data);
  };

  const deleteUser = async (id: number): Promise<void> => {
    return axios.delete(`http://localhost:8080/api/v1/users/${id}`).then((res) => res.data);
  };

  const assignRole = async (id: number, role: Role): Promise<User> => {
    return axios.patch(`http://localhost:8080/api/v1/users/${id}/assign-role`, { role }).then((res) => res.data);
  };

  const removeRole = async (id: number, role: Role): Promise<User> => {
    return axios.patch(`http://localhost:8080/api/v1/users/${id}/remove-role`, { role }).then((res) => res.data);
  };

  return {
    getAll,
    get,
    self,
    add,
    update,
    deleteUser: deleteUser,
    assignRole,
    removeRole,
  };
}
