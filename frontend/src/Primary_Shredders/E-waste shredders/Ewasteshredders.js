import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "../../Other Equipments/Tyrecutting.css";
import "../../Pages/Models.css";

import Carousel from "react-bootstrap/Carousel";

import SEOHelmet from "../../components/SEO/SEOHelmet";
import styles from "../../Styles/Topheadings.module.css";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchPublicProductsByApplicationName,
} from "../../redux/slices/publicProductSlice";

// =========================================================
// MANUAL E-WASTE APPLICATION IMAGES
// =========================================================

import ewastehd1 from "../../images/Applications/ewaste.jpg";
import ewastehd2 from "../../images/Applications/ewaste2.webp";
import ewastehd3 from "../../images/Applications/shredewaste.jpeg";


function Ewasteshredders() {
  const dispatch = useDispatch();

  // =========================================================
  // MANUAL HERO IMAGES
  // =========================================================

  const heroImages = [
    ewastehd1,
    ewastehd2,
    ewastehd3,
  ];

  // =========================================================
  // FETCH E-WASTE SHREDDER PRODUCTS
  // =========================================================

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(
      fetchPublicProductsByApplicationName(
        "E-Waste Shredders"
      )
    );
  }, [dispatch]);

  // =========================================================
  // REDUX STATE
  // =========================================================

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

  // =========================================================
  // SELECTED MODEL
  // =========================================================

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      setSelected(products[0]);
    }
  }, [products]);

  // =========================================================
  // MODEL NAME
  // =========================================================

  const modelName =
    selected?.modelName ||
    selected?.name ||
    selected?.title ||
    "E-Waste Shredder";

  // =========================================================
  // SELECTED MODEL IMAGES
  // BACKEND ONLY
  // =========================================================

  const modelImages =
    selected?.images &&
    selected.images.length > 0
      ? selected.images
      : [];

  // =========================================================
  // PUBLIC SPECIFICATIONS
  // BACKEND ONLY
  // =========================================================

  const publicSpecifications =
    selected?.sections?.flatMap((section) =>
      (section.fields || [])
        .filter((field) => field.isPublic)
        .map((field) => ({
          label: field.name,
          value: field.value,
        }))
    ) || [];

  // =========================================================
  // SEO PRODUCTS
  // =========================================================

  const seoProducts = products.map((product) => {
    const productName =
      product.modelName ||
      product.name ||
      product.title ||
      "E-Waste Shredder";

    const productImage =
      product.images &&
      product.images.length > 0
        ? product.images[0]
        : "";

    return {
      name: productName,

      description:
        "E-Waste shredder machine designed for efficient processing and recycling of electronic waste.",

      image: productImage,

      url: product.slug
        ? `https://vikahecotech.com/${product.slug}`
        : "https://vikahecotech.com/ewasteshredder",

      price: product.price || "",
    };
  });

  return (
    <div>

      {/* =====================================================
          SEO
      ===================================================== */}

      <SEOHelmet
        title="E-Waste Shredder Machines Manufacturer in India | Vikah Ecotech"
        description="Vikah Ecotech manufactures E-Waste shredder machines for efficient processing and recycling of electronic waste and discarded electrical equipment."
        keywords="e-waste shredder machine, electronic waste shredder, e-waste recycling shredder, electronic waste recycling machine"
        canonical="https://vikahecotech.com/ewasteshredder"
        pageName="E-Waste Shredder Machines"
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
            name: "E-Waste Shredders",
            url: "https://vikahecotech.com/ewasteshredder",
          },
        ]}
      />

      {/* =====================================================
          HERO SECTION
          STATIC APPLICATION IMAGES
      ===================================================== */}

      <div className={styles.heroWrapper}>

        <Carousel
          controls
          indicators
          interval={4000}
        >

          {/* ================= SLIDE 1 ================= */}

          <Carousel.Item>

            <div
              style={{
                minHeight: "500px",
                background:
                  "linear-gradient(135deg, #064e3b, #166534, #15803d)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >

              {heroImages[0] && (
                <img
                  className={styles.heroImage}
                  src={heroImages[0]}
                  alt="E-Waste Shredder Machine"
                  style={{
                    opacity: 0.65,
                  }}
                />
              )}

              <div className={styles.heroOverlay}>

                <div className={styles.heroContent}>

                  <h1 className={styles.heroTitle}>
                    E-Waste Shredders
                  </h1>

                  <p className={styles.heroSubtitle}>
                    Industrial shredding solutions designed for
                    efficient processing of electronic and
                    electrical waste.
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

            </div>

          </Carousel.Item>


          {/* ================= SLIDE 2 ================= */}

          <Carousel.Item>

            <div
              style={{
                minHeight: "500px",
                background:
                  "linear-gradient(135deg, #14532d, #166534, #22c55e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >

              {heroImages[1] && (
                <img
                  className={styles.heroImage}
                  src={heroImages[1]}
                  alt="Industrial E-Waste Shredder"
                  style={{
                    opacity: 0.65,
                  }}
                />
              )}

              <div className={styles.heroOverlay}>

                <div className={styles.heroContent}>

                  <h1 className={styles.heroTitle}>
                    Industrial E-Waste Shredding
                  </h1>

                  <p className={styles.heroSubtitle}>
                    Reliable size reduction technology for
                    electronic waste recycling and material
                    recovery operations.
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

            </div>

          </Carousel.Item>


          {/* ================= SLIDE 3 ================= */}

          <Carousel.Item>

            <div
              style={{
                minHeight: "500px",
                background:
                  "linear-gradient(135deg, #052e16, #15803d, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >

              {heroImages[2] && (
                <img
                  className={styles.heroImage}
                  src={heroImages[2]}
                  alt="High Performance E-Waste Shredder"
                  style={{
                    opacity: 0.65,
                  }}
                />
              )}

              <div className={styles.heroOverlay}>

                <div className={styles.heroContent}>

                  <h1 className={styles.heroTitle}>
                    High Performance Shredders
                  </h1>

                  <p className={styles.heroSubtitle}>
                    Robust shredding systems for dependable
                    electronic waste processing and recycling
                    applications.
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

            </div>

          </Carousel.Item>

        </Carousel>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="container-fluid px-4 px-md-5 my-5">


        {/* ===================================================
            INTRODUCTION
        =================================================== */}

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
                E-Waste Shredder Manufacturer in India
              </h2>

              <p
                className="lead mb-3"
                style={{
                  fontSize: "1.125rem",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#2d3748",
                }}
              >
                Vikah Ecotech manufactures industrial E-Waste
                shredders designed for efficient size reduction
                of electronic and electrical waste generated from
                recycling and waste processing operations.
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#4a5568",
                }}
              >
                Our shredding solutions help reduce the size of
                discarded electronic materials and prepare them
                for further sorting, separation, recovery, and
                recycling processes.
              </p>

            </div>

          </div>

        </div>


        {/* ===================================================
            MODELS SECTION
            BACKEND DATA ONLY
        =================================================== */}

        <div
          id="modelsSection"
          className="py-5 px-3 px-md-5 mb-5"
          style={{
            background:
              "linear-gradient(135deg, #f0fdf4, #ecfdf5)",
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
              Available E-Waste Shredder Models
            </h3>


            {/* =================================================
                BACKEND STATUS
            ================================================= */}

            {loading && (
              <div className="text-center mb-4">
                <p
                  className="mb-0"
                  style={{
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  Loading E-Waste Shredder models...
                </p>
              </div>
            )}


            {error && !loading && (
              <div className="text-center mb-4">
                <p
                  className="mb-0"
                  style={{
                    color: "#dc2626",
                    fontWeight: "500",
                  }}
                >
                  Unable to load E-Waste Shredder models right
                  now.
                </p>
              </div>
            )}


            {!loading &&
              !error &&
              products.length === 0 && (
                <div className="text-center mb-4">
                  <p
                    className="mb-0"
                    style={{
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    No E-Waste Shredder models are currently
                    available.
                  </p>
                </div>
              )}


            {/* =================================================
                MODEL BUTTONS
            ================================================= */}

            {products.length > 0 && (

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
                      key={
                        machine._id ||
                        machine.id ||
                        index
                      }
                      className="mx-2 my-2 px-4 py-2"
                      style={{
                        background:
                          selectedName === machineName
                            ? "linear-gradient(135deg, #22c55e, #16a34a)"
                            : "#dcfce7",

                        color:
                          selectedName === machineName
                            ? "#ffffff"
                            : "#166534",

                        border: "none",
                        borderRadius: "50px",
                        fontWeight: "600",
                        minWidth: "120px",

                        boxShadow:
                          selectedName === machineName
                            ? "0 4px 12px rgba(34,197,94,0.4)"
                            : "0 2px 6px rgba(0,0,0,0.08)",

                        transition:
                          "all 0.3s ease",
                      }}
                      onClick={() =>
                        setSelected(machine)
                      }
                    >
                      {machineName}
                    </button>
                  );
                })}

              </div>

            )}


            {/* =================================================
                SELECTED MODEL
            ================================================= */}

            {selected && products.length > 0 && (

              <div className="row align-items-center">

                {/* ================= IMAGE ================= */}

                <div className="col-lg-6 mb-4">

                  <div
                    className="rounded-4 shadow-lg overflow-hidden p-3"
                    style={{
                      height: "460px",
                      background:
                        "linear-gradient(145deg, #ecfdf5, #f0fdf4)",
                      border:
                        "1px solid #a7f3d0",
                    }}
                  >

                    {modelImages.length > 0 ? (

                      <Carousel
                        interval={4000}
                        pause="hover"
                      >

                        {modelImages.map(
                          (img, index) => (

                            <Carousel.Item
                              key={index}
                            >

                              <div
                                style={{
                                  height: "430px",
                                  display: "flex",
                                  alignItems:
                                    "center",
                                  justifyContent:
                                    "center",
                                }}
                              >

                                <img
                                  src={img}
                                  alt={`${modelName} E-Waste Shredder ${
                                    index + 1
                                  }`}
                                  style={{
                                    maxHeight:
                                      "85%",
                                    maxWidth:
                                      "85%",
                                    objectFit:
                                      "contain",
                                  }}
                                />

                              </div>

                            </Carousel.Item>

                          )
                        )}

                      </Carousel>

                    ) : (

                      <div
                        style={{
                          height: "430px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#64748b",
                        }}
                      >
                        No product images available
                      </div>

                    )}

                  </div>

                </div>


                {/* ================= SPECIFICATIONS ================= */}

                <div className="col-lg-6">

                  <div
                    className="shadow-lg rounded-4 p-4"
                    style={{
                      background:
                        "linear-gradient(145deg, #ecfdf5, #f0fdf4)",
                      borderLeft:
                        "6px solid #22c55e",
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
                        No public specifications available
                        for this model.
                      </p>

                    )}


                    {/* ================= MODEL PAGE ================= */}

                    <Link
                      to={
                        selected.slug
                          ? `/${selected.slug}`
                          : "#"
                      }
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

            )}

          </div>

        </div>


        {/* ===================================================
            APPLICATIONS
        =================================================== */}

        <div className="container mb-5">

          <h3
            className="fw-bold text-center mb-4"
            style={{
              color: "#2f855a",
            }}
          >
            Applications of E-Waste Shredders
          </h3>

          <p className="text-center mb-4">
            E-Waste shredders can be used in recycling and waste
            processing facilities for size reduction of discarded
            electronic and electrical materials.
          </p>

          <div className="row text-center">

            {[
              "Electronic Waste Recycling",
              "Electrical Equipment Recycling",
              "Computer and IT Equipment Processing",
              "Electronic Component Processing",
              "E-Waste Material Recovery",
              "Recycling Plant Operations",
            ].map((item, index) => (

              <div
                className="col-md-4 mb-3"
                key={index}
              >

                <div
                  className="p-4 rounded-4 shadow-sm h-100 bg-white"
                  style={{
                    border:
                      "1px solid #c6f6d5",
                  }}
                >
                  {item}
                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ===================================================
            WHY CHOOSE US
        =================================================== */}

        <div className="container mb-5">

          <h3
            className="fw-bold text-center mb-4"
            style={{
              color: "#2f855a",
            }}
          >
            Why Choose Vikah Ecotech E-Waste Shredders?
          </h3>

          <p>
            Vikah Ecotech E-Waste shredders are designed to
            provide reliable size reduction performance for
            demanding recycling and waste processing operations.
          </p>

          <ul>

            <li>
              Robust construction for industrial shredding
              applications
            </li>

            <li>
              High-torque shredding performance
            </li>

            <li>
              Efficient size reduction of electronic waste
            </li>

            <li>
              Suitable for recycling and material recovery
              operations
            </li>

            <li>
              Reliable operation with low maintenance
              requirements
            </li>

            <li>
              Installation and nationwide after-sales support
            </li>

          </ul>

        </div>


        {/* ===================================================
            TECHNICAL FEATURES
        =================================================== */}

        <div className="container mb-5">

          <h3
            className="fw-bold text-center mb-4"
            style={{
              color: "#2f855a",
            }}
          >
            Technical Features
          </h3>

          <p>
            Industrial-grade cutting components, high-torque
            drive systems, durable construction, safety features,
            and reliable operating mechanisms help provide
            consistent shredding performance with reduced
            downtime. The machines are designed for demanding
            electronic waste recycling environments.
          </p>

        </div>


        {/* ===================================================
            FAQ
        =================================================== */}

        <div className="container mb-5">

          <h3
            className="fw-bold text-center mb-4"
            style={{
              color: "#2f855a",
            }}
          >
            Frequently Asked Questions
          </h3>

          <div
            className="accordion"
            id="ewasteShredderFaq"
          >

            {[
              {
                q: "What is an E-Waste Shredder?",
                a: "An E-Waste Shredder is an industrial machine used to reduce the size of discarded electronic and electrical waste for further sorting, separation, recovery, and recycling processes.",
              },
              {
                q: "Where are E-Waste Shredders used?",
                a: "They are used in electronic waste recycling facilities, material recovery operations, waste processing plants, and other industrial recycling applications.",
              },
              {
                q: "Can E-Waste Shredders process different electronic waste materials?",
                a: "The suitable material depends on the machine configuration and application requirements. Product specifications should be evaluated based on the material being processed.",
              },
              {
                q: "Do you provide installation and support?",
                a: "Yes, Vikah Ecotech provides installation guidance and after-sales support for its industrial shredding equipment.",
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
                    data-bs-target={`#ewasteFaq${index}`}
                    style={{
                      backgroundColor:
                        "#f0fff4",
                    }}
                  >
                    {faq.q}
                  </button>

                </h2>


                <div
                  id={`ewasteFaq${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#ewasteShredderFaq"
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

export default Ewasteshredders;
