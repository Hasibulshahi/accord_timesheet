import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import FormattedDateInput from './FormattedDateInput'

function toIsoLocalDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function SignatureField({
  label,
  value,
  isDate = false,
  onDateChange,
}: {
  label: string
  value?: string
  isDate?: boolean
  onDateChange?: (value: string) => void
}) {
  return (
    <div className="signature-field">
      <span className="signature-line" />
      <div className="signature-caption">
        <span className="signature-label">{label}</span>
        {isDate ? (
          <FormattedDateInput
            className="signature-date-input"
            value={value ?? ''}
            onChange={(nextValue) => onDateChange?.(nextValue)}
          />
        ) : (
          <span className="signature-date">{value ?? ''}</span>
        )}
      </div>
    </div>
  )
}

function CertificationSection() {
  const [employeeDate, setEmployeeDate] = useState(() => toIsoLocalDate(new Date()))
  const [supervisorDate, setSupervisorDate] = useState('')
  const [employeeSignaturePreview, setEmployeeSignaturePreview] = useState('')

  const handleEmployeeSignatureUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (employeeSignaturePreview) {
      URL.revokeObjectURL(employeeSignaturePreview)
      setEmployeeSignaturePreview('')
    }

    if (file?.type.startsWith('image/')) {
      setEmployeeSignaturePreview(URL.createObjectURL(file))
    }
  }

  useEffect(
    () => () => {
      if (employeeSignaturePreview) {
        URL.revokeObjectURL(employeeSignaturePreview)
      }
    },
    [employeeSignaturePreview],
  )

  return (
    <section className="certification-section">
      <p>I CERTIFY THAT THE ABOVE IS A TRUE RECORD OF MY TIME FOR THIS PERIOD.</p>
      <div className="signature-grid">
        <div className="signature-stack">
          <label className="signature-preview-area" aria-label="Upload employee signature">
            {employeeSignaturePreview ? (
              <img
                className="signature-preview-image"
                src={employeeSignaturePreview}
                alt="Employee signature preview"
              />
            ) : (
              <span className="signature-preview-placeholder">
                Click to upload signature
              </span>
            )}
            <input
              className="signature-upload-input"
              type="file"
              accept="image/*"
              aria-label="Upload employee signature"
              onChange={handleEmployeeSignatureUpload}
            />
          </label>
          <SignatureField label="Employee Name & Signature" />
        </div>
        <div className="signature-stack signature-date-stack">
          <SignatureField
            label="Date"
            value={employeeDate}
            isDate
            onDateChange={setEmployeeDate}
          />
        </div>
      </div>
      <div className="signature-grid second-row">
        <SignatureField label="Supervisor Name & Signature" />
        <SignatureField
          label="Date"
          value={supervisorDate}
          isDate
          onDateChange={setSupervisorDate}
        />
      </div>
    </section>
  )
}

export default CertificationSection
