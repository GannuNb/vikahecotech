import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";

import { useDispatch, useSelector } from "react-redux";

import "../../Other Equipments/Tyrecutting.css";

import "../../Pages/Models.css";

import shredderhd from "../../images/Applications/shredp1.png";

import shredderhd1 from "../../images/Applications/shredp4.webp";

import shredderhdimg from "../../images/Applications/shredp2.jpeg";

import SEOHelmet from "../../components/SEO/SEOHelmet";

import styles from "../../Styles/Topheadings.module.css";

import {
  fetchPublicProductsByApplicationName,
} from "../../redux/slices/publicProductSlice";

function Plasticshredder() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(
      fetchPublicProductsByApplicationName("Plastic Shredders")
    );
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      setSelected(products[0]);
    }
  }, [products]);

  const fallbackCarouselImages = [
    shredderhd,
    shredderhd1,
    shredderhdimg,
  ];

  const carouselImages =
    selected?.images?.length > 0
      ? selected.images
          .map((image) => {
            if (typeof image === "string") {
              return image;
            }

            if (image?.url) {
              return image.url;
            }

            if (image?.imageUrl) {
              return image.imageUrl;
            }

            if (image?.src) {
              return image.src;
            }

            return null;
          })
          .filter(Boolean)
      : fallbackCarouselImages;

  const publicSpecifications =
    selected?.sections?.flatMap((section) =>
      (section.fields || [])
        .filter((field) => field.isPublic)
        .map((field) => ({
          label: field.name,
          value: field.value,
        }))
    ) || [];

  const modelName =
    selected?.modelName ||
    selected?.name ||
    selected?.title ||
    "Plastic Shredder";

  const seoProducts = products.map((product) => {
    const productName =
      product.modelName ||
      product.name ||
      product.title ||
      "Plastic Shredder";

    const productSlug =
      product.slug ||
      productName.toLowerCase().replace(/\s+/g, "-");

    let productImage = "";

    if (product.images?.length > 0) {
      const firstImage = product.images[0];

      if (typeof firstImage === "string") {
        productImage = firstImage;
      } else {
        productImage =
          firstImage?.url ||
          firstImage?.imageUrl ||
          firstImage?.src ||
          "";
      }
    }

    return {
      name: productName,
      description:
        product.description ||
        `Plastic Shredder ${productName} designed for efficient plastic recycling and industrial plastic waste processing.`,
      image: productImage,
      url: `https://vikahecotech.com/${productSlug}`,
      price: product.price || "",
    };
  });

  if (loading && products.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-success"
            role="status"
          ></div>

          <p className="mt-3 fw-semibold">
            Loading Plastic Shredders...
          </p>
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div
        className="container text-center py-5"
        style={{ minHeight: "60vh" }}
      >
        <h3 className="fw-bold text-danger mb-3">
          Unable to load Plastic Shredders
        </h3>

        <p className="text-muted">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      <SEOHelmet
        title="Plastic Shredder Machines Manufacturer in India | Vikah Ecotech"
        description="Primary plastic shredders designed for recycling PET, HDPE, LDPE and industrial plastic waste."
        keywords="plastic shredder machine, plastic recycling shredder, PET shredder"
        canonical="https://vikahecotech.com/plasticshredder"
        pageName="Plastic Shredder Machines"
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
            name: "Plastic Shredders",
            url: "https://vikahecotech.com/plasticshredder",
          },
        ]}
      />

      {/* ================= HEADER ================= */}

      {/* HERO CAROUSEL */}

      <div className={styles.heroWrapper}>
        <Carousel controls indicators interval={4000}>

          {/* Slide 1 */}

          <Carousel.Item>
            <img
              className={styles.heroImage}
              src={shredderhd}
              alt="Plastic Shredder Machine"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Plastic Shredder Machines
                </h1>

                <p className={styles.heroSubtitle}>
                  Industrial plastic shredders engineered for efficient size
                  reduction of PET bottles, HDPE containers, and various plastic
                  waste materials.
                </p>

                <button
                  className={styles.heroButton}
                  onClick={() =>
                    document
                      .getElementById("modelsSection")
                      ?.scrollIntoView({ behavior: "smooth" })
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
              src={shredderhd1}
              alt="Industrial Plastic Shredder"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Industrial Plastic Shredding
                </h1>

                <p className={styles.heroSubtitle}>
                  High torque dual shaft shredders designed for processing
                  plastic scrap, packaging materials, and industrial plastic
                  waste.
                </p>

                <button
                  className={styles.heroButton}
                  onClick={() =>
                    document
                      .getElementById("modelsSection")
                      ?.scrollIntoView({ behavior: "smooth" })
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
              src={shredderhdimg}
              alt="Hydraulic Plastic Shredder"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  High Performance Shredders
                </h1>

                <p className={styles.heroSubtitle}>
                  Heavy-duty plastic shredders equipped with powerful hydraulic
                  systems for reliable continuous recycling operations.
                </p>

                <button
                  className={styles.heroButton}
                  onClick={() =>
                    document
                      .getElementById("modelsSection")
                      ?.scrollIntoView({ behavior: "smooth" })
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
                Plastic Shredders Manufacturer in India
              </h2>

              <p
                className="lead mb-3"
                style={{
                  fontSize: "1.125rem",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#2d3748",
                }}
              >
                Vikah Ecotech manufactures industrial plastic shredders (SHP100,
                SHP150, SHP200) designed for efficient size reduction of PET
                bottles, HDPE containers, LDPE films, packaging plastics, and
                other industrial plastic scrap.
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#4a5568",
                }}
              >
                Our shredders feature high-torque hydraulic systems, dual shaft
                cutting mechanisms, and heavy-duty blades to ensure consistent
                shredding performance, low maintenance, and long service life in
                demanding recycling operations.
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
              Available Plastic Shredder Models
            </h3>

            {/* ================= MODEL BUTTONS ================= */}

            {products.length > 0 ? (
              <div className="d-flex justify-content-center flex-wrap mb-5">

                {products.map((machine, index) => {
                  const machineName =
                    machine.modelName ||
                    machine.name ||
                    machine.title ||
                    `Model ${index + 1}`;

                  const isSelected =
                    selected?.modelName === machine?.modelName ||
                    selected?.name === machine?.name ||
                    selected?.slug === machine?.slug;

                  return (
                    <button
                      key={
                        machine._id ||
                        machine.id ||
                        machine.slug ||
                        index
                      }
                      className="mx-2 my-2 px-4 py-2"
                      style={{
                        background: isSelected
                          ? "linear-gradient(135deg, #22c55e, #16a34a)"
                          : "#ccfbf1",

                        color: isSelected
                          ? "#ffffff"
                          : "#065f46",

                        border: "none",
                        borderRadius: "50px",
                        fontWeight: "600",
                        minWidth: "120px",

                        boxShadow: isSelected
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
            ) : (
              <div className="text-center mb-5">
                <p className="text-muted">
                  No Plastic Shredder models are currently available.
                </p>
              </div>
            )}

            {/* ================= CAROUSEL + SPEC CARD ================= */}

            {selected && (
              <div className="row align-items-center">

                {/* ================= CAROUSEL CARD ================= */}

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
                              alt={`${modelName} plastic shredder ${
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
                      {modelName} Plastic Shredder
                    </h4>

                    {publicSpecifications.length > 0 && (
                      <div className="mb-4">

                        <h5
                          className="fw-bold mb-3"
                          style={{
                            color: "#065f46",
                          }}
                        >
                          Specifications
                        </h5>

                        <ul className="list-group list-group-flush">

                          {publicSpecifications.map(
                            (spec, index) => (
                              <li
                                key={index}
                                className="list-group-item bg-transparent d-flex justify-content-between gap-3"
                              >
                                <strong>
                                  {spec.label}
                                </strong>

                                <span className="text-end">
                                  {spec.value}
                                </span>
                              </li>
                            )
                          )}

                        </ul>
                      </div>
                    )}

                    <Link
                      to={
                        selected.slug
                          ? `/${selected.slug}`
                          : `/${modelName
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`
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

        {/* ================= APPLICATIONS ================= */}

        <div className="container mb-5">

          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Applications of Plastic Shredders
          </h3>

          <p className="text-center mb-4">
            Used in plastic recycling plants, packaging material recycling, and
            industrial plastic scrap processing for size reduction and uniform
            shredded output.
          </p>

          <div className="row text-center">

            {[
              "PET Bottle Recycling",
              "HDPE & LDPE Scrap Processing",
              "Packaging Material Size Reduction",
              "Industrial Plastic Recycling Plants",
              "Commercial Plastic Scrap Processing",
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
            Why Choose Vikah Ecotech Plastic Shredders?
          </h3>

          <p>
            Vikah Ecotech plastic shredders are engineered for high torque,
            continuous operation, low maintenance, and precision shredding of
            various plastic waste types.
          </p>

          <ul>
            <li>
              High-torque hydraulic system for consistent shredding
            </li>

            <li>
              Dual shaft cutting mechanism for efficiency (SHP150)
            </li>

            <li>
              Heavy-duty construction for long service life (SHP200)
            </li>

            <li>
              Precise size reduction for downstream recycling
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
            Industrial-grade cutting chambers, robust hydraulic systems,
            energy-efficient drives, safety interlocks, and durable blades
            ensure smooth operation, continuous throughput, and minimal
            downtime. Suitable for PET, HDPE, LDPE, and other plastic scrap
            materials.
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
            id="plasticShredderFaq"
          >

            {[
              {
                q: "What is the power range for each plastic shredder model?",
                a: "SHP100: 100–140 HP, SHP150: 140–200 HP, SHP200: 200–260 HP.",
              },
              {
                q: "Which model is suitable for small-scale plastic recycling?",
                a: "SHP100 is ideal for low to medium volume plastic shredding operations.",
              },
              {
                q: "Do these shredders use hydraulic systems?",
                a: "Yes, all models feature high-torque or dual shaft hydraulic cutting systems.",
              },
              {
                q: "Do you provide installation and after-sales support?",
                a: "Yes, nationwide installation guidance and service support are available.",
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
                  data-bs-parent="#plasticShredderFaq"
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

export default Plasticshredder;