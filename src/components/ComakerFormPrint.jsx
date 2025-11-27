import React, { forwardRef } from "react";

const styles = `
@media print {
  /* Force A4 clean layout */
  @page {
    size: A4;
    margin: 18mm;
  }

  body {
    -webkit-print-color-adjust: exact;
  }

  /* Prevent elements from breaking inside pages */
  .avoid-break {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  /* Elements that must begin on next page */
  .page-break {
    page-break-before: always !important;
    break-before: page !important;
  }

  /* Prevent signature from floating to the top of page */
  .signature-block {
    page-break-before: avoid !important;
    break-before: avoid-page !important;
    margin-top: 40px !important;
  }
}
`;

const ComakerPrintable = forwardRef(
  ({ comaker, address, FORM_LABELS }, ref) => {
    return (
      <div
        ref={ref}
        style={{ padding: "20px", fontFamily: "Arial", fontSize: "14px" }}
      >
        {/* Inject print CSS */}
        <style>{styles}</style>

        {/* Title */}
        <div
          className="avoid-break"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <h1 style={{ fontSize: "26px", marginBottom: "8px" }}>
            Co-Maker Information Sheet
          </h1>
          <p>(Generated through the Loan Management System)</p>
        </div>

        {/* Personal Information */}
        <div className="avoid-break" style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
            Personal Information
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              rowGap: "10px",
            }}
          >
            {Object.entries(FORM_LABELS.comaker).map(([key, label]) => (
              <div key={key}>
                <strong>{label}: </strong> {comaker[key] || ""}
              </div>
            ))}
          </div>
        </div>

        {/* Addresses */}
        <div className="avoid-break" style={{ marginBottom: "30px" }}>
          {["comaker_pres", "comaker_perm"].map((val) => (
            <div key={val} style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>
                {FORM_LABELS.address[val]}
              </h3>
              <p>{address[val] || ""}</p>
            </div>
          ))}
        </div>

        {/* Spouse Information */}
        <div className="avoid-break" style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
            Spouse Information
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              rowGap: "10px",
            }}
          >
            {Object.entries(FORM_LABELS.comaker_spouse).map(([key, label]) => (
              <div key={key}>
                <strong>{label}: </strong> {comaker[key] || ""}
              </div>
            ))}
          </div>
        </div>

        {/* Father */}
        <div className="avoid-break" style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
            Father's Name
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              rowGap: "10px",
            }}
          >
            {["sp_father_first", "sp_father_middle", "sp_father_last"].map(
              (key) => (
                <div key={key}>
                  <strong>{FORM_LABELS.other[key]}: </strong>{" "}
                  {comaker[key] || ""}
                </div>
              )
            )}
          </div>
        </div>

        {/* Mother */}
        <div className="avoid-break" style={{ marginBottom: "40px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
            Mother's Name
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              rowGap: "10px",
            }}
          >
            {["sp_mother_first", "sp_mother_middle", "sp_mother_last"].map(
              (key) => (
                <div key={key}>
                  <strong>{FORM_LABELS.other[key]}: </strong>{" "}
                  {comaker[key] || ""}
                </div>
              )
            )}
          </div>
        </div>

        <div
          className="signature-block avoid-break"
          style={{
            marginTop: "100px",
            display: "flex",
            justifyContent: "flex-end", // aligns block to the right
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "250px",
                borderTop: "2px solid #000",
                margin: "20px auto", // centers the line inside the block
              }}
            ></div>
            <p style={{ marginTop: "6px" }}>Signature</p>
          </div>
        </div>

        {/* End of Document */}
        <div className="page-break" />

        <p style={{ textAlign: "center", marginTop: "40px" }}>
          <i>End of Document</i>
        </p>
      </div>
    );
  }
);

export default ComakerPrintable;
