import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../Pages/ProductsPage.css";
import shredderhd from "../../../images/Applications/shredtyre9.jpg";
import shredderhd1 from "../../../images/shredder_hd1.jpg";
import shredderhdimg from "../../../images/Shedder _ Final PNG.png";
import { Helmet } from "react-helmet";
import styles from "../../../Styles/ProductHeader.module.css";

const Sht8000 = () => {
  const [mainImage, setMainImage] = useState(shredderhd1);

  const handleImageClick = (image) => {
    setMainImage(image);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const machinery = "shredder";
  const model = "SHT-8000";

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
        <title>SHT-8000 Tyre Shredder Machine | Vikah Ecotech</title>

        <meta
          name="description"
          content="SHT-8000 is a high-capacity tyre shredder machine by Vikah Ecotech, designed for primary shredding of PCR and TBR tyres in medium to large tyre recycling plants."
        />

        <meta
          name="keywords"
          content="SHT-8000 tyre shredder, tyre shredder machine, primary tyre shredder, tyre recycling shredder, industrial tyre shredder"
        />

        <link rel="canonical" href="https://vikahecotech.com/sht8000" />
      </Helmet>

      <header className={styles.productHeader}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumb}>
            Home / Products / <span>SHT-8000</span>
          </div>

          <h1 className={styles.productTitle}>
            SHT-<span>8000</span>
          </h1>

          <p className={styles.productSubtitle}>
            High-capacity tyre shredder machine built for medium and large
            recycling facilities, offering efficient primary shredding of PCR
            and TBR tyres with powerful performance and consistent output.
          </p>

          <div className={styles.headerButtons}>
            <button
              className={styles.primaryBtn}
              onClick={() => handleDownload("sht8000")}
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
          <Link to="/sht6000">
            <button className="model-btn">SHT-6000</button>
          </Link>

          <Link to="/sht12000">
            <button className="model-btn">SHT-12000</button>
          </Link>
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
          <h1>{model}</h1>
          <p>
            Our SHT-8000 is a high-performance tyre shredder engineered for
            medium-to-large recycling operations. Built to handle a wide range
            of tyre sizes — from PCR to TBR — it features oversized shafts and
            precision-cut blades for aggressive, consistent reduction. A
            reinforced shredding chamber and heavy-duty bearings deliver
            durability and stable throughput under continuous duty. The SHT-8000
            combines high torque with optimized drive design to process large
            volumes quickly while keeping power consumption efficient.
            User-friendly controls, PLC automation and safety interlocks
            simplify operation and minimize downtime. With easy-access service
            points and robust construction, the SHT-8000 is ideal where fast,
            reliable shredding and long-term uptime are required.
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
              ➤ Specially Designed Knives with hard face <br></br>➤ Service Pla
              orm For easy to maintenance <br></br>➤ High Throughput low power
              consump on drive design <br></br>➤ Full PLC controlling electric
              panel <br></br>➤ Specific Stop/Auto Reversal motors Feature{" "}
              <br></br>➤ Shaft will be double protected with drive/mechanical
              mechanism <br></br> to avoid damage by In spherical objects{" "}
              <br></br>
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
              <td>160 - 220 HP</td>
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
              <td>Siemens / ABB / Crompton</td>
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
              <td>1600 x 960 mm</td>
            </tr>
            <tr>
              <td>Blades Thickness</td>
              <td>50 mm</td>
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
          </tbody>
        </table>
      </div>

      <div className="dimensions">
        <h3>Dimensions and Weight</h3>
        <table>
          <tbody>
            <tr>
              <td>Equipment Length</td>
              <td>6000 mm</td>
            </tr>
            <tr>
              <td>Equipment Width</td>
              <td>2200 mm</td>
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
              <td>22500 Kilogram</td>
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
          onClick={() => handleDownload("sht8000")}
        >
          Download Specifications
        </button>
      </div>
    </>
  );
};

export default Sht8000;
