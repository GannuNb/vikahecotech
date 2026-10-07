import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";

import "../../Other Equipments/Tyrecutting.css";
import "../../Pages/Models.css";

import metalImg1 from "../../images/Applications/appm1.jpg";
import metalImg2 from "../../images/Applications/appm4.jpg";
import metalImg3 from "../../images/Applications/appm6.jpg";

import SEOHelmet from "../../components/SEO/SEOHelmet";
import styles from "../../Styles/Topheadings.module.css";

import { fetchPublicProductsByApplicationName } from "../../redux/slices/publicProductSlice";

function Metalbaler() {
  const dispatch = useDispatch();

  // ============================================================
  // SCROLL TO TOP
  // ============================================================
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ============================================================
  // REDUX STATE
  // ============================================================
  // Safe fallback prevents:
  // Cannot destructure property 'products' ... as it is undefined
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
  // FETCH METAL BALER PRODUCTS
  // ============================================================
  useEffect(() => {
    dispatch(fetchPublicProductsByApplicationName("Metal Baler"));
  }, [dispatch]);

  // ============================================================
  // SELECT FIRST PRODUCT
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
      : [metalImg1, metalImg2, metalImg3];

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
  // SEO PRODUCTS
  // ============================================================
  const seoProducts = products.map((product) => ({
    name: product.modelName || "",
    description:
      product.description ||
      `Metal Baler ${product.modelName || ""}`,
    image:
      Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : "https://vikahecotech.com/images/baler_bg.png",
    url: product.slug
      ? `https://vikahecotech.com/${product.slug}`
      : "https://vikahecotech.com/metalbaler",
  }));

  return (
    <div>
      {/* ========================================================
          SEO
      ======================================================== */}
      <SEOHelmet
        title="Metal Baler Machines Manufacturer in India | Vikah Ecotech"
        description="Vikah Ecotech manufactures heavy-duty hydraulic metal baler machines for ferrous and non-ferrous metal recycling."
        keywords="metal baler machine, hydraulic metal baler, metal recycling baler"
        canonical="https://vikahecotech.com/metalbaler"
        pageName="Metal Baler Machines"
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
            name: "Metal Balers",
            url: "https://vikahecotech.com/metalbaler",
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
              src={metalImg1}
              alt="Metal Baler Machine"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Metal Balers
                </h1>

                <p className={styles.heroSubtitle}>
                  Heavy-duty hydraulic baler machines designed for
                  compressing ferrous and non-ferrous metal materials
                  into dense bales for efficient recycling.
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
              src={metalImg2}
              alt="Industrial Metal Baler"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Industrial Metal Balers
                </h1>

                <p className={styles.heroSubtitle}>
                  Engineered for metal recycling plants and scrap yards,
                  delivering powerful compression for aluminum, steel,
                  and alloy materials.
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
              src={metalImg3}
              alt="Hydraulic Metal Baler"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Hydraulic Metal Compaction
                </h1>

                <p className={styles.heroSubtitle}>
                  Advanced hydraulic technology providing high
                  compaction force for heavy metal recycling and
                  waste volume reduction.
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
                Metal Baler Machines Manufacturer in India
              </h2>

              <p
                className="lead mb-3"
                style={{
                  fontSize: "1.125rem",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#2d3748",
                }}
              >
                Vikah Ecotech manufactures hydraulic metal balers for
                efficient recycling of ferrous and non-ferrous metals
                including aluminum, copper, brass, mild steel, and
                stainless steel. Our machines are engineered for high
                compaction, durability, and consistent performance in
                scrap yards, foundries, and industrial recycling plants.
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
                Built with heavy-duty steel frames and high-pressure
                hydraulic systems, our metal balers reduce storage space,
                improve handling efficiency, and provide uniform bale
                formation for metal materials.
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#4a5568",
                }}
              >
                The available metal baler models are loaded dynamically
                from the product database, with each model displaying
                its own images and public specifications.
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
            background:
              "linear-gradient(135deg, #e6fffa, #f0fdfa)",
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
              Available Metal Baler Models
            </h3>

            {/* ==================================================
                LOADING
            ================================================== */}
            {loading ? (
              <div className="text-center py-5">
                <p className="mb-0">
                  Loading Metal Baler models...
                </p>
              </div>
            ) : error ? (
              /* ==================================================
                 ERROR
              ================================================== */
              <div className="text-center py-5">
                <p className="text-danger mb-0">
                  Unable to load Metal Baler models.
                </p>

                <p className="text-muted mt-2 mb-0">
                  {typeof error === "string"
                    ? error
                    : "Please try again later."}
                </p>
              </div>
            ) : products.length === 0 ? (
              /* ==================================================
                 EMPTY
              ================================================== */
              <div className="text-center py-5">
                <p className="mb-0">
                  No Metal Baler models are available.
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
                        minWidth: "120px",
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
                        <Carousel
                          interval={4000}
                          pause="hover"
                        >
                          {carouselImages.map((image, index) => (
                            <Carousel.Item
                              key={`${image}-${index}`}
                            >
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
                                  alt={`${selected.modelName} metal baler ${
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
                          {selected.modelName} Metal Baler
                        </h4>

                        {/* ==================================================
                            PUBLIC SPECIFICATIONS
                        ================================================== */}
                        <ul className="list-group list-group-flush mb-4">
                          {publicSpecifications.length > 0 ? (
                            publicSpecifications.map(
                              (spec, index) => (
                                <li
                                  className="list-group-item bg-transparent"
                                  key={`${spec.label}-${index}`}
                                >
                                  <strong>
                                    {spec.label}:
                                  </strong>{" "}
                                  {spec.value}
                                </li>
                              )
                            )
                          ) : (
                            <li className="list-group-item bg-transparent">
                              Product specifications will be
                              available shortly.
                            </li>
                          )}
                        </ul>

                        {/* ==================================================
                            MODEL PAGE
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
                          Read more about {selected.modelName} Metal
                          Baler
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <p className="mb-0">
                      Select a Metal Baler model to view details.
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
            Applications of Metal Balers
          </h3>

          <p className="text-center mb-4">
            Our hydraulic metal balers are widely used in recycling
            plants, foundries, metal processing units, industrial
            warehouses, and commercial metal collection centers for
            high-density metal compaction.
          </p>

          <div className="row text-center">
            {[
              "Ferrous Metal Recycling Plants",
              "Non-Ferrous Material Processing Units",
              "Industrial Material Yards",
              "Metal Foundries",
              "Commercial Metal Collection Centers",
              "Warehouse and Storage Optimization",
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
            Why Choose Vikah Ecotech Metal Balers?
          </h3>

          <p>
            Vikah Ecotech is a trusted metal baler manufacturer in
            India due to our robust design, reliable hydraulic systems,
            and long-lasting performance. Our balers are designed for
            continuous industrial operations and maximum compaction
            efficiency.
          </p>

          <ul>
            <li>
              Heavy-duty hydraulic cylinders for powerful metal
              compression
            </li>

            <li>
              Energy-efficient design with low operational cost
            </li>

            <li>
              Multiple metal baler models for different requirements
            </li>

            <li>
              Customizable bale dimensions for various metal materials
            </li>

            <li>
              Nationwide installation and after-sales support
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
            Our metal balers are built with high-pressure hydraulic
            systems, reinforced steel frames, and safety features to
            ensure uniform pressure distribution and high-density
            bale formation. They are suitable for aluminum, copper,
            brass, steel, and other suitable ferrous and non-ferrous
            materials.
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
                q: "What is the price of a metal baler?",
                a: "The price depends on the model, compaction force, automation, and customization requirements. Contact Vikah Ecotech for a quotation.",
              },
              {
                q: "Which metal baler model is suitable for smaller operations?",
                a: "The suitable model depends on the required material volume, bale size, and compaction requirements. Contact Vikah Ecotech for the appropriate model recommendation.",
              },
              {
                q: "Can metal balers handle different metal materials?",
                a: "Yes. Metal balers can be designed for suitable ferrous and non-ferrous materials such as aluminum, copper, brass, and steel.",
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

export default Metalbaler;