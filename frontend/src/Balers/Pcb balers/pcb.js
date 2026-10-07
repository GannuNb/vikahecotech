import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";

import "../../Other Equipments/Tyrecutting.css";
import "../../Pages/Models.css";

import mainSpecImage from "../../images/Applications/apppcb1.jpg";
import balerImage from "../../images/Applications/apppcb6.webp";
import img1 from "../../images/Applications/apppcb3.jpg";

import SEOHelmet from "../../components/SEO/SEOHelmet";
import styles from "../../Styles/Topheadings.module.css";

import { fetchPublicProductsByApplicationName } from "../../redux/slices/publicProductSlice";

function Pcb() {
  const dispatch = useDispatch();

  // ============================================================
  // SCROLL TO TOP
  // ============================================================
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // ============================================================
  // REDUX STATE
  // ============================================================
  // The fallback prevents the page from crashing if the reducer
  // is registered as publicProduct, publicProducts, or
  // publicProductSlice.
  const publicProductState = useSelector(
    (state) =>
      state.publicProduct ||
      state.publicProducts ||
      state.publicProductSlice ||
      {}
  );

  const products = publicProductState.products || [];
  const loading = publicProductState.loading || false;
  const error = publicProductState.error || null;

  // ============================================================
  // SELECTED PRODUCT
  // ============================================================
  const [selected, setSelected] = useState(null);

  // ============================================================
  // FETCH PAPER AND CARDBOARD BALER PRODUCTS
  // ============================================================
  useEffect(() => {
    dispatch(
      fetchPublicProductsByApplicationName("Paper and Cardboard Baler")
    );
  }, [dispatch]);

  // ============================================================
  // SELECT FIRST PRODUCT AFTER FETCH
  // ============================================================
  useEffect(() => {
    if (products.length > 0) {
      setSelected((currentProduct) => {
        if (!currentProduct) {
          return products[0];
        }

        const updatedProduct = products.find(
          (product) => product.slug === currentProduct.slug
        );

        return updatedProduct || products[0];
      });
    }
  }, [products]);

  // ============================================================
  // DYNAMIC PRODUCT IMAGES
  // ============================================================
  const carouselImages =
    selected &&
    Array.isArray(selected.images) &&
    selected.images.length > 0
      ? selected.images
      : [mainSpecImage, balerImage, img1];

  // ============================================================
  // PUBLIC SPECIFICATIONS
  // ============================================================
  const publicSpecifications = selected
    ? (selected.sections || []).flatMap((section) =>
        (section.fields || [])
          .filter((field) => field.isPublic)
          .map((field) => ({
            label: field.name,
            value: field.value,
          }))
      )
    : [];

  // ============================================================
  // SEO PRODUCT DATA
  // ============================================================
  const seoProducts = products.map((product) => ({
    name: product.modelName || "",
    description:
      product.description ||
      `Paper and Cardboard Baler ${product.modelName || ""}`,
    image:
      Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : "https://vikahecotech.com/images/baler_bg.png",
    url: product.slug
      ? `https://vikahecotech.com/${product.slug}`
      : "https://vikahecotech.com/pcb",
  }));

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div>
      {/* ========================================================
          SEO
      ======================================================== */}
      <SEOHelmet
        title="Paper and Cardboard Baler Machines for Recycling | Vikah Ecotech"
        description="Vikah Ecotech manufactures paper and cardboard baler machines for recycling cartons and packaging waste."
        keywords="paper baler machine, cardboard baler machine, carton baler"
        canonical="https://vikahecotech.com/pcb"
        pageName="Paper and Cardboard Baler Machines"
        products={seoProducts}
        breadcrumb={[
          {
            name: "Home",
            url: "https://vikahecotech.com",
          },
          {
            name: "Balers",
            url: "https://vikahecotech.com/balers",
          },
          {
            name: "Paper and Cardboard Balers",
            url: "https://vikahecotech.com/pcb",
          },
        ]}
      />

      {/* ========================================================
          HERO CAROUSEL
      ======================================================== */}
      <div className={styles.heroWrapper}>
        <Carousel controls indicators interval={4000}>
          {/* Slide 1 */}
          <Carousel.Item>
            <img
              className={styles.heroImage}
              src={mainSpecImage}
              alt="Paper and Cardboard Baler Machine"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Paper and Cardboard Balers
                </h1>

                <p className={styles.heroSubtitle}>
                  Efficient baler machines designed to compress paper,
                  cartons, and cardboard waste into compact bales for easy
                  recycling and transportation.
                </p>

                <button
                  className={styles.heroButton}
                  onClick={() =>
                    document
                      .getElementById("modelsSection")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  View Models
                </button>
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 2 */}
          <Carousel.Item>
            <img
              className={styles.heroImage}
              src={balerImage}
              alt="Industrial Cardboard Baler"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Industrial Cardboard Balers
                </h1>

                <p className={styles.heroSubtitle}>
                  Heavy-duty balers ideal for recycling warehouses, packaging
                  industries, and large-scale carton waste management.
                </p>

                <button
                  className={styles.heroButton}
                  onClick={() =>
                    document
                      .getElementById("modelsSection")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  View Models
                </button>
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 3 */}
          <Carousel.Item>
            <img
              className={styles.heroImage}
              src={img1}
              alt="Hydraulic Paper Baler"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Hydraulic Paper Balers
                </h1>

                <p className={styles.heroSubtitle}>
                  Advanced hydraulic compression technology designed for
                  high-volume paper and packaging waste recycling.
                </p>

                <button
                  className={styles.heroButton}
                  onClick={() =>
                    document
                      .getElementById("modelsSection")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  View Models
                </button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}
      <div className="container-fluid px-4 px-md-5 my-5">
        {/* ======================================================
            INTRO SECTION
        ====================================================== */}
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 text-center">
              <h2
                className="fw-bold mb-4"
                style={{
                  fontSize: "2.2rem",
                  fontFamily: "'Roboto', sans-serif",
                  lineHeight: "1.3",
                }}
              >
                Paper and Cardboard Baler Machines Manufacturer in India
              </h2>

              <p
                className="lead mb-3"
                style={{
                  fontSize: "1.125rem",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#2d3748",
                }}
              >
                Vikah Ecotech manufactures hydraulic paper and cardboard baler
                machines for efficient recycling of cartons, corrugated
                cardboard, office paper, and packaging waste. Our balers are
                engineered for high performance, durability, and reliable
                operation in industrial recycling plants and commercial waste
                management facilities.
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#4a5568",
                  marginBottom: "1rem",
                }}
              >
                Built with reinforced steel and high-pressure hydraulic
                systems, our balers provide consistent compression, reduce
                storage requirements, and improve recycling efficiency. They
                are suitable for warehouses, printing units, recycling
                plants, and large commercial operations.
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#4a5568",
                  marginBottom: "1rem",
                }}
              >
                Our paper and cardboard balers are available in multiple
                tonnage options. The available models are loaded dynamically
                from the product database and display their respective
                specifications and images.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================
            MODEL SECTION
        ====================================================== */}
        <div
          id="modelsSection"
          className="py-5 px-3 px-md-5 mb-5"
          style={{
            background: "linear-gradient(135deg, #e6fffa, #f0fdfa)",
            borderTop: "5px solid #22c55e",
            borderBottom: "5px solid #22c55e",
          }}
        >
          <div className="container-fluid">
            <h3
              className="text-center fw-bold mb-4"
              style={{
                color: "#166534",
                fontSize: "1.8rem",
              }}
            >
              Available Paper and Cardboard Baler Models
            </h3>

            {/* ==================================================
                LOADING STATE
            ================================================== */}
            {loading ? (
              <div className="text-center py-5">
                <p className="mb-0">
                  Loading Paper and Cardboard Baler models...
                </p>
              </div>
            ) : error ? (
              /* ==================================================
                 ERROR STATE
              ================================================== */
              <div className="text-center py-5">
                <p className="text-danger mb-0">
                  Unable to load Paper and Cardboard Baler models.
                </p>

                <p className="text-muted mt-2 mb-0">
                  {typeof error === "string"
                    ? error
                    : "Please try again later."}
                </p>
              </div>
            ) : products.length === 0 ? (
              /* ==================================================
                 EMPTY STATE
              ================================================== */
              <div className="text-center py-5">
                <p className="mb-0">
                  No Paper and Cardboard Baler models are available.
                </p>
              </div>
            ) : (
              <>
                {/* ==================================================
                    MODEL BUTTONS
                ================================================== */}
                <div className="d-flex justify-content-center flex-wrap mb-5">
                  {products.map((product) => (
                    <button
                      key={
                        product._id ||
                        product.slug ||
                        product.modelName
                      }
                      className="mx-2 my-2 px-4 py-2"
                      style={{
                        background:
                          selected?.slug === product.slug
                            ? "linear-gradient(135deg, #22c55e, #16a34a)"
                            : "#ccfbf1",
                        color:
                          selected?.slug === product.slug
                            ? "#ffffff"
                            : "#065f46",
                        border: "none",
                        borderRadius: "50px",
                        fontWeight: "600",
                        minWidth: "100px",
                        boxShadow:
                          selected?.slug === product.slug
                            ? "0 4px 12px rgba(34,197,94,0.4)"
                            : "0 2px 6px rgba(0,0,0,0.08)",
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => setSelected(product)}
                    >
                      {product.modelName}
                    </button>
                  ))}
                </div>

                {/* ==================================================
                    SELECTED PRODUCT
                ================================================== */}
                {selected ? (
                  <div className="row align-items-center">
                    {/* ==================================================
                        IMAGE CAROUSEL
                    ================================================== */}
                    <div className="col-lg-6 mb-4">
                      <div
                        className="rounded-4 shadow-lg overflow-hidden p-3"
                        style={{
                          height: "460px",
                          background:
                            "linear-gradient(145deg, #f0fdfa, #ecfeff)",
                          border: "1px solid #a7f3d0",
                        }}
                      >
                        <Carousel interval={4000} pause="hover">
                          {carouselImages.map((image, index) => (
                            <Carousel.Item key={`${image}-${index}`}>
                              <div
                                style={{
                                  height: "430px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`${selected.modelName} paper and cardboard baler ${
                                    index + 1
                                  }`}
                                  style={{
                                    maxHeight: "85%",
                                    maxWidth: "85%",
                                    objectFit: "contain",
                                  }}
                                />
                              </div>
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      </div>
                    </div>

                    {/* ==================================================
                        SPECIFICATION CARD
                    ================================================== */}
                    <div className="col-lg-6">
                      <div
                        className="shadow-lg rounded-4 p-4"
                        style={{
                          background:
                            "linear-gradient(145deg, #ecfdf5, #e0f2fe)",
                          borderLeft: "6px solid #22c55e",
                        }}
                      >
                        <h4
                          className="fw-bold mb-4 text-center"
                          style={{
                            color: "#065f46",
                            fontSize: "1.6rem",
                          }}
                        >
                          {selected.modelName} Paper and Cardboard Baler
                        </h4>

                        {/* ==================================================
                            PUBLIC SPECIFICATIONS
                        ================================================== */}
                        <ul className="list-group list-group-flush mb-4">
                          {publicSpecifications.length > 0 ? (
                            publicSpecifications.map((spec, index) => (
                              <li
                                className="list-group-item bg-transparent"
                                key={`${spec.label}-${index}`}
                              >
                                <strong>{spec.label}:</strong>{" "}
                                {spec.value}
                              </li>
                            ))
                          ) : (
                            <li className="list-group-item bg-transparent">
                              Product specifications will be available
                              shortly.
                            </li>
                          )}
                        </ul>

                        {/* ==================================================
                            MODEL PAGE LINK
                        ================================================== */}
                        <Link
                          to={`/${selected.slug}`}
                          className="btn w-100"
                          style={{
                            background:
                              "linear-gradient(135deg, #22c55e, #16a34a)",
                            color: "#ffffff",
                            fontWeight: "600",
                            padding: "10px",
                            borderRadius: "8px",
                            boxShadow:
                              "0 4px 12px rgba(34,197,94,0.4)",
                          }}
                        >
                          Read more about {selected.modelName} Paper and
                          Cardboard Baler
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <p className="mb-0">
                      Select a Paper and Cardboard Baler model to view
                      details.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ======================================================
            APPLICATIONS
        ====================================================== */}
        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Applications of Paper and Cardboard Balers
          </h3>

          <p className="text-center mb-4">
            Our hydraulic paper and cardboard balers are widely used in
            recycling plants, warehouses, printing units, commercial
            facilities, and municipal paper waste collection centers where
            high-density compaction is required.
          </p>

          <div className="row text-center">
            {[
              "Cardboard Recycling Plants",
              "Printing and Packaging Units",
              "Office Paper Waste Management",
              "Warehouses and Storage Facilities",
              "Commercial Paper and Packaging Recycling",
              "Municipal Collection Centers",
            ].map((item, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div
                  className="p-4 rounded-4 shadow-sm h-100 bg-white"
                  style={{
                    border: "1px solid #c6f6d5",
                  }}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================
            WHY CHOOSE US
        ====================================================== */}
        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Why Choose Vikah Ecotech Paper and Cardboard Balers?
          </h3>

          <p>
            Vikah Ecotech stands out as a trusted paper and cardboard baler
            manufacturer in India due to our commitment to quality
            engineering, durability, and industrial performance. Our machines
            are designed for continuous operation, low maintenance, and
            high-density baling.
          </p>

          <ul>
            <li>
              Heavy-duty hydraulic cylinders for powerful compaction
            </li>
            <li>
              Energy-efficient and low power consumption design
            </li>
            <li>
              Multiple paper and cardboard baler models
            </li>
            <li>
              Customizable bale dimensions for various paper and cardboard
              types
            </li>
            <li>
              Strong nationwide installation and after-sales support
            </li>
          </ul>
        </div>

        {/* ======================================================
            TECHNICAL FEATURES
        ====================================================== */}
        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Technical Features
          </h3>

          <p>
            Our paper and cardboard balers are engineered with precision
            hydraulic systems that ensure uniform pressure distribution and
            high-density bale formation. The reinforced steel frame
            construction provides structural stability during heavy
            compaction cycles. These balers are suitable for compressing
            office paper, cartons, corrugated cardboard, and packaging scrap.
          </p>
        </div>

        {/* ======================================================
            FAQ
        ====================================================== */}
        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Frequently Asked Questions
          </h3>

          <div className="accordion" id="balerFaq">
            {[
              {
                q: "What is the price of a paper and cardboard baler machine?",
                a: "The price depends on tonnage, compaction force, automation, and customization requirements. Contact us for a detailed quotation.",
              },
              {
                q: "Which model is suitable for office and small commercial units?",
                a: "The suitable model depends on the required waste volume, bale size, and compression requirements. Please contact Vikah Ecotech for the appropriate model recommendation.",
              },
              {
                q: "Can the baler handle large corrugated cardboard cartons?",
                a: "Yes. Paper and cardboard balers are designed to compress cartons, corrugated cardboard, packaging waste, and other suitable paper-based recyclable materials.",
              },
              {
                q: "Do you provide installation and after-sales support?",
                a: "Yes. Vikah Ecotech provides installation guidance and long-term service support across India.",
              },
            ].map((faq, index) => (
              <div
                className="accordion-item mb-3 border-0 shadow-sm rounded-3"
                key={index}
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq${index}`}
                    style={{
                      backgroundColor: "#f0fff4",
                    }}
                  >
                    {faq.q}
                  </button>
                </h2>

                <div
                  id={`faq${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#balerFaq"
                >
                  <div className="accordion-body">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pcb;
