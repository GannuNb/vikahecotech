// SteelCleaning.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Pages/ProductsPage.css";
import styles from "../../Styles/ProductHeader.module.css";
import mainSpecImage from "../../images/baler3.png"; // Replace with your standard steel cleaning spec layout image
import scmImage from "../../images/Applications/app1.webp"; // Replace with actual machine application image
import img1 from "../../images/whatsup images/WhatsApp Image 2024-07-11 at 11.56.50 AM.jpeg"; // Replace with actual steel cleaning images
import img2 from "../../images/whatsup images/WhatsApp Image 2024-07-11 at 11.56.49 AM(1).jpeg"; // Replace with actual steel cleaning images
import { Helmet } from "react-helmet";

const SteelCleaning = () => {
  const [mainImage, setMainImage] = useState(img1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const machinery = "other-equipment";
  const model = "SCM1000";

  const handleImageClick = (image) => {
    setMainImage(image);
  };

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
    <>
      <Helmet>
        <title>SCM1000 Steel Cleaning / Hammer Mill Machine | Vikah Ecotech</title>

        <meta
          name="description"
          content="SCM1000 is a heavy-duty steel cleaning and hammer mill machine by Vikah Ecotech, designed to separate embedded rubber remnants from extracted tyre steel wire efficiently."
        />

        <meta
          name="keywords"
          content="SCM1000 steel cleaning, hammer mill machine, tyre steel wire cleaning, rubber separation mill, industrial tyre recycling machinery"
        />

        <link rel="canonical" href="https://vikahecotech.com/steel-cleaning" />
      </Helmet>

      <header className={styles.productHeader}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumb}>
            Home / Products / Other Equipment / <span>Steel Cleaning</span>
          </div>

          <h1 className={styles.productTitle}>
            SCM-<span>1000</span>
          </h1>

          <p className={styles.productSubtitle}>
            Heavy-duty Steel Cleaning and Hammer Mill Machine engineered to strip and 
            separate embedded rubber remnants from extracted tyre steel wire, ensuring 
            highly purified metal output.
          </p>

          <div className={styles.headerButtons}>
            <button
              className={styles.primaryBtn}
              onClick={() => handleDownload("scm1000")}
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
          <p className="related-title">Related Category</p>
          <Link to="/other-equipment">
            <button className="model-btn">All Supporting Eqp.</button>
          </Link>
        </div>

        <div className="imagetop">
          <div className="main-image-container">
            <div className="main-image-wrapper">
              <img
                src={mainImage}
                alt="SCM1000 machine main view by Vikah Ecotech"
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
                src={img2}
                alt="SCM1000 machine angle view 1 by Vikah Ecotech"
                onClick={() => handleImageClick(img2)}
              />
            </div>
            <div>
              <img
                src={scmImage}
                alt="SCM1000 machine application field view by Vikah Ecotech"
                onClick={() => handleImageClick(scmImage)}
              />
            </div>
            <div>
              <img
                src={img1}
                alt="SCM1000 machine close-up view by Vikah Ecotech"
                onClick={() => handleImageClick(img1)}
              />
            </div>
          </div>
        </div>

        <div className="productdetails">
          <h1>{model}</h1>

          <p>
            The SCM1000 is a specialized industrial Steel Cleaning / Hammer Mill Machine 
            meticulously developed to handle the complex task of purifying wire scrap 
            extracted from tyre recycling operations. Powered by a high-torque 50 HP (37.3 kW) 
            motor, it utilizes 70 premium rotating blades arranged inside an optimized 
            800 x 800 x 475 mm cutting chamber to aggressively strip residual rubber from steel fibers.
          </p>
          <p>
            Equipped with a heavy-duty MS 10 mm screen featuring a convenient manual opening system, 
            the SCM1000 separates loose crumbs from processed metal strands with exceptional accuracy. 
            Built around a single rigid shaft supported by premier SKF SNL 520-617 bearing housings 
            and a parallel helical gearbox transmission system, this configuration guarantees reliable day-to-day 
            performance under rigorous processing environments. An ideal choice for facilities 
            aiming to upgrade salvaged tyre steel into highly marketable, smelting-ready scrap metal.
          </p>
        </div>
      </div>

      <div className="features-container">
        <h2>FEATURES AND SPECIFICATIONS</h2>
        <div className="features-content">
          <img
            src={mainSpecImage}
            alt="Vikah Ecotech machine specifications overview"
            className="specifications-image"
          />
          <div className="sht200specification">
            <p>
              An High-impact Hammer Mill action for maximum fiber cleaning <br />
              ➤ Premium parallel helical gearbox transmission system <br />
              ➤ Clean separation of rubber crumb and high-purity steel wires <br />
              ➤ Heavy-duty MS 10 mm sizing screen with manual opening <br />
              ➤ SKF SNL Series bearing housing for prolonged industrial lifespans <br />
              ➤ Direct gear and coupling transmission minimizes power loss <br />
            </p>
          </div>
        </div>
      </div>

      <h1 className="technical-heading">Technical Specifications</h1>
      
      {/* SECTION 1: ELECTRICAL SYSTEM */}
      <div className="featurestable">
        <h3 className="table-section-heading">Electrical System</h3>
        <table>
          <tbody>
            <tr>
              <td>Power Range</td>
              <td>50 HP (37.3 kW)</td>
            </tr>
            <tr>
              <td>No. of Motors</td>
              <td>1 Unit</td>
            </tr>
            <tr>
              <td>Voltage Supply</td>
              <td>As per customized customer requirement</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SECTION 2: CUTTING SECTION */}
      <div className="featurestable" style={{ marginTop: "25px" }}>
        <h3 className="table-section-heading">Cutting Section</h3>
        <table>
          <tbody>
            <tr>
              <td>Model</td>
              <td>SCM1000</td>
            </tr>
            <tr>
              <td>Machine Type</td>
              <td>Steel Cleaning / Hammer Mill Machine</td>
            </tr>
            <tr>
              <td>Application</td>
              <td>
                Separates embedded rubber remnants and contaminants from extracted tyre steel wire to deliver high-purity scrap metal
              </td>
            </tr>
            <tr>
              <td>Cutting Chamber Size (L × W × H)</td>
              <td>800 × 800 × 475 mm</td>
            </tr>
            <tr>
              <td>No. of Shafts</td>
              <td>1 Single Shaft Setup</td>
            </tr>
            <tr>
              <td>Shaft Diameter</td>
              <td>110 mm</td>
            </tr>
            <tr>
              <td>Shaft Length</td>
              <td>1425 mm Diameter-matched Length</td>
            </tr>
            <tr>
              <td>No. of Rotating Blades</td>
              <td>70 Nos.</td>
            </tr>
            <tr>
              <td>Blade Dimensions</td>
              <td>Length: 230 mm | Width: 70 mm | Thickness: 8 mm</td>
            </tr>
            <tr>
              <td>Screen Specification</td>
              <td>MS (Mild Steel) 10 mm Screen with manual opening mechanism</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SECTION 3: GEARBOX AND HYDRAULICS */}
      <div className="featurestable" style={{ marginTop: "25px" }}>
        <h3 className="table-section-heading">Gearbox and Hydraulics</h3>
        <table>
          <tbody>
            <tr>
              <td>No. of Gearboxes</td>
              <td>1 Premium Unit (FC, A Premium style)</td>
            </tr>
            <tr>
              <td>Transmission Make</td>
              <td>Parallel Helical Gearbox, H1-125(T), Ratio: 4.13/1, FC</td>
            </tr>
            <tr>
              <td>No. of Couplings</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Coupling Type</td>
              <td>Gear Coupling (1 NOS)</td>
            </tr>
            <tr>
              <td>Type of Bearings and Housing</td>
              <td>SKF, SNL 520-617 (2 Nos.)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SECTION 4: DIMENSIONS AND HEIGHTS */}
      <div className="featurestable" style={{ marginTop: "25px" }}>
        <h3 className="table-section-heading">Dimensions and Heights</h3>
        <table>
          <tbody>
            <tr>
              <td>Equipment Dimensions (L × W × H)</td>
              <td>3200 mm × 3100 mm × 3672 mm</td>
            </tr>
            <tr>
              <td>Hopper Opening</td>
              <td>740 × 570 mm</td>
            </tr>
            <tr>
              <td>Hopper Height</td>
              <td>1075 mm</td>
            </tr>
            <tr>
              <td>In-Feed Height</td>
              <td>3075 mm</td>
            </tr>
            <tr>
              <td>Discharge Height</td>
              <td>1250 mm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="buttons-container" style={{ marginTop: "35px" }}>
        <Link to={`/enquire?machinery=${machinery}&model=${model}`}>
          <button className="login-button">Enquire Us</button>
        </Link>
        <button
          className="downloadspeci-button"
          onClick={() => handleDownload("scm1000")}
        >
          Download Specifications
        </button>
      </div>
    </>
  );
};

export default SteelCleaning;