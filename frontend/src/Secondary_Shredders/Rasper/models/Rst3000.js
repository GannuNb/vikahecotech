import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../Pages/ProductsPage.css";
import shredderhd from "../../../images/R1.png";
import shredderhd1 from "../../../images/Machinery images/Rasper1.jpeg";
import shredderhdimg from "../../../images/Machinery images/Rasper.jpeg";
import { Helmet } from "react-helmet";
import styles from "../../../Styles/ProductHeader.module.css";

const Rst3000 = () => {
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
          RST-3000 Secondary Shredder (Rasper) for Tyre Recycling | Vikah
          Ecotech
        </title>

        <meta
          name="description"
          content="RST-3000 is a medium-duty secondary shredder (rasper) by Vikah Ecotech, designed for refining pre-processed tyres into smaller rubber particles for downstream recycling and separation."
        />

        <meta
          name="keywords"
          content="RST-3000 rasper, secondary shredder machine, tyre rasper, tyre recycling shredder, RST3000"
        />

        <link rel="canonical" href="https://vikahecotech.com/rst3000" />
      </Helmet>

      {/* ================= HEADER ================= */}

      <header className={styles.productHeader}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumb}>
            Home / Products / <span>RST-3000</span>
          </div>

          <h1 className={styles.productTitle}>
            RST-<span>3000</span>
          </h1>

          <p className={styles.productSubtitle}>
            Medium-capacity secondary shredder (rasper) designed for efficient
            refinement of pre-processed tyres, producing consistent rubber
            particles for downstream granulation and material separation.
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

          <Link to="/rst2000">
            <button className="model-btn">RST-2000</button>
          </Link>

          <Link to="/rst4000">
            <button className="model-btn">RST-4000</button>
          </Link>

          {/* <Link to="/rst6000">
            <button className="model-btn">RST-6000</button>
          </Link> */}
        </div>

        {/* ================= IMAGES ================= */}

        <div className="imagetop">
          <div className="main-image-container">
            <div className="main-image-wrapper">
              <img
                src={mainImage}
                alt="RST-3000 Secondary Rasper Shredder by Vikah Ecotech"
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
                alt="RST-3000 Rasper Angle 1"
                onClick={() => handleImageClick(shredderhdimg)}
              />
            </div>

            <div>
              <img
                className="angle2"
                src={shredderhd}
                alt="RST-3000 Rasper Angle 2"
                onClick={() => handleImageClick(shredderhd)}
              />
            </div>

            <div>
              <img
                className="angle3"
                src={shredderhd1}
                alt="RST-3000 Rasper Angle 3"
                onClick={() => handleImageClick(shredderhd1)}
              />
            </div>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}

        <div className="productdetails">
          <h1>RST - 3000</h1>

          <p>
            The RST-3000 is a medium-capacity secondary shredder (rasper)
            developed for efficient processing of pre-shredded tyre material. It
            reduces tyre chips into smaller and more uniform rubber particles,
            making the material suitable for subsequent granulation and
            separation processes.
          </p>

          <p>
            The machine is designed with a robust cutting chamber, heavy-duty
            rotor assembly, wear-resistant cutting tools, and optimized material
            feeding. Its controlled cutting action helps improve rubber recovery
            while reducing the amount of unwanted steel and fibre contamination
            in the processed material.
          </p>

          <p>
            The RST-3000 is suitable for medium-scale tyre recycling operations
            requiring reliable performance, easy maintenance, and consistent
            output during continuous processing.
          </p>

          <p>
            This model is part of our{" "}
            <a href="/rasper_secondaryshredders">
              secondary shredder (rasper) range
            </a>{" "}
            used in tyre recycling systems.
          </p>
        </div>
      </div>

      {/* ================= FEATURES ================= */}

      <div className="features-container">
        <h2>FEATURES AND SPECIFICATIONS</h2>

        <div className="features-content">
          <img
            src={shredderhd}
            alt="RST-3000 Rasper Specifications"
            className="specifications-image"
          />

          <div className="sht200specification">
            <p>
              ➤ Heavy-duty rotor construction.
              <br />
              ➤ Wear-resistant cutting knives.
              <br />
              ➤ Easy-access maintenance platform.
              <br />
              ➤ PLC-based control system.
              <br />
              ➤ Automatic motor reversal protection.
              <br />
              ➤ Hydraulic chamber opening system.
              <br />
              ➤ Optimized feeding arrangement.
              <br />➤ Designed for continuous tyre recycling operation.
            </p>
          </div>
        </div>
      </div>

      {/* ================= TECHNICAL SPECIFICATIONS ================= */}

      <h1 className="technical-heading">Technical Specifications</h1>

      {/* ELECTRICAL */}

      <div className="featurestable">
        <h3>Electrical System</h3>

        <table>
          <tbody>
            <tr>
              <td>Power</td>
              <td>150 Hp - 180 Hp (112 kw -134 kw)</td>
            </tr>

            <tr>
              <td>No Of Motors</td>
              <td>1 No. ABB / Siemens Motor</td>
            </tr>

            <tr>
              <td>Voltage</td>
              <td>As per Customer's Requirement</td>
            </tr>

            <tr>
              <td>Drive</td>
              <td>ABB / Inovance / Equivalent</td>
            </tr>

            <tr>
              <td>Electric Equipment</td>
              <td>Switch Gears (L and T / Siemens / Equivalent)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CUTTING */}

      <div className="cuttingsection">
        <h3>Cutting Section</h3>

        <table>
          <tbody>
            <tr>
              <td>Cutting Chamber</td>
              <td>L 1200  x W 1000 mm x H 1000 mm</td>
            </tr>

            <tr>
              <td>Number of Shaft</td>
              <td>1 No.</td>
            </tr>

            <tr>
              <td>Shaft Diameter</td>
              <td>500 mm</td>
            </tr>

            <tr>
              <td>Shaft Length</td>
              <td>2150 mm</td>
            </tr>

            <tr>
              <td>No. of Rotating Blades</td>
              <td>42 Nos. (168 cutting edges)</td>
            </tr>

            <tr>
              <td>No. of Static Blades</td>
              <td>6 Nos. (48 cutting edges)</td>
            </tr>

            <tr>
              <td>Fixed Blade Mounting Blocks</td>
              <td>42 Nos. </td>
            </tr>

            {/* <tr>
              <td>Blade Locking Blocks</td>
              <td>36 Nos. Four-hole locking blocks</td>
            </tr> */}

            <tr>
              <td>Screen</td>
              <td>22 mm (split opening)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* GEARBOX */}

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
              <td>Gear Coupling</td>
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

      {/* DIMENSIONS */}

      <div className="dimensions">
        <h3>Dimensions and Heights</h3>

        <table>
          <tbody>
            <tr>
              <td>Overall Dimensions</td>
              <td>L 4715 mm × W 2475 mm × H 3650 mm</td>
            </tr>

            <tr>
              <td>Hopper Opening </td>
              <td>L 1000 mm × W 540 mm</td>
            </tr>

            <tr>
              <td>Hopper Height </td>
              <td>3510 mm</td>
            </tr>

            <tr>
              <td>Discharge Height </td>
              <td>1780 mm</td>
            </tr>

            <tr>
              <td>Approximate Processing Capacity</td>
              <td>2500-3000 kg/hr</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= BUTTONS ================= */}

      <div className="buttons-container">
        <Link to={`/enquire?machinery=${machinery}&model=${model}`}>
          <button className="login-button">Enquire Us</button>
        </Link>

        {/* <button
          className="downloadspeci-button"
          onClick={() => handleDownload("Rasper(Tyres)")}
        >
          Download Specifications
        </button> */}
      </div>
    </div>
  );
};

export default Rst3000;
