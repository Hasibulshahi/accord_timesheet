import { useMemo, useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import HeaderSection from './components/HeaderSection'
import EmployeeInfo from './components/EmployeeInfo'
import TimesheetTable from './components/TimesheetTable'
import LeaveDetails from './components/LeaveDetails'
import CertificationSection from './components/CertificationSection'
import LegendSection from './components/LegendSection'
import './App.css'
import type { EmployeeInfo as EmployeeInfoModel, TimesheetDay } from './types'

function toIsoLocalDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function toDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function toSafeFilenamePart(value: string) {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function generateTimesheetDays(fromDate: string, toDateValue: string): TimesheetDay[] {
  const from = toDate(fromDate)
  const to = toDate(toDateValue)
  const baseDate = from ?? to ?? new Date()

  const year = baseDate.getFullYear()
  const month = baseDate.getMonth()
  const totalDays = new Date(year, month + 1, 0).getDate()

  return Array.from({ length: totalDays }, (_, index) => {
    const day = index + 1
    const current = new Date(year, month, day)
    const weekday = current.getDay()
    const isWeekend = weekday === 0 || weekday === 6

    const inRange =
      (!from || current >= from) &&
      (!to || current <= to)

    return {
      day,
      code: isWeekend ? (weekday === 6 ? 'Sat' : 'Sun') : inRange ? '1' : '',
    }
  })
}

function App() {
  const now = new Date()
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const [isExporting, setIsExporting] = useState(false)
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfoModel>({
    client: '',
    managerName: '',
    employeeName: '',
    employeeNumber: '',
    month: '',
    fromDate: toIsoLocalDate(startOfCurrentMonth),
    toDate: toIsoLocalDate(endOfCurrentMonth),
  })

  const handleInfoChange = (field: keyof EmployeeInfoModel, value: string) => {
    setEmployeeInfo((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const timesheetDays = useMemo(
    () => generateTimesheetDays(employeeInfo.fromDate, employeeInfo.toDate),
    [employeeInfo.fromDate, employeeInfo.toDate],
  )

  const handleDownloadPdf = async () => {
    const timesheetElement = document.querySelector('.timesheet-page') as HTMLElement | null
    if (!timesheetElement) {
      return
    }

    setIsExporting(true)

    try {
      const exportScale = Math.min(window.devicePixelRatio || 1, 1.5)
      const jpegQuality = 0.72

      const canvas = await html2canvas(timesheetElement, {
        scale: exportScale,
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (clonedDocument) => {
          const clonedPage = clonedDocument.querySelector('.timesheet-page')
          if (!clonedPage) {
            return
          }

          const dateInputs = clonedPage.querySelectorAll<HTMLInputElement>(
            '.date-input, .signature-date-input',
          )

          dateInputs.forEach((input) => {
            const replacement = clonedDocument.createElement('span')
            replacement.className = 'pdf-date-text'
            replacement.textContent = input.value

            const computed = clonedDocument.defaultView?.getComputedStyle(input)
            if (computed) {
              replacement.style.display = 'inline-block'
              replacement.style.width = computed.width
              replacement.style.minWidth = computed.minWidth
              replacement.style.fontSize = computed.fontSize
              replacement.style.fontWeight = computed.fontWeight
              replacement.style.fontStyle = computed.fontStyle
              replacement.style.lineHeight = computed.lineHeight
              replacement.style.letterSpacing = computed.letterSpacing
              replacement.style.color = computed.color
              replacement.style.whiteSpace = 'nowrap'
              replacement.style.verticalAlign = 'middle'
            }

            input.replaceWith(replacement)
          })

          const carryInput = clonedPage.querySelector<HTMLInputElement>('.carry-input')
          if (carryInput) {
            const carryReplacement = clonedDocument.createElement('span')
            carryReplacement.className = 'pdf-carry-text'
            carryReplacement.textContent = carryInput.value

            const computed = clonedDocument.defaultView?.getComputedStyle(carryInput)
            if (computed) {
              carryReplacement.style.display = 'inline-block'
              carryReplacement.style.width = computed.width
              carryReplacement.style.minWidth = computed.minWidth
              carryReplacement.style.fontSize = computed.fontSize
              carryReplacement.style.fontWeight = computed.fontWeight
              carryReplacement.style.fontStyle = computed.fontStyle
              carryReplacement.style.lineHeight = computed.lineHeight
              carryReplacement.style.letterSpacing = computed.letterSpacing
              carryReplacement.style.color = computed.color
              carryReplacement.style.whiteSpace = 'normal'
              carryReplacement.style.textAlign = 'left'
              carryReplacement.style.verticalAlign = 'middle'
            }

            carryInput.replaceWith(carryReplacement)
          }
        },
      })

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height)
      const imageWidth = canvas.width * ratio
      const imageHeight = canvas.height * ratio
      const x = (pageWidth - imageWidth) / 2
      const y = (pageHeight - imageHeight) / 2
      const safeEmployeeName = toSafeFilenamePart(employeeInfo.employeeName)
      const fileName = `${safeEmployeeName || 'employee'}-timesheet.pdf`
      const imageData = canvas.toDataURL('image/jpeg', jpegQuality)

      pdf.addImage(imageData, 'JPEG', x, y, imageWidth, imageHeight, undefined, 'FAST')
      pdf.save(fileName)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <button
        className="download-pdf-btn"
        type="button"
        onClick={handleDownloadPdf}
        disabled={isExporting}
      >
        {isExporting ? 'Generating PDF...' : 'Download PDF'}
      </button>

      <main className="timesheet-page">
        <HeaderSection />
        <EmployeeInfo info={employeeInfo} onFieldChange={handleInfoChange} />
        <TimesheetTable days={timesheetDays} />

        <section className="lower-area">
          <div className="left-lower">
            <CertificationSection />
            <LegendSection />
          </div>
          <div className="right-lower">
            <LeaveDetails />
          </div>
        </section>
      </main>
    </>
  )
}

export default App
