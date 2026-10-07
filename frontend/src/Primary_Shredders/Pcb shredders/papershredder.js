import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../Other Equipments/Tyrecutting.css";
import "../../Pages/Models.css";

import Carousel from "react-bootstrap/Carousel";

import shredderhd from "../../images/Applications/shredpcb1.jpg";
import shredderhd1 from "../../images/Applications/shredpcb4.jpg";
import shredderhdimg from "../../images/Applications/shredpcb7.jpg";

import SEOHelmet from "../../components/SEO/SEOHelmet";
import styles from "../../Styles/Topheadings.module.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchPublicProductsByApplicationName } from "../../redux/slices/publicProductSlice";

function Papershredder() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(
      fetchPublicProductsByApplicationName(
        "Paper and Cardboard Shredders"
      )
    );
  }, [dispatch]);

  /*
   * ================= REDUX STATE =================
   *
   * Supports different possible reducer names safely.
   */
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

  /*
   * ================= SELECTED PRODUCT =================
   */
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      setSelected(products[0]);
    }
  }, [products]);

  /*
   * ================= FALLBACK IMAGES =================
   *
   * These are the original static images from the page.
   * Backend product images will be used when available.
   */
  const fallbackImages = [
    shredderhd,
    shredderhd1,
    shredderhdimg,
  ];

  /*
   * ================= PRODUCT IMAGES =================
   *
   * Only model images are taken dynamically from backend.
   */
  const carouselImages =
    selected?.images && selected.images.length > 0
      ? selected.images
      : fallbackImages;

  /*
   * ================= PUBLIC SPECIFICATIONS =================
   *
   * Backend structure:
   *
   * sections: [
   *   {
   *     fields: [
   *       {
   *         name,
   *         value,
   *         isPublic
   *       }
   *     ]
   *   }
   * ]
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

  /*
   * ================= MODEL NAME =================
   */
  const modelName =
    selected?.modelName ||
    selected?.name ||
    selected?.title ||
    "Paper and Cardboard Shredder";

  /*
   * ================= SEO PRODUCTS =================
   *
   * Keeping SEO structure separate from the dynamic
   * model display. The actual model section below
   * uses backend data.
   */
  const seoProducts = [
    {
      name: "SHC6000",
      description:
        "Paper and Cardboard Shredder SHC6000 for efficient paper, carton and cardboard waste processing.",
      image: "https://vikahecotech.com/images/shredder_hd1.jpg",
      url: "https://vikahecotech.com/shc6000",
      price: "4500000",
    },
    {
      name: "SHC8000",
      description:
        "Paper and Cardboard Shredder SHC8000 for continuous commercial recycling operations.",
      image: "https://vikahecotech.com/images/st.jpeg",
      url: "https://vikahecotech.com/shc8000",
      price: "5800000",
    },
    {
      name: "SHC12000",
      description:
        "Heavy-duty Paper and Cardboard Shredder SHC12000 for high-volume industrial shredding.",
      image: "https://vikahecotech.com/images/Shredder.png",
      url: "https://vikahecotech.com/shc12000",
      price: "7200000",
    },
  ];

  /*
   * ================= LOADING =================
   */
  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          fontWeight: "600",
        }}
      >
        Loading Paper and Cardboard Shredders...
      </div>
    );
  }

  /*
   * ================= ERROR =================
   */
  if (error) {
    return (
      <div
        className="container py-5 text-center"
        style={{ minHeight: "50vh" }}
      >
        <h3 className="fw-bold text-danger mb-3">
          Unable to load shredder models
        </h3>

        <p>{error}</p>
      </div>
    );
  }

  /*
   * ================= NO PRODUCTS =================
   */
  if (!selected || products.length === 0) {
    return (
      <div
        className="container py-5 text-center"
        style={{ minHeight: "50vh" }}
      >
        <h3 className="fw-bold mb-3">
          Paper and Cardboard Shredders
        </h3>

        <p>
          No Paper and Cardboard Shredder models are currently
          available.
        </p>
      </div>
    );
  }

  return (
    <div>

      {/* ================= SEO HELMET ================= */}

      <SEOHelmet
        title="Paper & Cardboard Shredder Machines Manufacturer in India | Vikah Ecotech"
        description="Vikah Ecotech manufactures paper and cardboard shredder machines for recycling cartons, office paper and packaging waste."
        keywords="paper shredder machine, cardboard shredder machine, paper recycling shredder"
        canonical="https://vikahecotech.com/papershredder"
        pageName="Paper & Cardboard Shredder Machines"
        products={seoProducts}
        breadcrumb={[
          {
            name: "Home",
            url: "https://vikahecotech.com",
          },
          {
            name: "Primary Shredders",
            url: "https://vikahecotech.com/primary-shredder",
          },
          {
            name: "Paper & Cardboard Shredders",
            url: "https://vikahecotech.com/papershredder",
          },
        ]}
      />

      {/* ================= HEADER ================= */}

      {/* ================= HERO CAROUSEL ================= */}

      <div className={styles.heroWrapper}>

        <Carousel controls indicators interval={4000}>

          {/* ================= SLIDE 1 ================= */}

          <Carousel.Item>

            <img
              className={styles.heroImage}
              src={shredderhd}
              alt="Paper Cardboard Shredder Machine"
            />

            <div className={styles.heroOverlay}>

              <div className={styles.heroContent}>

                <h1 className={styles.heroTitle}>
                  Paper & Cardboard Shredders
                </h1>

                <p className={styles.heroSubtitle}>
                  Industrial shredders designed for efficient size
                  reduction of paper waste, cartons, and corrugated
                  packaging materials.
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

          {/* ================= SLIDE 2 ================= */}

          <Carousel.Item>

            <img
              className={styles.heroImage}
              src={shredderhd1}
              alt="Industrial Cardboard Shredder"
            />

            <div className={styles.heroOverlay}>

              <div className={styles.heroContent}>

                <h1 className={styles.heroTitle}>
                  Industrial Paper Shredding
                </h1>

                <p className={styles.heroSubtitle}>
                  Heavy-duty shredders engineered for recycling
                  facilities handling large volumes of paper and
                  packaging waste.
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

          {/* ================= SLIDE 3 ================= */}

          <Carousel.Item>

            <img
              className={styles.heroImage}
              src={shredderhdimg}
              alt="Hydraulic Cardboard Shredder"
            />

            <div className={styles.heroOverlay}>

              <div className={styles.heroContent}>

                <h1 className={styles.heroTitle}>
                  High Performance Shredders
                </h1>

                <p className={styles.heroSubtitle}>
                  Advanced shredding technology delivering consistent
                  particle size and reliable operation for paper
                  recycling industries.
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
                Paper & Cardboard Shredders Manufacturer in India
              </h2>

              <p
                className="lead mb-3"
                style={{
                  fontSize: "1.125rem",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#2d3748",
                }}
              >
                Vikah Ecotech manufactures primary paper and
                cardboard shredders designed to efficiently process
                office paper, corrugated cartons, packaging waste,
                and bulk cardboard.
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#4a5568",
                }}
              >
                Built with dual-shaft hydraulic cutting systems,
                automated feed options, and heavy-duty industrial
                construction, our shredders ensure high-volume
                performance, low maintenance, and long service life
                in demanding recycling operations.
              </p>

            </div>

          </div>

        </div>

        {/* ================= FULL WIDTH MODEL SECTION ================= */}

        <div
          id="modelsSection"
          className="py-5 px-3 px-md-5 mb-5"
          style={{
            background:
              "linear-gradient(135deg, #f0fdfa, #e6fffa)",
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
              Available Paper & Cardboard Shredder Models
            </h3>

            {/* ================= MODEL BUTTONS ================= */}

            <div className="d-flex justify-content-center flex-wrap mb-5">

              {products.map((machine, index) => {

                const machineName =
                  machine.modelName ||
                  machine.name ||
                  machine.title ||
                  `Model ${index + 1}`;

                const selectedName =
                  selected?.modelName ||
                  selected?.name ||
                  selected?.title;

                return (
                  <button
                    key={machine._id || machine.id || index}
                    className="mx-2 my-2 px-4 py-2"
                    style={{
                      background:
                        selectedName === machineName
                          ? "linear-gradient(135deg, #22c55e, #16a34a)"
                          : "#ccfbf1",

                      color:
                        selectedName === machineName
                          ? "#ffffff"
                          : "#065f46",

                      border: "none",
                      borderRadius: "50px",
                      fontWeight: "600",
                      minWidth: "120px",

                      boxShadow:
                        selectedName === machineName
                          ? "0 4px 12px rgba(34,197,94,0.4)"
                          : "0 2px 6px rgba(0,0,0,0.08)",

                      transition: "all 0.3s ease",
                    }}
                    onClick={() => setSelected(machine)}
                  >
                    {machineName}
                  </button>
                );
              })}

            </div>

            {/* ================= CAROUSEL + SPEC CARD ================= */}

            <div className="row align-items-center">

              {/* ================= CAROUSEL CARD ================= */}

              <div className="col-lg-6 mb-4">

                <div
                  className="rounded-4 shadow-lg overflow-hidden p-3"
                  style={{
                    height: "460px",
                    background:
                      "linear-gradient(145deg, #ecfeff, #f0fdfa)",
                    border: "1px solid #a7f3d0",
                  }}
                >

                  <Carousel
                    interval={4000}
                    pause="hover"
                  >

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
                            alt={`${modelName} paper and cardboard shredder ${
                              i + 1
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

              {/* ================= SPEC CARD ================= */}

              <div className="col-lg-6">

                <div
                  className="shadow-lg rounded-4 p-4"
                  style={{
                    background:
                      "linear-gradient(145deg, #e0f2fe, #ecfdf5)",
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
                    {modelName}
                  </h4>

                  {/* ================= PUBLIC SPECIFICATIONS ================= */}

                  <h5
                    className="fw-bold mb-3"
                    style={{
                      color: "#166534",
                    }}
                  >
                    Specifications
                  </h5>

                  {publicSpecifications.length > 0 ? (

                    <ul className="list-group list-group-flush mb-4">

                      {publicSpecifications.map(
                        (specification, index) => (

                          <li
                            key={index}
                            className="list-group-item bg-transparent"
                          >
                            <strong>
                              {specification.label}:
                            </strong>{" "}
                            {specification.value}
                          </li>

                        )
                      )}

                    </ul>

                  ) : (

                    <p className="text-muted mb-4">
                      No public specifications available for
                      this model.
                    </p>

                  )}

                  {/* ================= MODEL LINK ================= */}

                  <Link
                    to={`/${selected.slug || modelName.toLowerCase()}`}
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
                    Read more about {modelName}
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= APPLICATIONS ================= */}

        <div className="container mb-5">

          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Applications of Paper & Cardboard Shredders
          </h3>

          <p className="text-center mb-4">
            Used in offices, printing units, warehouses, and
            recycling plants for shredding paper, cartons,
            cardboard, and packaging waste.
          </p>

          <div className="row text-center">

            {[
              "Office Paper Recycling",
              "Carton & Cardboard Shredding",
              "Packaging Waste Reduction",
              "Industrial Paper Recycling",
              "Commercial Cardboard Processing",
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
            Why Choose Vikah Ecotech Paper & Cardboard Shredders?
          </h3>

          <p>
            Vikah Ecotech shredders are built for high-volume,
            high-torque shredding operations, low maintenance,
            and precise processing of paper and cardboard waste.
          </p>

          <ul>

            <li>
              Dual-shaft hydraulic cutting system for uniform
              shredding
            </li>

            <li>
              Automated feed conveyor for continuous operation
            </li>

            <li>
              Heavy-duty construction for industrial applications
            </li>

            <li>
              Reliable operation for offices, warehouses, and
              recycling plants
            </li>

            <li>
              Installation and nationwide after-sales support
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
            Industrial-grade cutting shafts, high-torque hydraulic
            systems, energy-efficient drives, safety interlocks,
            and durable components ensure smooth operation,
            consistent throughput, and minimal downtime. Ideal for
            processing office paper, cartons, corrugated
            cardboard, and packaging materials.
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
            id="paperShredderFaq"
          >

            {[
              {
                q: "What is the power range for each paper shredder model?",
                a: "SHC6000: 80–120 HP, SHC8000: 120–180 HP, SHC12000: 180–240 HP.",
              },
              {
                q: "Which model is suitable for office or small-scale cardboard shredding?",
                a: "SHC6000 is ideal for low to medium volume shredding operations.",
              },
              {
                q: "Do these shredders use hydraulic systems?",
                a: "Yes, all models feature hydraulic cutting systems suitable for industrial applications.",
              },
              {
                q: "Do you provide installation and support?",
                a: "Yes, we provide nationwide installation guidance and after-sales support.",
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
                  data-bs-parent="#paperShredderFaq"
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

export default Papershredder;