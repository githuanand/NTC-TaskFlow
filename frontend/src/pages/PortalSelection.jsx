// ============================================================
// FILE: frontend/src/pages/PortalSelection.jsx
// PURPOSE: NTC Digital Platform - Portal Selection
// ============================================================

function PortalSelection() {

  // ============================================================
  // PORTAL NAVIGATION
  // ============================================================

  const openPortal = (portal) => {

    if (portal === "ntc") {
      window.location.href = "/#ntc";
      return;
    }

    if (portal === "student") {
      alert("Student Portal will be connected soon.");
      return;
    }

    if (portal === "admin") {
      alert("Admin Portal will be connected soon.");
      return;
    }

    if (portal === "teacher") {
      alert("Teacher Portal will be connected soon.");
      return;
    }

    if (portal === "results") {
      alert("Result Details will be connected soon.");
      return;
    }
  };


  // ============================================================
  // PORTAL UI
  // ============================================================

  return (
    <div className="portal-page">

      {/* ======================================================
          ATTRACTIVE BACKGROUND
          ====================================================== */}

      <div className="portal-background">

        <div className="background-orb orb-one"></div>
        <div className="background-orb orb-two"></div>
        <div className="background-orb orb-three"></div>

        <div className="background-grid"></div>

      </div>


      {/* ======================================================
          MAIN CONTAINER
          ====================================================== */}

      <div className="portal-container">


        {/* ====================================================
            HEADER
            ==================================================== */}

        <div className="portal-header">

          <div className="portal-logo">
            NTC
          </div>

          <div>
            <h1>
              NTC Digital Platform
            </h1>

            <p>
              Narayan Technical Classes
            </p>
          </div>

        </div>


        {/* ====================================================
            WELCOME
            ==================================================== */}

        <div className="portal-welcome">

          <span className="portal-label">
            DIGITAL ECOSYSTEM
          </span>

          <h2>
            Welcome to NTC
          </h2>

          <p>
            Select your portal to continue.
          </p>

        </div>


        {/* ====================================================
            PORTAL LIST
            ==================================================== */}

        <div className="portal-list">


          {/* ==================================================
              STUDENT PORTAL
              ================================================== */}

          <button
            type="button"
            className="portal-card student"
            onClick={() => openPortal("student")}
          >

            <div className="portal-icon">
              👤
            </div>

            <div className="portal-content">

              <h2>
                Student Portal
              </h2>

              <p>
                Continue as Student.
              </p>

            </div>

            <div className="portal-arrow">
              ›
            </div>

          </button>


          {/* ==================================================
              ADMIN PORTAL
              ================================================== */}

          <button
            type="button"
            className="portal-card admin"
            onClick={() => openPortal("admin")}
          >

            <div className="portal-icon">
              🏛️
            </div>

            <div className="portal-content">

              <h2>
                Admin Portal
              </h2>

              <p>
                Continue as Admin.
              </p>

            </div>

            <div className="portal-arrow">
              ›
            </div>

          </button>


          {/* ==================================================
              TEACHER PORTAL
              ================================================== */}

          <button
            type="button"
            className="portal-card teacher"
            onClick={() => openPortal("teacher")}
          >

            <div className="portal-icon">
              👨‍🏫
            </div>

            <div className="portal-content">

              <h2>
                Teacher Portal
              </h2>

              <p>
                Continue as Teacher.
              </p>

            </div>

            <div className="portal-arrow">
              ›
            </div>

          </button>


          {/* ==================================================
              NTC PORTAL
              ================================================== */}

          <button
            type="button"
            className="portal-card ntc"
            onClick={() => openPortal("ntc")}
          >

            <div className="portal-icon">
              🏢
            </div>

            <div className="portal-content">

              <h2>
                NTC Portal
              </h2>

              <p>
                Continue as NTC Staff.
              </p>

            </div>

            <div className="portal-arrow">
              ›
            </div>

          </button>


          {/* ==================================================
              RESULT DETAILS
              ================================================== */}

          <button
            type="button"
            className="portal-card results"
            onClick={() => openPortal("results")}
          >

            <div className="portal-icon">
              📊
            </div>

            <div className="portal-content">

              <h2>
                Result Details
              </h2>

              <p>
                View result details.
              </p>

            </div>

            <div className="portal-arrow">
              ›
            </div>

          </button>


        </div>


        {/* ====================================================
            FOOTER
            ==================================================== */}

        <div className="portal-footer">

          <span className="footer-title">
            NTC Digital Platform
          </span>

          <span className="footer-subtitle">
            One Platform • Multiple Portals
          </span>

        </div>


      </div>

    </div>
  );
}

export default PortalSelection;