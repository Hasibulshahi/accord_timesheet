export interface EmployeeInfo {
  client: string
  managerName: string
  employeeName: string
  employeeNumber: string
  month: string
  fromDate: string
  toDate: string
}

export interface TimesheetDay {
  day: number
  code: string
  value?: number
}
