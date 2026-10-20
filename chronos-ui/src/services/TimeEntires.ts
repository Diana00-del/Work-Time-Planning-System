import axios from "axios";
import { User } from "./Users";
import { Location } from "./Locations";

export interface TimeEntry {
  id: number;
  createdAt: string;
  createdBy: User;
  user: User;
  location: Location;
  startTime: string;
  endTime: string;
  description: string;
  status: TimeEntryStatus;
  rejectionReason: string;
}

export type TimeEntryStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';

export type CreateTimeEntry = {
  userId: number;
  locationId: number;
  startTime: string;
  endTime: string;
  description: string;
};
export type UpdateTimeEntry = {
  userId: number;
  locationId: number;
  startTime: string;
  endTime: string;
  description: string;
};
export type MoveTimeEntry = { startTime: string; endTime: string };
export type RejectTimeEntry = { reason: string };

export interface TimeEntries {
  getAll(): Promise<TimeEntry[]>;
  get(id: number): Promise<TimeEntry>;
  add(timeEntry: CreateTimeEntry): Promise<TimeEntry>;
  addSubmitted(timeEntry: CreateTimeEntry): Promise<TimeEntry>;
  update(id: number, timeEntry: UpdateTimeEntry): Promise<TimeEntry>;
  moveTimeEntry(id: number, moveTimeEntry: MoveTimeEntry): Promise<TimeEntry>;
  deleteTimeEntry(id: number): Promise<void>;
  submitTimeEntry(id: number): Promise<TimeEntry>;
  approveTimeEntry(id: number): Promise<TimeEntry>;
  rejectTimeEntry(id: number, reason: string): Promise<TimeEntry>;
}

export default function useTimeEntries(): TimeEntries {
  const getAll = async (): Promise<TimeEntry[]> => {
    return axios.get("http://localhost:8080/api/v1/time-entries").then((res) => res.data);
  };

  const get = async (id: number): Promise<TimeEntry> => {
    return axios.get(`http://localhost:8080/api/v1/time-entries/${id}`).then((res) => res.data);
  };

  const add = async (timeEntry: CreateTimeEntry): Promise<TimeEntry> => {
    return axios.post("http://localhost:8080/api/v1/time-entries", timeEntry).then((res) => res.data);
  };

  const addSubmitted = async (timeEntry: CreateTimeEntry): Promise<TimeEntry> => {
    return axios.post("http://localhost:8080/api/v1/time-entries/submitted", timeEntry).then((res) => res.data);
  };

  const update = async (id: number, timeEntry: UpdateTimeEntry): Promise<TimeEntry> => {
    return axios.put(`http://localhost:8080/api/v1/time-entries/${id}`, timeEntry).then((res) => res.data);
  };

  const moveTimeEntry = async (id: number, moveTimeEntry: MoveTimeEntry): Promise<TimeEntry> => {
    return axios.patch(`http://localhost:8080/api/v1/time-entries/${id}/move`, moveTimeEntry).then((res) => res.data);
  };

  const deleteTimeEntry = async (id: number): Promise<void> => {
    return axios.delete(`http://localhost:8080/api/v1/time-entries/${id}`).then((res) => res.data);
  };

  const submitTimeEntry = async (id: number): Promise<TimeEntry> => {
    return axios.patch(`http://localhost:8080/api/v1/time-entries/${id}/submit`).then((res) => res.data);
  };

  const approveTimeEntry = async (id: number): Promise<TimeEntry> => {
    return axios.patch(`http://localhost:8080/api/v1/time-entries/${id}/approve`).then((res) => res.data);
  };

  const rejectTimeEntry = async (id: number, reason: string): Promise<TimeEntry> => {
    return axios.patch(`http://localhost:8080/api/v1/time-entries/${id}/reject`, { rejectionReason: reason }).then((res) => res.data);
  };

  return {
    getAll,
    get,
    add,
    addSubmitted,
    update,
    moveTimeEntry,
    deleteTimeEntry,
    submitTimeEntry,
    approveTimeEntry,
    rejectTimeEntry,
  };
}
