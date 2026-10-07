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
// MANUAL METAL SHREDDER APPLICATION IMAGES
// =========================================================

import shredm1 from "../../images/Applications/shredm1.jpg";
import shredm2 from "../../images/Applications/shredm2.jpg";
import shredm3 from "../../images/Applications/shredm3.jpg";


function Metalshredders() {
  const dispatch = useDispatch();

  // =========================================================
  // MANUAL HERO IMAGES
  // =========================================================

  const heroImages = [
    shredm1,
    shredm2,
    shredm3,
  ];

  // =========================================================
  // FETCH METAL SHREDDER PRODUCTS
  // =========================================================

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(
      fetchPublicProductsByApplicationName(
        "Metal Shredders"
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
  // SELECTED MODEL NAME
  // =========================================================

  const modelName =
    selected?.modelName ||
    selected?.name ||
    selected?.title ||
    "Metal Shredder";

  // =========================================================
  // SELECTED MODEL IMAGES
  // =========================================================

  const modelImages =
    selected?.images &&
    selected.images.length > 0
      ? selected.images
      : [];

  // =========================================================
  // PUBLIC SPECIFICATIONS
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
  // SEO PRODUCT DATA
  // =========================================================

  const seoProducts = products.map((product) => {
    const productName =
      product.modelName ||
      product.name ||
      product.title ||
      "Metal Shredder";

    const productImage =
      product.images &&
      product.images.length > 0
        ? product.images[0]
        : "";

    return {
      name: productName,

      description:
        "Industrial metal shredder machines designed for efficient size reduction and processing of metal scrap and recyclable materials.",

      image: productImage,

      url: product.slug
        ? `https://vikahecotech.com/${product.slug}`
        : "https://vikahecotech.com/metalshredder",

      price: product.price || "",
    };
  });

  return (
    <div>

      {/* =========================================================
          SEO
      ========================================================= */}

      <SEOHelmet
        title="Metal Shredder Machines Manufacturer in India | Vikah Ecotech"

        description="Vikah Ecotech manufactures industrial metal shredder machines for efficient size reduction and processing of metal scrap and recyclable materials."

        keywords="metal shredder machine, metal scrap shredder, industrial metal shredder, metal recycling shredder, metal scrap recycling machine"

        canonical="https://vikahecotech.com/metalshredder"

        pageName="Metal Shredder Machines"

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
            name: "Metal Shredders",
            url: "https://vikahecotech.com/metalshredder",
          },
        ]}
      />

      {/* =========================================================
          HERO CAROUSEL
      ========================================================= */}

      <div className={styles.heroWrapper}>

        <Carousel controls indicators interval={4000}>

          {/* =====================================================
              SLIDE 1
          ===================================================== */}

          <Carousel.Item>

            <img
              className={styles.heroImage}
              src={heroImages[0]}
              alt="Metal Shredder Machine"
            />

            <div className={styles.heroOverlay}>

              <div className={styles.heroContent}>

                <h1 className={styles.heroTitle}>
                  Metal Shredders
                </h1>

                <p className={styles.heroSubtitle}>
                  Industrial shredders designed for efficient
                  size reduction of metal scrap and recyclable
                  materials.
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


          {/* =====================================================
              SLIDE 2
          ===================================================== */}

          <Carousel.Item>

            <img
              className={styles.heroImage}
              src={heroImages[1]}
              alt="Industrial Metal Shredder"
            />

            <div className={styles.heroOverlay}>

              <div className={styles.heroContent}>

                <h1 className={styles.heroTitle}>
                  Industrial Metal Shredding
                </h1>

                <p className={styles.heroSubtitle}>
                  Heavy-duty shredders engineered for
                  recycling facilities handling metal scrap
                  and industrial metal waste.
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


          {/* =====================================================
              SLIDE 3
          ===================================================== */}

          <Carousel.Item>

            <img
              className={styles.heroImage}
              src={heroImages[2]}
              alt="High Performance Metal Shredder"
            />

            <div className={styles.heroOverlay}>

              <div className={styles.heroContent}>

                <h1 className={styles.heroTitle}>
                  High Performance Metal Shredders
                </h1>

                <p className={styles.heroSubtitle}>
                  Advanced shredding technology delivering
                  reliable performance for metal recycling
                  and scrap processing operations.
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


      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="container-fluid px-4 px-md-5 my-5">

        {/* =======================================================
            INTRO SECTION
        ======================================================= */}

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
                Metal Shredder Manufacturer in India
              </h2>

              <p
                className="lead mb-3"
                style={{
                  fontSize: "1.125rem",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#2d3748",
                }}
              >
                Vikah Ecotech manufactures industrial metal
                shredders designed to efficiently process
                metal scrap and recyclable metal materials
                generated from recycling and waste processing
                operations.
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#4a5568",
                }}
              >
                Our metal shredding solutions help reduce the
                size of discarded and recyclable metal materials
                and prepare them for further sorting, separation,
                recovery, and recycling processes.
              </p>

            </div>

          </div>

        </div>


        {/* =======================================================
            FULL WIDTH MODEL SECTION
        ======================================================= */}

        <div
          id="modelsSection"
          className="py-5 px-3 px-md-5 mb-5"
          style={{
            background:
              "linear-gradient(135deg, #f0fdfa, #e6fffa)",

            borderTop:
              "5px solid #22c55e",

            borderBottom:
              "5px solid #22c55e",
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
              Available Metal Shredder Models
            </h3>


            {/* ===================================================
                LOADING
            =================================================== */}

            {loading && (
              <div className="text-center mb-4">

                <p
                  className="mb-0"
                  style={{
                    color: "#166534",
                    fontWeight: "500",
                  }}
                >
                  Loading Metal Shredder models...
                </p>

              </div>
            )}


            {/* ===================================================
                ERROR
            =================================================== */}

            {error && !loading && (
              <div className="text-center mb-4">

                <p
                  className="mb-0"
                  style={{
                    color: "#dc2626",
                    fontWeight: "500",
                  }}
                >
                  Unable to load Metal Shredder models
                  right now.
                </p>

              </div>
            )}


            {/* ===================================================
                NO PRODUCTS
            =================================================== */}

            {!loading &&
              !error &&
              products.length === 0 && (

                <div className="text-center mb-4">

                  <p
                    className="mb-0"
                    style={{
                      color: "#166534",
                      fontWeight: "500",
                    }}
                  >
                    No Metal Shredder models are currently
                    available.
                  </p>

                </div>
              )}


            {/* ===================================================
                MODEL BUTTONS
            =================================================== */}

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


            {/* ===================================================
                CAROUSEL + SPECIFICATION CARD
            =================================================== */}

            {selected && products.length > 0 && (

              <div className="row align-items-center">

                {/* =================================================
                    MODEL IMAGE CAROUSEL
                ================================================= */}

                <div className="col-lg-6 mb-4">

                  <div
                    className="rounded-4 shadow-lg overflow-hidden p-3"
                    style={{
                      height: "460px",

                      background:
                        "linear-gradient(145deg, #ecfeff, #f0fdfa)",

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

                                  alt={`${modelName} Metal Shredder ${
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

                          )
                        )}

                      </Carousel>

                    ) : (

                      <div
                        style={{
                          height: "430px",

                          display: "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "center",

                          color: "#718096",
                        }}
                      >
                        No product images available
                      </div>

                    )}

                  </div>

                </div>


                {/* =================================================
                    SPECIFICATION CARD
                ================================================= */}

                <div className="col-lg-6">

                  <div
                    className="shadow-lg rounded-4 p-4"
                    style={{
                      background:
                        "linear-gradient(145deg, #e0f2fe, #ecfdf5)",

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


                    <ul className="list-group list-group-flush mb-4">

                      {publicSpecifications.length > 0 ? (

                        publicSpecifications.map(
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
                        )

                      ) : (

                        <li className="list-group-item bg-transparent text-muted">
                          No public specifications available
                          for this model.
                        </li>

                      )}

                    </ul>


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


        {/* =========================================================
            APPLICATIONS
        ========================================================= */}

        <div className="container mb-5">

          <h3
            className="fw-bold text-center mb-4"
            style={{
              color: "#2f855a",
            }}
          >
            Applications of Metal Shredders
          </h3>

          <p className="text-center mb-4">
            Used in recycling facilities, scrap processing
            plants, automobile recycling operations, and
            industrial waste processing facilities for
            reducing the size of metal scrap and recyclable
            materials.
          </p>


          <div className="row text-center">

            {[
              "Metal Scrap Recycling",

              "Automobile Scrap Processing",

              "Industrial Metal Waste Processing",

              "Metal Material Recovery",

              "Recycling Plant Operations",

              "Scrap Yard Operations",
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


        {/* =========================================================
            WHY CHOOSE US
        ========================================================= */}

        <div className="container mb-5">

          <h3
            className="fw-bold text-center mb-4"
            style={{
              color: "#2f855a",
            }}
          >
            Why Choose Vikah Ecotech Metal Shredders?
          </h3>


          <p>
            Vikah Ecotech metal shredders are designed for
            reliable and efficient size reduction of metal
            scrap and recyclable materials in demanding
            recycling and industrial processing environments.
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
              Efficient size reduction of metal scrap
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


        {/* =========================================================
            TECHNICAL FEATURES
        ========================================================= */}

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
            drive systems, durable construction, safety
            features, and reliable operating mechanisms help
            provide consistent shredding performance with
            reduced downtime. The machines are designed for
            demanding metal recycling and scrap processing
            environments.
          </p>

        </div>


        {/* =========================================================
            FAQ
        ========================================================= */}

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
            id="metalShredderFaq"
          >

            {[
              {
                q: "What is a Metal Shredder?",

                a: "A Metal Shredder is an industrial machine used to reduce the size of metal scrap and recyclable metal materials for further sorting, separation, recovery, and recycling processes.",
              },

              {
                q: "Where are Metal Shredders used?",

                a: "They are used in metal recycling facilities, scrap processing operations, material recovery plants, automobile scrap processing, and other industrial recycling applications.",
              },

              {
                q: "Can Metal Shredders process different metal materials?",

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

                    data-bs-target={`#metalFaq${index}`}

                    style={{
                      backgroundColor:
                        "#f0fff4",
                    }}
                  >
                    {faq.q}
                  </button>

                </h2>


                <div
                  id={`metalFaq${index}`}

                  className="accordion-collapse collapse"

                  data-bs-parent="#metalShredderFaq"
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


export default Metalshredders;