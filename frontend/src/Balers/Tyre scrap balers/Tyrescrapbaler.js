import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel"; // ✅ add this
import "bootstrap/dist/css/bootstrap.min.css"; // (already likely in index.js, but safe here too)
import "../../Other Equipments/Tyrecutting.css";
import "../../Pages/Models.css";
import Balerimg from "../../images/baler.png";
import Baler1 from "../../images/baler1.png";
import Baler2 from "../../images/baler2.png";
import TyreBaler1 from "../../images/Applications/tyrebaler1.webp"
import tyrebaler2 from "../../images/Applications/tyrebaler2.webp"
import { Helmet } from "react-helmet";
import styles from "../../Styles/Topheadings.module.css";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchPublicProductsByApplicationName,
} from "../../redux/slices/publicProductSlice";

function Tyrescrapbaler() {



  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);


  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
  } = useSelector((state) => state.publicProduct);

  useEffect(() => {
    dispatch(
      fetchPublicProductsByApplicationName(
        "Tyre Scrap Baler"
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      setSelected(products[0]);
    }
  }, [products]);

  const scrollToModels = () => {
    const section = document.getElementById("modelsSection");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };




  const [selected, setSelected] = useState(null);

  return (
    <div>
      <Helmet>
        {/* ===== BASIC SEO ===== */}
        <title>
          Tyre Scrap Baler Machine Manufacturer in Hyderabad | Vikah Ecotech
        </title>

        <meta
          name="description"
          content="Vikah Ecotech manufactures heavy-duty tyre scrap baler machines for compacting scrap tyres in recycling and waste management industries across India."
        />

        <meta
          name="keywords"
          content="tyre scrap baler, scrap tyre baler machine, tyre recycling baler, industrial baler for tyres"
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Vikah Ecotech Pvt Ltd" />

        <link
          rel="canonical"
          href="https://vikahecotech.com/tyre-scrap-balers"
        />

        {/* ===== OPEN GRAPH ===== */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Tyre Scrap Baler Machine | Vikah Ecotech"
        />
        <meta
          property="og:description"
          content="Heavy-duty tyre scrap balers for efficient scrap tyre recycling and industrial waste management in India."
        />
        <meta
          property="og:url"
          content="https://vikahecotech.com/tyre-scrap-balers"
        />
        <meta
          property="og:image"
          content="https://vikahecotech.com/logo_vk.png"
        />

        {/* ===== TWITTER ===== */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Tyre Scrap Baler Machine | Vikah Ecotech"
        />
        <meta
          name="twitter:description"
          content="Heavy-duty tyre scrap balers for industrial recycling and waste management."
        />
        <meta
          name="twitter:image"
          content="https://vikahecotech.com/logo_vk.png"
        />

        {/* ===== LOCAL BUSINESS SCHEMA ===== */}
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Vikah Ecotech Pvt Ltd",
      "image": "https://vikahecotech.com/logo_vk.png",
      "url": "https://vikahecotech.com",
      "telephone": "+91-4049471616",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "406, 4th Floor, Patel Towers, Above EasyBuy, Beside Nagole RTO Office, Nagole",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500068",
        "addressCountry": "IN"
      },
      "areaServed": "India"
    }
    `}
        </script>

        {/* ===== ORGANIZATION SCHEMA ===== */}
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Vikah Ecotech Pvt Ltd",
      "url": "https://vikahecotech.com",
      "logo": "https://vikahecotech.com/logo_vk.png"
    }
    `}
        </script>

        {/* ===== PRODUCT LIST SCHEMA (CORRECTED) ===== */}
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Tyre Scrap Baler Machines",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Product",
            "name": "BLT150",
            "description": "Tyre Scrap Baler BLT150 with 150 Ton compaction force and 9000 kg weight.",
            "image": "https://vikahecotech.com/images/blt150.png",
            "brand": {
              "@type": "Brand",
              "name": "Vikah Ecotech"
            },
            "url": "https://vikahecotech.com/blt150",
            "offers": {
              "@type": "Offer",
              "url": "https://vikahecotech.com/blt150",
              "priceCurrency": "INR",
              "price": "3000000",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Product",
            "name": "BLT200",
            "description": "Tyre Scrap Baler BLT200 with 200 Ton compaction force and 9000 kg weight.",
            "image": "https://vikahecotech.com/images/blt200.png",
            "brand": {
              "@type": "Brand",
              "name": "Vikah Ecotech"
            },
            "url": "https://vikahecotech.com/blt200",
            "offers": {
              "@type": "Offer",
              "url": "https://vikahecotech.com/blt200",
              "priceCurrency": "INR",
              "price": "4000000",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Product",
            "name": "BLT250",
            "description": "Tyre Scrap Baler BLT250 with 250 Ton compaction force and 11000 kg weight.",
            "image": "https://vikahecotech.com/images/blt250.jpg",
            "brand": {
              "@type": "Brand",
              "name": "Vikah Ecotech"
            },
            "url": "https://vikahecotech.com/blt250",
            "offers": {
              "@type": "Offer",
              "url": "https://vikahecotech.com/blt250",
              "priceCurrency": "INR",
              "price": "5000000",
              "availability": "https://schema.org/InStock"
            }
          }
        }
      ]
    }
    `}
        </script>

        {/* ===== BREADCRUMB SCHEMA ===== */}
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://vikahecotech.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Balers",
          "item": "https://vikahecotech.com/balers"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Tyre Scrap Balers",
          "item": "https://vikahecotech.com/tyre-scrap-balers"
        }
      ]
    }
    `}
        </script>
      </Helmet>

      {/* Header */}
      <div className={styles.heroWrapper}>
        <Carousel controls indicators interval={4000}>
          {/* Slide 1 */}

          <Carousel.Item>
            <img

              className={styles.heroImage}
              src={TyreBaler1}
              alt="Tyre Scrap Baler"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Tyre Scrap Balers</h1>

                <p className={styles.heroSubtitle}>
                  Efficient hydraulic balers designed for compressing tyre scrap
                  into compact bales for easy storage and transport.
                </p>

                <button className={styles.heroButton} onClick={scrollToModels}>
                  View Models
                </button>
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 2 */}

          <Carousel.Item>
            <img
              className={styles.heroImage}
              style={{ objectFit: "contain" }}
              src={Baler1}
              alt="Industrial Tyre Baler"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Industrial Tyre Balers</h1>

                <p className={styles.heroSubtitle}>
                  Heavy-duty baling machines engineered for tyre recycling
                  plants, delivering powerful compression and high efficiency.
                </p>

                <button className={styles.heroButton} onClick={scrollToModels}>
                  View Models
                </button>
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 3 */}

          <Carousel.Item>
            <img
              className={styles.heroImage}
              src={tyrebaler2}
              alt="Hydraulic Tyre Scrap Baler"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Advanced Hydraulic Technology
                </h1>

                <p className={styles.heroSubtitle}>
                  High-performance hydraulic systems designed to compress tyre
                  scrap efficiently for recycling industries worldwide.
                </p>

                <button className={styles.heroButton} onClick={scrollToModels}>
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
                  color: "#1f7a63",
                }}
              >
                Tyre Scrap Baler Machine Manufacturer in India
              </h2>

              <p
                className="lead mb-3"
                style={{
                  fontSize: "1.125rem",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#2d3748",
                }}
              >
                Vikah Ecotech is a leading manufacturer of hydraulic tyre scrap
                baler machines in Hyderabad, delivering high-performance
                compaction solutions for tyre recycling plants and industrial
                waste management industries across India.
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
                Our tyre baler machines are engineered with reinforced steel
                fabrication and high-pressure hydraulic cylinders to ensure
                maximum bale density and operational durability. These machines
                significantly reduce scrap tyre volume, making transportation,
                storage, and downstream processing more cost-efficient.
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#4a5568",
                }}
              >
                Available in multiple tonnage variants including 150 Ton, 200
                Ton, and 250 Ton models, our balers are suitable for passenger
                tyres, truck tyres, and heavy-duty OTR tyres. Vikah Ecotech
                ensures reliable performance, low maintenance, and long service
                life in demanding industrial environments.
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
              style={{ color: "#166534", fontSize: "1.8rem" }}
            >
              Available Tyre Scrap Baler Models
            </h3>

            {/* ================= MODEL BUTTONS (single row, scrollable on small screens) ================= */}
            <div
              className="d-flex flex-nowrap overflow-auto mb-5 justify-content-center"
              style={{ gap: "10px" }}
            >
              {products.map((product) => (
                <button
                  key={product._id}
                  className="flex-shrink-0"
                  style={{
                    background:
                      selected?.modelName === product.modelName
                        ? "linear-gradient(135deg, #22c55e, #16a34a)"
                        : "#ccfbf1",

                    color:
                      selected?.modelName === product.modelName
                        ? "#ffffff"
                        : "#065f46",

                    border: "none",
                    borderRadius: "50px",
                    fontWeight: "600",
                    minWidth: "90px",
                    padding: "6px 14px",
                    fontSize: "0.9rem",

                    boxShadow:
                      selected?.modelName === product.modelName
                        ? "0 4px 12px rgba(34,197,94,0.4)"
                        : "0 2px 6px rgba(0,0,0,0.08)",

                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelected(product)}
                >
                  {product.modelName}
                </button>
              ))}
            </div>

            <div className="row align-items-center">
              {/* ================= CAROUSEL CARD ================= */}
              <div className="col-lg-6 mb-4">
                <div
                  className="rounded-4 shadow-lg overflow-hidden p-3"
                  style={{
                    height: "460px",
                    background: "linear-gradient(145deg, #f0fdfa, #ecfeff)",
                    border: "1px solid #a7f3d0",
                  }}
                >
                  {selected ? (
                    selected.images?.length > 0 ? (
                      <Carousel interval={4000} pause="hover">
                        {selected.images.map((img, i) => (
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
                                alt={`${selected.modelName} ${i + 1}`}
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
                    ) : (
                      <div
                        style={{
                          height: "430px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p className="text-muted mb-0">
                          No images available
                        </p>
                      </div>
                    )
                  ) : (
                    <div
                      style={{
                        height: "430px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p className="text-muted mb-0">
                        Loading product image...
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ================= SPEC CARD ================= */}
              <div className="col-lg-6">
                <div
                  className="shadow-lg rounded-4 p-4"
                  style={{
                    background: "linear-gradient(145deg, #ecfdf5, #e0f2fe)",
                    borderLeft: "6px solid #22c55e",
                  }}
                >
                  {loading ? (
                    <div className="text-center py-5">
                      <p className="mb-0">Loading models...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-5">
                      <p className="text-danger mb-0">{error}</p>
                    </div>
                  ) : selected ? (
                    <>
                      <h4
                        className="fw-bold mb-4 text-center"
                        style={{
                          color: "#065f46",
                          fontSize: "1.6rem",
                        }}
                      >
                        {selected.modelName}
                      </h4>

                      <ul className="list-group list-group-flush mb-4">
                        {selected.sections
                          ?.flatMap((section) =>
                            section.fields
                              ?.filter((field) => field.isPublic)
                              .map((field) => ({
                                name: field.name,
                                value: field.value,
                              }))
                          )
                          .slice(0, 3)
                          .map((spec, index) => (
                            <li
                              key={index}
                              className="list-group-item bg-transparent"
                            >
                              <strong>{spec.name}:</strong>{" "}
                              {spec.value}
                            </li>
                          ))}

                        <li className="list-group-item bg-transparent">
                          <strong>Description:</strong>{" "}
                          {selected.description}
                        </li>
                      </ul>

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
                        View Detailed Specifications
                      </Link>
                    </>
                  ) : (
                    <div className="text-center py-5">
                      <p className="mb-0">No models available.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= APPLICATIONS ================= */}
        <div className="container mb-5">
          <h3 className="fw-bold text-center mb-4" style={{ color: "#2f855a" }}>
            Applications of Tyre Scrap Balers
          </h3>
          <p className="text-center mb-4">
            Our hydraulic tyre baler machines are widely used in various
            industrial and recycling sectors where high-density tyre compaction
            is required.
          </p>

          <div className="row text-center">
            {[
              "Tyre Recycling Plants",
              "Scrap Tyre Collection Centers",
              "Pyrolysis Processing Units",
              "Industrial Waste Management Companies",
              "Municipal Recycling Facilities",
              "Rubber Processing Industries",
            ].map((item, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div
                  className="p-4 rounded-4 shadow-sm h-100 bg-white"
                  style={{ border: "1px solid #c6f6d5" }}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= WHY CHOOSE US ================= */}
        <div className="container mb-5">
          <h3 className="fw-bold text-center mb-4" style={{ color: "#2f855a" }}>
            Why Choose Vikah Ecotech Tyre Balers?
          </h3>

          <p>
            Vikah Ecotech stands out as a reliable tyre baler machine
            manufacturer in India due to our commitment to quality engineering
            and industrial performance. Our machines are designed for continuous
            operation, low maintenance, and maximum bale density.
          </p>

          <ul>
            <li>Heavy-duty hydraulic cylinders for powerful compaction</li>
            <li>Energy-efficient and low power consumption design</li>
            <li>Available in 150 Ton, 200 Ton & 250 Ton models</li>
            <li>Customizable bale dimensions</li>
            <li>Strong nationwide installation and after-sales support</li>
          </ul>
        </div>

        {/* ================= TECHNICAL FEATURES ================= */}
        <div className="container mb-5">
          <h3 className="fw-bold text-center mb-4" style={{ color: "#2f855a" }}>
            Technical Features
          </h3>

          <p>
            Our tyre scrap baler machines are engineered with precision
            hydraulic systems that ensure uniform pressure distribution and
            high-density bale formation. The reinforced steel frame construction
            provides structural stability during heavy compaction cycles. These
            balers are suitable for compressing passenger car tyres, truck
            tyres, and large OTR tyres when integrated with proper feeding
            systems.
          </p>
        </div>

        {/* ================= FAQ ================= */}
        <div className="container mb-5">
          <h3 className="fw-bold text-center mb-4" style={{ color: "#2f855a" }}>
            Frequently Asked Questions
          </h3>

          <div className="accordion" id="balerFaq">
            {[
              {
                q: "What is the price of a tyre scrap baler machine in India?",
                a: "The price depends on compaction force, automation level, and customization requirements. Contact us for a detailed quotation.",
              },
              {
                q: "What compaction force is suitable for truck tyres?",
                a: "For truck tyres, 200 Ton to 250 Ton hydraulic balers are recommended.",
              },
              {
                q: "Can the baler handle OTR tyres?",
                a: "Yes, heavy-duty models can handle large OTR tyres with proper pre-cutting systems.",
              },
              {
                q: "Do you provide installation and after-sales service?",
                a: "Yes, we provide complete installation guidance and long-term service support across India.",
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
                    style={{ backgroundColor: "#f0fff4" }}
                  >
                    {faq.q}
                  </button>
                </h2>
                <div
                  id={`faq${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#balerFaq"
                >
                  <div className="accordion-body">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tyrescrapbaler;
