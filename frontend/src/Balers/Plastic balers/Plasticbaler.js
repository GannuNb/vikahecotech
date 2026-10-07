import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";

import "../../Other Equipments/Tyrecutting.css";
import "../../Pages/Models.css";

import mainSpecImage from "../../images/Applications/plas14.webp";
import balerImage from "../../images/Applications/plas16.jpg";
import img1 from "../../images/Applications/plas18.jpeg";

import SEOHelmet from "../../components/SEO/SEOHelmet";
import styles from "../../Styles/Topheadings.module.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchPublicProductsByApplicationName } from "../../redux/slices/publicProductSlice";

function Plasticbaler() {
  /*
   * Scroll to top when page opens
   */
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  /*
   * Redux
   */
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.publicProduct
  );

  /*
   * Selected backend product
   */
  const [selected, setSelected] = useState(null);

  /*
   * Fetch Plastic Baler products from backend
   */
  useEffect(() => {
    dispatch(fetchPublicProductsByApplicationName("Plastic Baler"));
  }, [dispatch]);

  /*
   * Automatically select first product
   */
  useEffect(() => {
    if (products && products.length > 0) {
      setSelected(products[0]);
    } else {
      setSelected(null);
    }
  }, [products]);

  /*
   * Backend product images
   *
   * If backend images are available,
   * use them.
   *
   * Otherwise use the old static images
   * as fallback.
   */
  const carouselImages =
    selected?.images?.length > 0
      ? selected.images
      : [mainSpecImage, balerImage, img1];

  /*
   * Public specification fields
   *
   * Backend structure:
   *
   * sections
   *   -> fields
   *      -> isPublic
   *
   * Only public fields are displayed.
   */
  const publicSpecifications =
    selected?.sections?.flatMap((section) =>
      (section.fields || [])
        .filter((field) => field.isPublic)
        .map((field) => ({
          label: field.name,
          value: field.value,
        }))
    ) || [];

  return (
    <div>
      {/* ================= SEO ================= */}

      <SEOHelmet
        title="Plastic Baler Machines Manufacturer in India | Vikah Ecotech"
        description="Industrial plastic baler machines for PET, HDPE, LDPE and plastic waste recycling."
        keywords="plastic baler machine, PET baler, HDPE baler"
        canonical="https://vikahecotech.com/plasticbaler"
        pageName="Plastic Baler Machines"
        products={products}
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
            name: "Plastic Balers",
            url: "https://vikahecotech.com/plasticbaler",
          },
        ]}
      />

      {/* ================= HERO CAROUSEL ================= */}

      <div className={styles.heroWrapper}>
        <Carousel controls indicators interval={4000}>
          {/* Slide 1 */}

          <Carousel.Item>
            <img
              className={styles.heroImage}
              src={mainSpecImage}
              alt="Plastic Baler Machine"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Plastic Baler Machines
                </h1>

                <p className={styles.heroSubtitle}>
                  High-performance balers designed for compressing plastic
                  waste into compact bales for efficient recycling and
                  transportation.
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
              alt="Industrial Plastic Baler"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Industrial Plastic Balers
                </h1>

                <p className={styles.heroSubtitle}>
                  Heavy-duty machines engineered for recycling facilities,
                  helping reduce plastic waste volume and improve handling
                  efficiency.
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
              alt="Hydraulic Plastic Baler"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Advanced Hydraulic Balers
                </h1>

                <p className={styles.heroSubtitle}>
                  Powerful hydraulic systems designed to compress plastic
                  scrap for recycling industries and waste management plants.
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

      {/* ================= MAIN CONTENT ================= */}

      <div className="container-fluid px-4 px-md-5 my-5">
        {/* ================= INTRO SECTION ================= */}

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
                Plastic Baler Machines Manufacturer in India
              </h2>

              <p
                className="lead mb-3"
                style={{
                  fontSize: "1.125rem",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#2d3748",
                }}
              >
                Vikah Ecotech manufactures hydraulic plastic baler machines
                for PET bottles, HDPE containers, LDPE films, packaging waste,
                and other plastic scrap materials. Our balers deliver
                consistent compression, durable construction, and easy
                operation for industrial recycling plants and commercial waste
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
                Available in multiple tonnage options including 50 Ton, 75
                Ton, and 100 Ton, our plastic balers ensure reliable
                performance, low maintenance, and long service life.
              </p>
            </div>
          </div>
        </div>

        {/* ================= FULL WIDTH MODEL SECTION ================= */}

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
              Available Plastic Baler Models
            </h3>

            {/* ================= LOADING ================= */}

            {loading && (
              <div className="text-center py-4">
                <div
                  className="spinner-border"
                  role="status"
                  style={{ color: "#16a34a" }}
                >
                  <span className="visually-hidden">
                    Loading...
                  </span>
                </div>

                <p className="mt-3 mb-0">
                  Loading Plastic Baler models...
                </p>
              </div>
            )}

            {/* ================= ERROR ================= */}

            {!loading && error && (
              <div className="alert alert-danger text-center">
                Unable to load Plastic Baler models.
              </div>
            )}

            {/* ================= NO PRODUCTS ================= */}

            {!loading &&
              !error &&
              products.length === 0 && (
                <div className="alert alert-warning text-center">
                  No Plastic Baler models are currently available.
                </div>
              )}

            {/* ================= MODEL BUTTONS ================= */}

            {!loading && !error && products.length > 0 && (
              <div className="d-flex justify-content-center flex-wrap mb-5">
                {products.map((product) => (
                  <button
                    key={product._id}
                    className="mx-2 my-2 px-4 py-2"
                    style={{
                      background:
                        selected?._id === product._id
                          ? "linear-gradient(135deg, #22c55e, #16a34a)"
                          : "#ccfbf1",

                      color:
                        selected?._id === product._id
                          ? "#ffffff"
                          : "#065f46",

                      border: "none",
                      borderRadius: "50px",
                      fontWeight: "600",
                      minWidth: "100px",

                      boxShadow:
                        selected?._id === product._id
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
            )}

            {/* ================= SELECTED PRODUCT ================= */}

            {!loading && !error && selected && (
              <>
                {/* ================= CAROUSEL + SPEC CARD ================= */}

                <div className="row align-items-center">
                  {/* ================= PRODUCT IMAGES ================= */}

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
                        {carouselImages.map((img, i) => (
                          <Carousel.Item key={i}>
                            <div
                              style={{
                                height: "430px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={img}
                                alt={`${selected.modelName || "Plastic Baler"} plastic baler ${i + 1}`}
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

                  {/* ================= PRODUCT DETAILS ================= */}

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
                        {selected.modelName} Plastic Baler
                      </h4>

                      {/* ================= PUBLIC SPECIFICATIONS ================= */}

                      {publicSpecifications.length > 0 ? (
                        <ul className="list-group list-group-flush mb-4">
                          {publicSpecifications.map((spec, index) => (
                            <li
                              key={`${spec.label}-${index}`}
                              className="list-group-item bg-transparent"
                            >
                              <strong>{spec.label}:</strong>{" "}
                              {spec.value}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center text-muted mb-4">
                          Product specifications are currently unavailable.
                        </p>
                      )}

                      {/* ================= READ MORE ================= */}

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
                        Read more about {selected.modelName} Plastic Baler
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ================= APPLICATIONS ================= */}

        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Applications of Plastic Balers
          </h3>

          <p className="text-center mb-4">
            Vikah Ecotech hydraulic plastic balers are widely used in
            industrial recycling, commercial waste management, and packaging
            recycling plants.
          </p>

          <div className="row text-center">
            {[
              "PET & HDPE Bottles",
              "LDPE Films & Packaging Waste",
              "Plastic Scrap Baling",
              "Industrial Waste Management",
              "Commercial Recycling Facilities",
              "Plastic Reprocessing Industries",
            ].map((item, index) => (
              <div
                className="col-md-4 mb-3"
                key={index}
              >
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

        {/* ================= WHY CHOOSE US ================= */}

        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Why Choose Vikah Ecotech Plastic Balers?
          </h3>

          <p>
            Vikah Ecotech stands out as a leading plastic baler manufacturer
            in India due to our robust engineering, high-density compaction,
            and reliable industrial performance.
          </p>

          <ul>
            <li>
              Heavy-duty hydraulic cylinders for strong compression
            </li>

            <li>
              Energy-efficient design with low power consumption
            </li>

            <li>
              Available in 50 Ton, 75 Ton & 100 Ton models
            </li>

            <li>
              Customizable bale dimensions
            </li>

            <li>
              Nationwide installation and after-sales support
            </li>
          </ul>
        </div>

        {/* ================= TECHNICAL FEATURES ================= */}

        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Technical Features
          </h3>

          <p>
            Our plastic balers are equipped with precision hydraulic systems
            for uniform pressure distribution, reinforced steel frames for
            structural stability, and high-density bale formation. Ideal for
            compressing PET bottles, LDPE films, and industrial plastic scrap.
          </p>
        </div>

        {/* ================= FAQ ================= */}

        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Frequently Asked Questions
          </h3>

          <div
            className="accordion"
            id="plasticBalerFaq"
          >
            {[
              {
                q: "Which plastic materials can be baled?",
                a: "Our balers can handle PET, HDPE, LDPE, and other packaging plastics.",
              },
              {
                q: "What compaction force is recommended?",
                a: "50 Ton to 100 Ton balers are available depending on plastic type, material volume, and required bale density.",
              },
              {
                q: "Can these balers handle commercial and industrial scrap?",
                a: "Yes, they are designed for industrial recycling plants and commercial facilities.",
              },
              {
                q: "Do you provide installation and after-sales service?",
                a: "Yes, we provide complete guidance and support across India.",
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
                    data-bs-target={`#plasticBalerFaq${index}`}
                    style={{
                      backgroundColor: "#f0fff4",
                    }}
                  >
                    {faq.q}
                  </button>
                </h2>

                <div
                  id={`plasticBalerFaq${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#plasticBalerFaq"
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

export default Plasticbaler;