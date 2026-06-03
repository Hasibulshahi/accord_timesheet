import { useState } from 'react'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function toDisplayDate(isoDate: string) {
  if (!isoDate) {
    return ''
  }

  const date = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const day = String(date.getDate()).padStart(2, '0')
  const month = MONTHS[date.getMonth()]
  const year = String(date.getFullYear()).slice(-2)

  return `${day}-${month}-${year}`
}

interface FormattedDateInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

function FormattedDateInput({ value, onChange, className }: FormattedDateInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <input
      className={className}
      type={isFocused ? 'date' : 'text'}
      value={isFocused ? value : toDisplayDate(value)}
      placeholder="DD-MMM-YY"
      readOnly={!isFocused}
      onFocus={(event) => {
        setIsFocused(true)
        setTimeout(() => {
          event.currentTarget.showPicker?.()
        }, 0)
      }}
      onBlur={() => setIsFocused(false)}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default FormattedDateInput
