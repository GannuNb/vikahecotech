import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../Pages/ProductsPage.css";

import shredderhd from "../../../images/R1.png";
import shredderhd1 from "../../../images/Machinery images/Rasper1.jpeg";
import shredderhdimg from "../../../images/Machinery images/Rasper.jpeg";

import { Helmet } from "react-helmet";
import styles from "../../../Styles/ProductHeader.module.css";

const Rst2000 = () => {
  const [mainImage, setMainImage] = useState(shredderhd1);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const machinery = "secondary-shredder";
  const model = "Rasper";

  const handleDownload = (fileName) => {
    const link = document.createElement("a");
    link.href = `${process.env.PUBLIC_URL}/${fileName}.pdf`;
    link.download = `${fileName}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewImage = () => {
    window.open(mainImage, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <Helmet>
        <title>
          RST-2000 Secondary Shredder (Rasper) for Tyre Recycling | Vikah
          Ecotech
        </title>

        <meta
          name="description"
          content="RST-2000 secondary tyre rasper designed for efficient refinement of pre-shredded tyre chips into uniform rubber particles for downstream recycling and granulation."
        />

        <meta
          name="keywords"
          content="RST-2000, RST 2000 rasper, secondary tyre shredder, tyre recycling rasper, rubber rasper machine"
        />

        <link rel="canonical" href="https://vikahecotech.com/rst2000" />
      </Helmet>

      {/* ================= HEADER ================= */}

      <header className={styles.productHeader}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumb}>
            Home / Products / <span>RST-2000</span>
          </div>

          <h1 className={styles.productTitle}>
            RST-<span>2000</span>
          </h1>

          <p className={styles.productSubtitle}>
            Compact and efficient secondary rasper designed to refine
            pre-shredded tyre chips into smaller, cleaner and more uniform
            rubber particles for downstream recycling processes.
          </p>

          <div className={styles.headerButtons}>
            <button
              className={styles.primaryBtn}
              onClick={() => handleDownload("Rasper(Tyres)")}
            >
              Download Brochure
            </button>

            <button className={styles.secondaryBtn} onClick={handleViewImage}>
              View Machine Image
            </button>
          </div>
        </div>
      </header>

      {/* ================= PRODUCT TOP ================= */}

      <div className="productpagetop">
        <div className="top-model-buttons">
          <p className="related-title">Related Models</p>

          <Link to="/rst3000">
            <button className="model-btn">RST-3000</button>
          </Link>

          <Link to="/rst4000">
            <button className="model-btn">RST-4000</button>
          </Link>
        </div>

        <div className="imagetop">
          <div className="main-image-container">
            <div className="main-image-wrapper">
              <img
                src={mainImage}
                alt="RST-2000 secondary tyre rasper by Vikah Ecotech"
                className="sht2000img"
              />

              <span
                className="view-image-icon"
                onClick={handleViewImage}
                title="View full image"
              >
                🔍
              </span>
            </div>
          </div>

          <div className="additional-images">
            <div>
              <img
                className="angle1"
                src={shredderhdimg}
                alt="RST-2000 Rasper Angle 1"
                onClick={() => handleImageClick(shredderhdimg)}
              />
            </div>

            <div>
              <img
                className="angle2"
                src={shredderhd}
                alt="RST-2000 Rasper Angle 2"
                onClick={() => handleImageClick(shredderhd)}
              />
            </div>

            <div>
              <img
                className="angle3"
                src={shredderhd1}
                alt="RST-2000 Rasper Angle 3"
                onClick={() => handleImageClick(shredderhd1)}
              />
            </div>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}

        <div className="productdetails">
          <h1>RST - 2000</h1>

          <p>
            The RST-2000 is an entry-level secondary tyre rasper designed for
            efficient processing of pre-shredded tyre chips. It reduces
            relatively coarse tyre material into smaller rubber particles
            suitable for further screening, steel separation and granulation.
          </p>

          <p>
            Its compact cutting chamber and optimized rotor arrangement make the
            RST-2000 suitable for small to medium-scale tyre recycling plants
            where reliable secondary processing and controlled output size are
            required.
          </p>

          <p>
            The machine incorporates hardened cutting knives, automatic overload
            protection and PLC-based controls to provide stable operation with
            reduced manual intervention.
          </p>

          <p>
            The RST-2000 belongs to our{" "}
            <a href="/rasper_secondaryshredders">
              secondary shredder (rasper) range
            </a>{" "}
            designed for tyre recycling and rubber recovery applications.
          </p>
        </div>
      </div>

      {/* ================= FEATURES ================= */}

      <div className="features-container">
        <h2>FEATURES AND SPECIFICATIONS</h2>

        <div className="features-content">
          <img
            src={shredderhd}
            alt="RST-2000 Rasper specifications"
            className="specifications-image"
          />

          <div className="sht200specification">
            <p>
              ➤ Compact heavy-duty cutting chamber.
              <br />
              ➤ Hardened alloy steel cutting knives.
              <br />
              ➤ Optimized rotor design for tyre chip refinement.
              <br />
              ➤ Easy maintenance access platform.
              <br />
              ➤ PLC-controlled electrical panel.
              <br />
              ➤ Automatic overload and reverse protection.
              <br />
              ➤ Replaceable cutting components.
              <br />➤ Suitable for continuous secondary processing.
            </p>
          </div>
        </div>
      </div>

      {/* ================= TECHNICAL SPECIFICATIONS ================= */}

      <h1 className="technical-heading">Technical Specifications</h1>

      <div className="featurestable">
        <h3>Electrical System</h3>

        <table>
          <tbody>
            <tr>
              <td>Power</td>
              <td>75 - 100 HP (55 kw -73 kw)</td>
            </tr>

            <tr>
              <td>No Of Motors</td>
              <td>1 No. ABB / Siemens Motor</td>
            </tr>

            <tr>
              <td>Drive </td>
              <td>ABB / Inovance / Equivalent </td>
            </tr>

            <tr>
              <td>Voltage</td>
              <td>As per Customer's Requirement</td>
            </tr>

            <tr>
              <td>Electric Equipment’s</td>
              <td>Switch Gears (L and T / Siemens / Equivalent)</td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* ================= CUTTING SECTION ================= */}

      <div className="cuttingsection">
        <h3>Cutting Section</h3>

        <table>
          <tbody>
            <tr>
              <td>Cutting Chamber</td>
              <td>L 900 mm x W 1000 mm x H 1000 mm</td>
            </tr>

            <tr>
              <td>Number of Shaft</td>
              <td>1 No.</td>
            </tr>

            <tr>
              <td>Shaft Diameter</td>
              <td>400 mm</td>
            </tr>

            <tr>
              <td>Shaft Length</td>
              <td>1500 mm</td>
            </tr>

            <tr>
              <td>No. of Rotating Blades</td>
              <td>42 Nos. (126 cutting edges) </td>
            </tr>

            <tr>
              <td>No. of Static Blades</td>
              <td>6 Nos. (36 cutting edges)</td>
            </tr>

            <tr>
              <td>Fixed Blade Mounting Blocks</td>
              <td>42 Nos. </td>
            </tr>

            {/* <tr>
              <td>Blade Locking System</td>
              <td>Four-Bolt Locking Arrangement</td>
            </tr> */}

            <tr>
              <td>Screen</td>
              <td>22 mm (split opening)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= GEARBOX ================= */}

      <div className="dimensions">
        <h3>Gearbox and Hydraulics</h3>

        <table>
          <tbody>
            <tr>
              <td>Number of Gear Box</td>
              <td>1 Nos / Reggiana / Bonfiglioli</td>
            </tr>

            <tr>
              <td>Number of Couplings</td>
              <td>1 Nos.</td>
            </tr>

            <tr>
              <td>Type of Coupling</td>
              <td>1 Nos.</td>
            </tr>

            <tr>
              <td>Type of Bearings</td>
              <td>Double roller spherical bearing and Thrust ball bearing</td>
            </tr>

            <tr>
              <td>Hydraulics</td>
              <td>2 Nos cylinders For Hopper Opening ,4 Nos  telescopic cylnders for screen , Power pack 80LPM pump - 2Hp motor</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= DIMENSIONS ================= */}

      <div className="dimensions">
        <h3>Dimensions and Heights</h3>

        <table>
          <tbody>
            {/* <tr>
              <td>Equipment Dimension (A x B x C)</td>
              <td>L 2800 mm x W 1600 mm x H 2500 mm</td>
            </tr> */}

            <tr>
              <td>Hopper Opening</td>
              <td>L 900 mm x W 700 mm</td>
            </tr>

            <tr>
              <td>Hopper Height</td>
              <td>750 mm</td>
            </tr>

            <tr>
              <td>Discharge Height</td>
              <td>1000 mm</td>
            </tr>

            <tr>
              <td>Approximate Processing Capacity</td>
              <td>2500 - 3500 kg/hr</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= BUTTONS ================= */}

      <div className="buttons-container">
        <Link to={`/enquire?machinery=${machinery}&model=${model}`}>
          <button className="login-button">Enquire Us</button>
        </Link>

        <button
          className="downloadspeci-button"
          onClick={() => handleDownload("Rasper(Tyres)")}
        >
          Download Specifications
        </button>
      </div>
    </div>
  );
};

export default Rst2000;
