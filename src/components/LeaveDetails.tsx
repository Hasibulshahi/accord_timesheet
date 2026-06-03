const leaveRows = [
  { no: 1, date: '', no2: 1, date2: '', no3: 1, no4: 1 },
  { no: 2, date: '', no2: 2, date2: '', no3: 2, no4: 2 },
  { no: 3, date: '', no2: 3, date2: '', no3: 3, no4: 3 },
  { no: 4, date: '', no2: 4, date2: '', no3: 4, no4: 4 },
  { no: 5, date: '', no2: 5, date2: '', no3: 5, no4: 5 },
  { no: 6, date: '', no2: 6, date2: '', no3: 6, no4: 6 },
  { no: 7, date: '', no2: 7, date2: '', no3: 7, no4: 7 },
  { no: 8, date: '', no2: 8, date2: '', no3: '', no4: '' },
  { no: 9, date: '', no2: 9, date2: '', no3: 1, no4: 5 },
  { no: 10, date: '', no2: 10, date2: '', no3: 2, no4: 6 },
  { no: 11, date: '', no2: 11, date2: '', no3: 3, no4: 7 },
  { no: 12, date: '', no2: 12, date2: '', no3: 4, no4: 8 },
]

function LeaveDetails() {
  return (
    <aside className="leave-panel">
      <table className="leave-details-table">
        <tbody>
          <tr>
            <th colSpan={8} className="leave-title">
              LEAVE DETAILS
            </th>
          </tr>
          <tr>
            <th className="summary-label blue-cell">Total available AL</th>
            <td className="summary-value">
              <input className="leave-input" type="text" aria-label="Total available AL" defaultValue="" />
            </td>
            <th className="summary-label green-cell">Total available SL</th>
            <td className="summary-value">
              <input className="leave-input" type="text" aria-label="Total available SL" defaultValue="" />
            </td>
            <th className="summary-label beige-cell">Available Comp-off</th>
            <td className="summary-value">
              <input className="leave-input" type="text" aria-label="Available Comp-off" defaultValue="" />
            </td>
            <td className="unpaid-cell" rowSpan={3} colSpan={2}>
              Unpaid Leave
            </td>
          </tr>
          <tr>
            <th className="summary-label blue-cell">AL Used</th>
            <td className="summary-value">
              <input className="leave-input" type="text" aria-label="AL Used" defaultValue="" />
            </td>
            <th className="summary-label green-cell">SL Used</th>
            <td className="summary-value">
              <input className="leave-input" type="text" aria-label="SL Used" defaultValue="" />
            </td>
            <th className="summary-label beige-cell">C/O used</th>
            <td className="summary-value">
              <input className="leave-input" type="text" aria-label="C/O used" defaultValue="" />
            </td>
          </tr>
          <tr>
            <th className="summary-label blue-cell">Balance AL</th>
            <td className="summary-value">
              <input className="leave-input" type="text" aria-label="Balance AL" defaultValue="" />
            </td>
            <th className="summary-label green-cell">Balance SL</th>
            <td className="summary-value">
              <input className="leave-input" type="text" aria-label="Balance SL" defaultValue="" />
            </td>
            <th className="summary-label beige-cell">Balance Comp-off</th>
            <td className="summary-value">
              <input className="leave-input" type="text" aria-label="Balance Comp-off" defaultValue="" />
            </td>
          </tr>
          <tr>
            <th colSpan={8} className="leave-note-head">
              Please update leave dates below:
            </th>
          </tr>
          <tr>
            <th className="detail-header">No.</th>
            <th className="detail-header">Date</th>
            <th className="detail-header">No.</th>
            <th className="detail-header">Date</th>
            <th className="detail-header">No.</th>
            <th className="detail-header">Date</th>
            <th className="detail-header">No.</th>
            <th className="detail-header">Date</th>
          </tr>
          {leaveRows.map((row) => (
            <tr key={row.no}>
              {row.no === 8 ? (
                <>
                  <td className="detail-no">
                    <input className="leave-input leave-center" type="text" aria-label={`Row ${row.no} number 1`} defaultValue={row.no} />
                  </td>
                  <td className="detail-date">
                    <input className="leave-input" type="text" aria-label={`Row ${row.no} date 1`} defaultValue={row.date} />
                  </td>
                  <td className="detail-no">
                    <input className="leave-input leave-center" type="text" aria-label={`Row ${row.no} number 2`} defaultValue={row.no2} />
                  </td>
                  <td className="detail-date">
                    <input className="leave-input" type="text" aria-label={`Row ${row.no} date 2`} defaultValue={row.date2} />
                  </td>
                <td className="carry-row" colSpan={4}>
                  <input
                    className="leave-input carry-input"
                    type="text"
                    aria-label="AL carry forward-days approved by PM"
                    defaultValue="AL carry forward-days approved by PM:"
                  />
                </td>
                </>
              ) : (
                <>
                  <td className="detail-no">
                    <input className="leave-input leave-center" type="text" aria-label={`Row ${row.no} number 1`} defaultValue={row.no} />
                  </td>
                  <td className="detail-date">
                    <input className="leave-input" type="text" aria-label={`Row ${row.no} date 1`} defaultValue={row.date} />
                  </td>
                  <td className="detail-no">
                    <input className="leave-input leave-center" type="text" aria-label={`Row ${row.no} number 2`} defaultValue={row.no2} />
                  </td>
                  <td className="detail-date">
                    <input className="leave-input" type="text" aria-label={`Row ${row.no} date 2`} defaultValue={row.date2} />
                  </td>
                  <td className="detail-no">
                    <input className="leave-input leave-center" type="text" aria-label={`Row ${row.no} number 3`} defaultValue={row.no3} />
                  </td>
                  <td className="detail-date">
                    <input className="leave-input" type="text" aria-label={`Row ${row.no} date 3`} defaultValue={''} />
                  </td>
                  <td className="detail-no">
                    <input className="leave-input leave-center" type="text" aria-label={`Row ${row.no} number 4`} defaultValue={row.no4} />
                  </td>
                  <td className="detail-date">
                    <input className="leave-input" type="text" aria-label={`Row ${row.no} date 4`} defaultValue={''} />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  )
}

export default LeaveDetails
