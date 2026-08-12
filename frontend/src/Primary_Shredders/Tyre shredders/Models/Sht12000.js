import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../Pages/ProductsPage.css";
import shredderhd from "../../../images/Applications/shredtyre7.webp";
import shredderhd1 from "../../../images/shredder_hd1.jpg";
import shredderhdimg from "../../../images/Shedder _ Final PNG.png";
import { Helmet } from "react-helmet";
import styles from "../../../Styles/ProductHeader.module.css";

const Sht12000 = () => {
  const [mainImage, setMainImage] = useState(shredderhdimg);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const machinery = "shredder";
  const model = "SHT-12000";

  const handleDownload = (fileName) => {
    // Create a new anchor element
    const link = document.createElement("a");
    // Set the href to the PDF file
    link.href = `${process.env.PUBLIC_URL}/${fileName}.pdf`;
    // Set the download attribute to the desired file name
    link.download = `${fileName}.pdf`;
    // Append the anchor to the body
    document.body.appendChild(link);
    // Programmatically click the anchor
    link.click();
    // Remove the anchor from the body
    document.body.removeChild(link);
  };
  const handleViewImage = () => {
    window.open(mainImage, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>SHT-12000 Tyre Shredder Machine | Vikah Ecotech</title>
        <meta
          name="description"
          content="SHT-12000 is a heavy-duty tyre shredder machine by Vikah Ecotech, engineered for high-volume primary shredding of PCR and TBR tyres in large-scale tyre recycling plants."
        />

        <meta
          name="keywords"
          content="SHT-12000 tyre shredder, heavy duty tyre shredder, primary tyre shredder, tyre recycling shredder, industrial tyre shredder"
        />

        <link rel="canonical" href="https://vikahecotech.com/sht12000" />
      </Helmet>

      <header className={styles.productHeader}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumb}>
            Home / Products / <span>SHT-12000</span>
          </div>

          <h1 className={styles.productTitle}>
            SHT-<span>12000</span>
          </h1>

          <p className={styles.productSubtitle}>
            Heavy-duty tyre shredder machine developed for large-scale recycling
            plants, delivering high-volume primary shredding of PCR and TBR
            tyres with maximum efficiency, durability, and consistent
            throughput.
          </p>

          <div className={styles.headerButtons}>
            <button
              className={styles.primaryBtn}
              onClick={() => handleDownload("sht12000")}
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
          <Link to="/sht8000">
            <button className="model-btn">SHT-8000</button>
          </Link>

          <Link to="/sht6000">
            <button className="model-btn">SHT-6000</button>
          </Link>
        </div>

        <div className="imagetop">
          <div className="main-image-container">
            <div className="main-image-wrapper">
              <img
                src={mainImage}
                alt="SHT12000 Tyre Shredder main view by Vikah Ecotech"
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
          <h1>{model}</h1>
          <p>
            Our SHT-12000 is an industrial-class tyre shredder designed for
            heavy-duty, high-capacity recycling facilities. With oversized
            shafts, extra-thick blades and a large cutting chamber, it reduces
            tyres rapidly into uniform chips suitable for downstream processing.
            The machine is engineered for continuous 24/7 operation — its rugged
            frame, high-flow drives and precision hydraulics ensure stable
            performance under heavy loads. Advanced PLC controls, automated
            feeding and safety interlocks deliver consistent throughput with
            minimal operator intervention. Serviceability is built in:
            accessible inspection ports, replaceable wear inserts and convenient
            maintenance platforms reduce downtime. The SHT-12000 is the top
            choice when maximum throughput, reliability and chip quality are
            mission-critical.
          </p>
          <p>
            This model is part of our
            <a href="/tyreshredder"> tyre shredder range </a>
            under
            <a href="/primary-shredder"> primary shredder systems </a>
            for tyre recycling applications.
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
              ➤ Specially Designed Knives with hard face <br />
              ➤ Service Platform For easy to maintenance <br />
              ➤ High Throughput low power consumption on drive design <br />
              ➤ Full PLC controlling electric panel <br />
              ➤ Specific Stop/Auto Reversal motors Feature <br />➤ Shaft will be
              double protected with drive/mechanical mechanism to<br></br> avoid
              damage by spherical objects. <br />
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
              <td>220 - 280 HP</td>
            </tr>
            <tr>
              <td>No Of Motors</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Voltage</td>
              <td>As per Clients Requirement</td>
            </tr>
            <tr>
              <td>Drive</td>
              <td>Electric</td>
            </tr>
            <tr>
              <td>Panel</td>
              <td>
                MCC (Shall be suitable to 415v, 3 Phase, 50Hz AC Supply Drive)
              </td>
            </tr>
            <tr>
              <td>Motor Make</td>
              <td>Siemens / ABB / Crompton </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="cuttingsection">
        <h3>Cutting Section</h3>
        <table>
          <tbody>
            <tr>
              <td>Cutting Chamber:</td>
              <td>2200 x 960 mm</td>
            </tr>
            <tr>
              <td>Blades Thickness</td>
              <td>60 mm</td>
            </tr>
            <tr>
              <td>Blades Diameter</td>
              <td>600 mm</td>
            </tr>
            <tr>
              <td>Shaft Diameter</td>
              <td>180 mm</td>
            </tr>
            <tr>
              <td>Shaft Length</td>
              <td>1680 mm</td>
            </tr>
            <tr>
              <td>Hopper Height</td>
              <td>1400 mm</td>
            </tr>
            <tr>
              <td>Discharge Height</td>
              <td>2550 mm</td>
            </tr>
            <tr>
              <td>Feeding Mechanism</td>
              <td>Auto</td>
            </tr>
            <tr>
              <td>Production Capacity</td>
              <td>12000 – 12500 Kg/hr</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="dimensions">
        <h3>Dimensions and Weight</h3>
        <table>
          <tbody>
            <tr>
              <td>Equipment Length</td>
              <td>5000 mm</td>
            </tr>
            <tr>
              <td>Equipment Width</td>
              <td>2000 mm</td>
            </tr>
            <tr>
              <td>Equipment Height</td>
              <td>4855 mm</td>
            </tr>
            <tr>
              <td>Transport Height (H)</td>
              <td>2700 mm</td>
            </tr>
            <tr>
              <td>Equipment Weight (Approx)</td>
              <td>26500 Kilogram</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="buttons-container">
        <Link to={`/enquire?machinery=${machinery}&model=${model}`}>
          <button className="login-button">Enquire Us</button>
        </Link>

        <button
          className="downloadspeci-button"
          onClick={() => handleDownload("sht12000")}
        >
          Download Specifications
        </button>
      </div>
    </>
  );
};

export default Sht12000;
