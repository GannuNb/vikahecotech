import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";

import "../../Other Equipments/Tyrecutting.css";
import "../../Pages/Models.css";

import shredderhdimg from "../../images/Shedder _ Final PNG.png";
import shredderhd from "../../images/shredder_hd.jpg";
import shredderhd1 from "../../images/shredder_hd1.jpg";

import SEOHelmet from "../../components/SEO/SEOHelmet";
import styles from "../../Styles/Topheadings.module.css";

import {
  fetchPublicProductsByApplicationName,
} from "../../redux/slices/publicProductSlice";

function Tyreshredder() {
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
      fetchPublicProductsByApplicationName("Primary Tyre Shredders")
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
    shredderhdimg,
    shredderhd,
    shredderhd1,
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
    "Primary Tyre Shredder";

  const seoProducts = products.map((product) => {
    const productName =
      product.modelName ||
      product.name ||
      product.title ||
      "Primary Tyre Shredder";

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
        `Primary tyre shredder ${productName} designed for efficient tyre recycling and industrial shredding applications.`,
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
            Loading Primary Tyre Shredders...
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
          Unable to load Primary Tyre Shredders
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
        title="Tyre Shredder Machine for Recycling | Vikah Ecotech"
        description="Vikah Ecotech manufactures heavy-duty tyre shredder machines designed for primary shredding of waste tyres in recycling plants."
        keywords="tyre shredder machine, tyre shredding machine, tyre recycling shredder"
        canonical="https://vikahecotech.com/tyreshredder"
        pageName="Primary Tyre Shredder Machines"
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
            name: "Tyre Shredders",
            url: "https://vikahecotech.com/tyreshredder",
          },
        ]}
      />

      <div className={styles.heroWrapper}>
        <Carousel controls indicators interval={4000}>
          <Carousel.Item>
            <img
              className={styles.heroImage}
              style={{ objectFit: "contain" }}
              src={shredderhdimg}
              alt="Primary Tyre Shredder Machine"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Primary Tyre Shredders
                </h1>

                <p className={styles.heroSubtitle}>
                  Heavy-duty tyre shredders engineered for primary
                  shredding of whole tyres in recycling plants,
                  delivering consistent and efficient material
                  processing.
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

          <Carousel.Item>
            <img
              className={styles.heroImage}
              style={{ objectFit: "contain" }}
              src={shredderhd1}
              alt="Industrial Tyre Shredder"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Industrial Tyre Shredding
                </h1>

                <p className={styles.heroSubtitle}>
                  Powerful shredding systems designed for tyre
                  recycling plants to process large volumes of
                  scrap tyres with high efficiency and durability.
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

          <Carousel.Item>
            <img
              className={styles.heroImage}
              style={{ objectFit: "contain" }}
              src={shredderhd}
              alt="Hydraulic Tyre Shredder"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  High Performance Shredders
                </h1>

                <p className={styles.heroSubtitle}>
                  Advanced tyre shredders equipped with powerful
                  hydraulic systems and high horsepower drives for
                  reliable continuous operation.
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
                Tyre Shredders Manufacturer in India
              </h2>

              <p
                className="lead mb-3"
                style={{
                  fontSize: "1.125rem",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#2d3748",
                }}
              >
                Vikah Ecotech designs and manufactures
                high-performance primary tyre shredders for
                efficient shredding of whole tyres in recycling
                plants. These industrial machines are engineered
                for continuous operation, delivering uniform
                shredded material for downstream recycling
                processes.
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#4a5568",
                }}
              >
                Built with heavy-duty frames, high horsepower
                drives, and robust hydraulic systems, our
                shredders provide reliable performance, low
                maintenance, and high operational efficiency.
              </p>

            </div>
          </div>
        </div>

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
              Available Primary Tyre Shredder Models
            </h3>

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
                  No Primary Tyre Shredder models are currently
                  available.
                </p>
              </div>
            )}

            {selected && (
              <div className="row align-items-center">

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
                              alt={`${modelName} primary tyre shredder ${
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
                      {modelName} Primary Tyre Shredder
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
                      Read more about {modelName} Shredder
                    </Link>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Applications of Primary Tyre Shredders
          </h3>

          <p className="text-center mb-4">
            Used in tyre recycling plants, scrap yards, and
            commercial recycling facilities for shredding whole
            tyres into manageable and uniform pieces.
          </p>

          <div className="row text-center">
            {[
              "Tyre Recycling Plants",
              "Automobile Scrap Yards",
              "Industrial Recycling Facilities",
              "Commercial Recycling Units",
              "Downstream Recycling Material Preparation",
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

        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Why Choose Vikah Ecotech Shredders?
          </h3>

          <p>
            Vikah Ecotech primary tyre shredders are trusted for
            robust design, continuous industrial operation, high
            throughput, and long-lasting hydraulic systems.
          </p>

          <ul>
            <li>
              Heavy-duty two-shaft hydraulic system for high
              compaction
            </li>

            <li>
              Energy-efficient operation with low maintenance
            </li>

            <li>
              Advanced primary tyre shredding models for
              industrial applications
            </li>

            <li>
              Uniform shredding for downstream recycling
              processes
            </li>

            <li>
              Nationwide installation and after-sales support
            </li>
          </ul>
        </div>

        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Technical Features
          </h3>

          <p>
            Industrial-grade frames, high horsepower drives,
            heavy-duty blades, and safety interlocks ensure
            continuous operation, uniform shred size, and
            efficient tyre processing. Suitable for car, truck,
            and bus tyres.
          </p>
        </div>

        <div className="container mb-5">
          <h3
            className="fw-bold text-center mb-4"
            style={{ color: "#2f855a" }}
          >
            Frequently Asked Questions
          </h3>

          <div
            className="accordion"
            id="shredderFaq"
          >
            {[
              {
                q: "What is the power range for each shredder model?",
                a: "The power range depends on the selected Primary Tyre Shredder model. Please check the specifications displayed for each model.",
              },
              {
                q: "Which shredder is suitable for tyre recycling plants?",
                a: "Primary Tyre Shredders are designed for processing whole waste tyres in tyre recycling plants and other industrial recycling facilities.",
              },
              {
                q: "Do these shredders have hydraulic systems?",
                a: "The hydraulic and drive-system details depend on the selected model and are displayed in the model specifications.",
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
                  data-bs-parent="#shredderFaq"
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

export default Tyreshredder;