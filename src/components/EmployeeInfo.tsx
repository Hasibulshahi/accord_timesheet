import FormattedDateInput from './FormattedDateInput'
import type { EmployeeInfo as EmployeeInfoModel } from '../types'

interface EmployeeInfoProps {
  info: EmployeeInfoModel
  onFieldChange: (field: keyof EmployeeInfoModel, value: string) => void
}

function UnderlineField({
  label,
  value,
  field,
  onFieldChange,
  type = 'text',
}: {
  label: string
  value: string
  field: keyof EmployeeInfoModel
  onFieldChange: (field: keyof EmployeeInfoModel, value: string) => void
  type?: 'text' | 'date'
}) {
  return (
    <div className="field-row">
      <span className="field-label">{label}</span>
      <span className="field-value">
        <input
          className={`field-input ${type === 'date' ? 'date-input' : ''}`}
          value={value}
          type={type}
          onChange={(event) => onFieldChange(field, event.target.value)}
        />
      </span>
    </div>
  )
}

function EmployeeInfo({ info, onFieldChange }: EmployeeInfoProps) {
  return (
    <section className="employee-info">
      <div className="employee-column">
        <UnderlineField
          label="Client:"
          value={info.client}
          field="client"
          onFieldChange={onFieldChange}
        />
        <UnderlineField
          label="Manager/TL Name:"
          value={info.managerName}
          field="managerName"
          onFieldChange={onFieldChange}
        />
      </div>
      <div className="employee-column">
        <UnderlineField
          label="Employee Name:"
          value={info.employeeName}
          field="employeeName"
          onFieldChange={onFieldChange}
        />
        <UnderlineField
          label="Employee Number:"
          value={info.employeeNumber}
          field="employeeNumber"
          onFieldChange={onFieldChange}
        />
        <div className="month-inline-row">
          <span className="field-label">Month</span>
          <span className="field-label">From:</span>
          <span className="field-value month-inline-value">
            <FormattedDateInput
              className="field-input date-input"
              value={info.fromDate}
              onChange={(value) => onFieldChange('fromDate', value)}
            />
          </span>
          <span className="field-label to-label">To:</span>
          <span className="field-value month-inline-value">
            <FormattedDateInput
              className="field-input date-input"
              value={info.toDate}
              onChange={(value) => onFieldChange('toDate', value)}
            />
          </span>
        </div>
      </div>
    </section>
  )
}

export default EmployeeInfo
