export interface EmployeeInsertRequest {
  name: string;
  jobRole: string;
  salary: string;
  employeeRegistration: string;
  birth: Date;
}

export interface Employee {
  id: string;
  name: string;
  jobRole: string;
  salary: string;
  birth: Date;
  employeeRegistration: string;
}

export interface EmployeeResponse {
  message: string;
  response: Employee;
}

export interface EmployeeListResponse {
  message: string;
  response: Array<Employee>;
}

export interface CountResponse {
  message: string;
  response: number;
}
