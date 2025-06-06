import { Area } from "../store/area/slice";

export interface Empleado {
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  hireDate: string;
  salary: number;
  areaId: number;
  area?: Area;
  position: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  status: "active" | "inactive" | "on_leave";
  documents?: any;
  deleted: boolean;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  hireDate: string;
  salary: number;
  areaId: number;
  position: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  status: "active" | "inactive" | "on_leave";
  documents?: any;
}
