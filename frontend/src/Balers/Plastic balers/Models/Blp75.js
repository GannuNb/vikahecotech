import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../../Pages/ProductsPage.css";
import mainSpecImage from '../../../images/Applications/plas16.jpg';
import balerImage from '../../../images/Applications/plas17.jpeg';
import img1 from '../../../images/Applications/plas18.jpeg';
import img2 from '../../../images/Applications/plasticbaler2.jpg';
import styles from "../../../Styles/ProductHeader.module.css";

const BLP75 = () => {
    const [mainImage, setMainImage] = useState(img1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const machinery = 'Baler';
    const model = 'Plastic Balers';

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    const handleDownload = (fileName) => {
        const link = document.createElement('a');
        link.href = `${process.env.PUBLIC_URL}/${fileName}.pdf`;
        link.download = `${fileName}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewImage = () => {
        window.open(mainImage, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <header className={styles.productHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.breadcrumb}>
                        Home / Products / <span>BLP-75 Plastic Baler</span>
                    </div>
                    <h1 className={styles.productTitle}>
                        BLP-<span>75</span>
                    </h1>
                    <p className={styles.productSubtitle}>
                        Heavy-duty plastic baler machine built for compressing PET bottles,
                        plastic films, packaging waste, and sheets with higher bale density,
                        improved efficiency, and reliable hydraulic performance.
                    </p>
                    <div className={styles.headerButtons}>
                        <button
                            className={styles.primaryBtn}
                            onClick={() => handleDownload("blp 75")}
                        >
                            Download Brochure
                        </button>
                        <button
                            className={styles.secondaryBtn}
                            onClick={handleViewImage}
                        >
                            View Machine Image
                        </button>
                    </div>
                </div>
            </header>

            <div className="productpagetop">
                <div className="imagetop">
                    <div className="main-image-container">
                        <div className="main-image-wrapper">
                            <img
                                src={mainImage}
                                alt="BLP75 Plastic Baler machine main view by Vikah Ecotech"
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
                                alt="BLP75 machine angle view 1 by Vikah Ecotech"
                                onClick={() => handleImageClick(img2)}
                            />
                        </div>
                        <div>
                            <img
                                src={balerImage}
                                alt="BLP75 machine angle view 2 by Vikah Ecotech"
                                onClick={() => handleImageClick(balerImage)}
                            />
                        </div>
                        <div>
                            <img
                                src={img1}
                                alt="BLP75 machine angle view 3 by Vikah Ecotech"
                                onClick={() => handleImageClick(img1)}
                            />
                        </div>
                    </div>
                </div>

                <div className="productdetails">
                    <h1>BLP-75</h1>
                    <p>
                        The <strong>BLP-75</strong> Plastic Baler is designed for compressing
                        and baling plastic waste materials such as PET bottles, packaging
                        films, plastic sheets, and other recyclable plastics. Its
                        high-pressure hydraulic system provides efficient compaction and
                        dense bale formation, making it suitable for recycling facilities,
                        waste management operations, and industrial applications.
                    </p>
                </div>
            </div>

            <div className="features-container">
                <h2>FEATURES AND SPECIFICATIONS</h2>
                <div className="features-content">
                    <img
                        src={mainSpecImage}
                        alt="Vikah Ecotech BLP75 plastic baler specifications overview"
                        className="specifications-image"
                    />
                    <div className="sht200specification">
                        <p>
                            ➤ Industrial-grade design for continuous operation <br />
                            ➤ High compaction force for dense plastic bales <br />
                            ➤ Automatic cycle and bale ejection <br />
                            ➤ Rugged structure with heavy-duty frame <br />
                            ➤ Efficient hydraulic system for reliable performance <br />
                            ➤ Low maintenance and long service life <br />
                        </p>
                    </div>
                </div>
            </div>

            <h1 className="technical-heading">Technical Specifications</h1>

            <div className="featurestable">
                <h3>MODEL NO: BLP 75</h3>
                <table className="blp75-spec-table">
                    <tbody>
                        <tr>
                            <td>Model</td>
                            <td>BLP 75</td>
                        </tr>
                        <tr>
                            <td>Power</td>
                            <td>15 HP</td>
                        </tr>
                        <tr>
                            <td>Compression Force</td>
                            <td>75 Ton</td>
                        </tr>
                        <tr>
                            <td>Chamber Size</td>
                            <td>2000 x 950 x 500 mm</td>
                        </tr>
                        <tr>
                            <td>Baler Size</td>
                            <td>950 x 500 mm</td>
                        </tr>
                        <tr>
                            <td>Operation</td>
                            <td>Hand Lever / Panel</td>
                        </tr>
                        <tr>
                            <td>Oil Tank</td>
                            <td>400 L</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>

            <div className="buttons-container">
                <Link to={`/enquire?machinery=${machinery}&model=${model}`}>
                    <button className="login-button">
                        Enquire Us
                    </button>
                </Link>
                <button
                    className="downloadspeci-button"
                    onClick={() => handleDownload('blp 75')}
                >
                    Download Specifications
                </button>
            </div>
        </>
    );
};

export default BLP75;