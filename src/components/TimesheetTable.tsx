import { useEffect, useState } from 'react'
import type { TimesheetDay } from '../types'

interface TimesheetTableProps {
  days: TimesheetDay[]
}

const codeClassMap: Record<string, string> = {
  PH: 'code-ph',
  AL: 'code-al',
  SL: 'code-slmc',
  MC: 'code-slmc',
  Sat: 'code-weekend',
  Sun: 'code-weekend',
  U: 'code-unpaid',
  UL: 'code-unpaid',
  C: 'code-comp',
}

const leaveCycle = ['', '0.5', 'SL', 'AL', 'PH'] as const

function TimesheetTable({ days }: TimesheetTableProps) {
  const [selectedLeaveCodes, setSelectedLeaveCodes] = useState<Record<number, string>>({})

  useEffect(() => {
    setSelectedLeaveCodes((previous) => {
      const next: Record<number, string> = {}

      days.forEach((day) => {
        next[day.day] = previous[day.day] ?? ''
      })

      return next
    })
  }, [days])

  const handleLeaveChange = (day: number, code: string) => {
    setSelectedLeaveCodes((previous) => ({
      ...previous,
      [day]: code,
    }))
  }

  const handleLeaveCycle = (day: number) => {
    const currentCode = selectedLeaveCodes[day] ?? ''
    const currentIndex = leaveCycle.indexOf(
      currentCode as (typeof leaveCycle)[number],
    )
    const nextCode = leaveCycle[(currentIndex + 1) % leaveCycle.length]
    handleLeaveChange(day, nextCode)
  }

  return (
    <section className="timesheet-table-section">
      <table className="timesheet-table">
        <thead>
          <tr>
            <th className="row-label">DATE</th>
            {days.map((item) => (
              <th key={item.day}>{item.day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="row-label">Working Day</th>
            {days.map((item) => {
              const selectedCode = selectedLeaveCodes[item.day] ?? ''
              const displayCode = selectedCode || item.code

              return (
                <td
                  key={item.day}
                  className={codeClassMap[displayCode] ?? ''}
                  title={displayCode}
                >
                  <button
                    type="button"
                    aria-label={`Working day code for day ${item.day}`}
                    className={`working-day-picker ${codeClassMap[displayCode] ?? ''}`}
                    onClick={() => handleLeaveCycle(item.day)}
                  >
                    {displayCode || '-'}
                  </button>
                </td>
              )
            })}
          </tr>
          <tr>
            <th className="row-label">(Day 1 or 0.5 only)</th>
            {days.map((item) => (
              <td key={item.day}>
                <input
                  aria-label={`Day ${item.day} value`}
                  defaultValue={item.value ?? ''}
                  className="time-input"
                  maxLength={3}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="update-note">
        Please update leave with the respective alphabets against the corresponding dates.
      </p>
    </section>
  )
}

export default TimesheetTable
