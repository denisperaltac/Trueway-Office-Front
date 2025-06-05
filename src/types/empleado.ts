export interface Empleado {
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  hireDate: string;
  salary: number;
  department: string;
  position: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: "active" | "inactive" | "on_leave";
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  hireDate: string;
  salary: number;
  department: string;
  position: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: "active" | "inactive" | "on_leave";
}
