import axios from "axios";
import { User } from "./Users";

export interface Location {
  id: number;
  deleted: boolean;
  createdAt: string;
  createdBy: User;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}

export type CreateLocation = Omit<Location, "id" | "deleted" | "createdAt" | "createdBy">;
export type UpdateLocation = Omit<Location, "id" | "deleted" | "createdAt" | "createdBy">;

export interface Locations {
  getAll(): Promise<Location[]>;
  get(id: number): Promise<Location>;
  add(location: CreateLocation): Promise<Location>;
  update(id: number, location: UpdateLocation): Promise<Location>;
  deleteLocation(id: number): Promise<void>;
}

export default function useLocations(): Locations {
  const getAll = async (): Promise<Location[]> => {
    return axios.get("http://localhost:8080/api/v1/locations").then((res) => res.data);
  };

  const get = async (id: number): Promise<Location> => {
    return axios.get(`http://localhost:8080/api/v1/locations/${id}`).then((res) => res.data);
  };

  const add = async (location: CreateLocation): Promise<Location> => {
    return axios.post("http://localhost:8080/api/v1/locations", location).then((res) => res.data);
  };

  const update = async (id: number, location: UpdateLocation): Promise<Location> => {
    return axios.put(`http://localhost:8080/api/v1/locations/${id}`, location).then((res) => res.data);
  };

  const deleteLocation = async (id: number): Promise<void> => {
    return axios.delete(`http://localhost:8080/api/v1/locations/${id}`).then((res) => res.data);
  };

  return {
    getAll,
    get,
    add,
    update,
    deleteLocation,
  };
}
