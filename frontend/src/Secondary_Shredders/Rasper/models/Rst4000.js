import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../Pages/ProductsPage.css";
import shredderhd from "../../../images/R1.png";
import shredderhd1 from "../../../images/Machinery images/Rasper1.jpeg";
import shredderhdimg from "../../../images/Machinery images/Rasper.jpeg";
import { Helmet } from "react-helmet";
import styles from "../../../Styles/ProductHeader.module.css";

const Rst4000 = () => {
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
          RST-4000 Secondary Shredder (Rasper) for Tyre Recycling | Vikah
          Ecotech
        </title>

        <meta
          name="description"
          content="RST-4000 is a high-performance secondary shredder (rasper) by Vikah Ecotech, designed for fine shredding of pre-processed tyres in tyre recycling plants. Efficient size reduction for downstream granulation and separation."
        />

        <meta
          name="keywords"
          content="RST-4000 rasper, secondary shredder machine, tyre rasper, tyre recycling secondary shredder, rasper shredder machine"
        />

        <link rel="canonical" href="https://vikahecotech.com/rst4000" />
      </Helmet>

      {/* Heading section similar to SecondaryMetalshredder */}
      <header className={styles.productHeader}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumb}>
            Home / Products / <span>RST-4000</span>
          </div>

          <h1 className={styles.productTitle}>
            RST-<span>4000</span>
          </h1>

          <p className={styles.productSubtitle}>
            High-performance secondary shredder (rasper) designed for fine
            shredding of pre-processed tyres, ensuring efficient size reduction
            and smooth downstream granulation in tyre recycling plants.
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

      <div className="productpagetop">
        <div className="top-model-buttons">
          <p className="related-title">Related Models</p>

          <Link to="/rst2000">
            <button className="model-btn">RST-2000</button>
          </Link>

          <Link to="/rst3000">
            <button className="model-btn">RST-3000</button>
          </Link>

          {/* <Link to="/rst6000">
            <button className="model-btn">RST-6000</button>
          </Link> */}
        </div>
        <div className="imagetop">
          <div className="main-image-container">
            <div className="main-image-wrapper">
              <img
                src={mainImage}
                alt="SHT8000 Tyre Shredder main view by Vikah Ecotech"
                className="sht2000img"
              />
              <span
                className="view-image-icon"
                onClick={() =>
                  window.open(mainImage, "_blank", "noopener,noreferrer")
                }
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
                alt="Angle 1"
                onClick={() => handleImageClick(shredderhdimg)}
              />
            </div>
            <div>
              <img
                className="angle2"
                src={shredderhd}
                alt="Angle 2"
                onClick={() => handleImageClick(shredderhd)}
              />
            </div>
            <div>
              <img
                className="angle3"
                src={shredderhd1}
                alt="Angle 3"
                onClick={() => handleImageClick(shredderhd1)}
              />
            </div>
          </div>
        </div>
        <div className="productdetails">
          <h1>RST - 4000</h1>
          <p>
            The RST-4000 is a high-efficiency secondary shredder (rasper)
            designed to refine pre-shredded tyre chips into clean, uniform
            rubber fragments ready for granulation. Built with a heavy-duty
            rotor, wear-resistant blades, and a robust cutting chamber, it
            delivers precise cutting performance even under continuous load. The
            rasper efficiently separates steel wires from rubber, improving
            downstream processing quality and throughput. With PLC-controlled
            automation, safety interlocks, and optimized feed mechanisms, the
            RST-4000 ensures stable output size, reduced contamination, and
            minimal downtime. Compact and easy to integrate, it is ideal for
            tyre recycling plants seeking superior chip refinement and reliable
            24/7 operation.
          </p>
          <p>
            This model is part of our{" "}
            <a href="/rasper_secondaryshredders">
              {" "}
              ' secondary shredder (rasper) range '
            </a>{" "}
            used in advanced tyre recycling systems .
          </p>
        </div>
      </div>

      <div className="features-container">
        <h2>FEATURES AND SPECIFICATIONS</h2>
        <div className="features-content">
          <img
            src={shredderhd}
            alt="Specifications"
            className="specifications-image"
          />
          <div className="sht200specification">
            <p>
              ➤ Durable, hard-faced knives. <br></br>
              ➤Easy maintenance service platform. <br></br>➤ Full PLC control
              panel. <br></br>➤ Stop and auto-reversal motors. <br></br>➤
              Specific Stop/Auto Reversal motors Feature <br></br>➤ Shaft double
              protected with drive and mechanical mechanism<br></br> to avoid
              damage from in-spherical objects. <br></br>
            </p>
          </div>
        </div>
      </div>

      <h1 className="technical-heading">Technical Specifications</h1>

      <div className="featurestable">
        <h3>Electrical System</h3>
        <table>
          <tbody>
            <tr>
              <td>Power</td>
              <td>180 Hp - 200 Hp (134 kW - 149 kW)</td>
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

      <div className="cuttingsection">
        <h3>Cutting Section</h3>
        <table>
          <tbody>
            <tr>
              <td>Cutting Chamber</td>
              <td>L 1500  x W 1000 mm x H 1000 mm</td>
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
              <td>2420 mm</td>
            </tr>

            <tr>
              <td>No. of Rotating Blades</td>
              <td>42 Nos. (252 cutting edges)</td>
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
              <td>01 Nos</td>
            </tr>
            <tr>
              <td>Type of Coupling</td>
              <td>Gear Coupling </td>
            </tr>
            {/* <tr>
              <td>Type of Bearings and Housing</td>
              <td>J&J SNLN-3040-23040-kenw33-2C55, KVT 143 H3040, 2 Nos</td>
            </tr> */}
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

      <div className="dimensions">
        <h3>Dimensions and Heights</h3>
        <table>
          <tbody>
            <tr>
              <td>Overall Dimensions</td>
              <td>L 4730 mm × W 2500 mm × H 3650 mm</td>
            </tr>
            <tr>
              <td>Hopper Opening (G x F)</td>
              <td>L 1200 mm x W 550 mm</td>
            </tr>
            <tr>
              <td>Hopper Height (E)</td>
              <td>3430 mm</td>
            </tr>
            <tr>
              <td>Discharge Height (D)</td>
              <td>1780 mm</td>
            </tr>
            <tr>
              <td>Approximate Processing Capacity</td>
              <td>3500-4000 kg/hr</td>
            </tr>
          </tbody>
        </table>
      </div>
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

export default Rst4000;
