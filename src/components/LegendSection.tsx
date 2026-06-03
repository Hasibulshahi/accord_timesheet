function LegendSection() {
  return (
    <section className="legend-section" aria-label="Leave legend">
      <div className="legend-grid">
        <div className="legend-item code-al">AL/L - Annual Leave</div>
        <div className="legend-item code-ph">PH - Public Holiday</div>
        <div className="legend-item code-unpaid">U/UL Unpaid leave</div>
        <div className="legend-item code-slmc">SL/MC - Sick Leave</div>
        <div className="legend-item code-comp">C - Compensatory Off</div>
        <div className="weekend-pair">
          <span className="legend-item code-weekend">Sat</span>
          <span className="legend-item code-weekend">Sun</span>
        </div>
      </div>
    </section>
  )
}

export default LegendSection
