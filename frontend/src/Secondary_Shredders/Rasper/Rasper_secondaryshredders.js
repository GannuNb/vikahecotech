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
// MANUAL SECONDARY TYRE SHREDDER / RASPER IMAGES
// =========================================================

import shredderhd from "../../images/R1.png";
import shredderhd1 from "../../images/R2.png";
import shredderhdimg from "../../images/R4.jpg";


function RasperSecondaryshredders() {
  const dispatch = useDispatch();

  // =========================================================
  // MANUAL HERO IMAGES
  // =========================================================

  const heroImages = [
    shredderhd,
    shredderhd1,
    shredderhdimg,
  ];

  // =========================================================
  // FETCH PRODUCTS FROM BACKEND
  // =========================================================

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(
      fetchPublicProductsByApplicationName(
        "Secondary Tyre Shredders"
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

  const loading =
    publicProductState.loading || false;

  const error =
    publicProductState.error || null;

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
    "Secondary Tyre Shredder";

  // =========================================================
  // MODEL IMAGES
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
      "Secondary Tyre Shredder";

    const productImage =
      product.images &&
      product.images.length > 0
        ? product.images[0]
        : "";

    return {
      name: productName,

      description:
        "Secondary tyre shredder and rasper machines designed for fine shredding of pre-processed tyres in tyre recycling plants.",

      image: productImage,

      url: product.slug
        ? `https://vikahecotech.com/${product.slug}`
        : "https://vikahecotech.com/rasper_secondaryshredders",

      price: product.price || "",
    };
  });

  return (
    <div>

      {/* =========================================================
          SEO
      ========================================================= */}

      <SEOHelmet
        title="Secondary Tyre Shredders & Rasper Machines | Vikah Ecotech"

        description="Vikah Ecotech manufactures secondary tyre shredders and rasper machines designed for fine shredding of pre-processed tyres in tyre recycling plants."

        keywords="secondary shredder, rasper machine, tyre recycling rasper, secondary tyre shredder, rasper shredder machine"

        canonical="https://vikahecotech.com/rasper_secondaryshredders"

        pageName="Secondary Tyre Shredders"

        products={seoProducts}

        breadcrumb={[
          {
            name: "Home",
            url: "https://vikahecotech.com",
          },

          {
            name: "Secondary Shredders",
            url: "https://vikahecotech.com/secondary-shredder",
          },

          {
            name: "Secondary Tyre Shredders",
            url: "https://vikahecotech.com/rasper_secondaryshredders",
          },
        ]}
      />


      {/* =========================================================
          HERO CAROUSEL
      ========================================================= */}

      <div className={styles.heroWrapper}>

        <Carousel
          controls
          indicators
          interval={4000}
        >

          {/* =====================================================
              SLIDE 1
          ===================================================== */}

          <Carousel.Item>

            <img
              style={{
                objectFit: "contain",
              }}

              className={styles.heroImage}

              src={heroImages[0]}

              alt="Secondary Tyre Shredder"
            />

            <div className={styles.heroOverlay}>

              <div className={styles.heroContent}>

                <h1 className={styles.heroTitle}>
                  Secondary Tyre Shredders
                </h1>

                <p className={styles.heroSubtitle}>
                  Advanced rasper shredders designed for
                  secondary processing of tyre scrap after
                  primary shredding, delivering consistent
                  particle size reduction.
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

              alt="Rasper Machine"
            />

            <div className={styles.heroOverlay}>

              <div className={styles.heroContent}>

                <h1 className={styles.heroTitle}>
                  Rasper Shredder Machines
                </h1>

                <p className={styles.heroSubtitle}>
                  Heavy-duty rasper machines engineered for
                  fine shredding of pre-processed tyres in
                  recycling plants, ensuring high efficiency
                  and durability.
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

              style={{
                objectFit: "contain",
              }}

              src={heroImages[2]}

              alt="Tyre Recycling Secondary Shredder"
            />

            <div className={styles.heroOverlay}>

              <div className={styles.heroContent}>

                <h1 className={styles.heroTitle}>
                  Tyre Recycling Solutions
                </h1>

                <p className={styles.heroSubtitle}>
                  Reliable secondary shredders for tyre
                  recycling plants, preparing rubber material
                  for granulation, steel separation, and
                  downstream recovery processes.
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
          INTRO CONTENT
      ========================================================= */}

      <div className="container text-center my-4 balerbackimg">

        <p>
          Our secondary shredder machines, also known as
          rasper shredders, are engineered for efficient fine
          shredding of tyres in tyre recycling plants. These
          machines process material after primary shredding
          and prepare rubber for downstream granulation,
          separation, and recovery processes.
        </p>

        <p>
          These rasper machines form a critical part of our
          <a href="/secondary-shredder">
            {" "}secondary shredder systems
          </a>
          , helping recycling plants achieve consistent
          particle sizing, higher recovery efficiency, and
          stable long-term operation.
        </p>


        {/* =======================================================
            MODEL SELECTION
        ======================================================= */}

        <div
          id="modelsSection"
          className="btn-group flex-wrap mb-4"
          role="group"
        >

          {products.length > 0 &&
            products.map((machine, index) => {

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

                  className={`btn btn-outline-success mx-1 my-1 ${
                    selectedName === machineName
                      ? "active"
                      : ""
                  }`}

                  onClick={() =>
                    setSelected(machine)
                  }
                >
                  {machineName}
                </button>
              );
            })}

        </div>


        {/* =======================================================
            LOADING
        ======================================================= */}

        {loading && (
          <div className="mb-4">

            <p className="text-muted">
              Loading Secondary Tyre Shredder models...
            </p>

          </div>
        )}


        {/* =======================================================
            ERROR
        ======================================================= */}

        {error && !loading && (
          <div className="mb-4">

            <p className="text-danger">
              Unable to load Secondary Tyre Shredder models
              right now.
            </p>

          </div>
        )}


        {/* =======================================================
            NO PRODUCTS
        ======================================================= */}

        {!loading &&
          !error &&
          products.length === 0 && (

            <div className="mb-4">

              <p className="text-muted">
                No Secondary Tyre Shredder models are
                currently available.
              </p>

            </div>
          )}


        {/* =======================================================
            MAIN CONTENT
        ======================================================= */}

        {selected && products.length > 0 && (

          <div className="row justify-content-center align-items-center">

            {/* =====================================================
                IMAGE CAROUSEL
            ===================================================== */}

            <div className="col-md-6 mb-4">

              <div className="custom-carousel">

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
                              height: "400px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >

                            <img
                              src={img}

                              className="carousel-img baler-carousel-img"

                              alt={`${modelName} secondary shredder machine by Vikah Ecotech`}

                              style={{
                                maxHeight: "100%",
                                maxWidth: "100%",
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
                      minHeight: "400px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >

                    <p className="text-muted">
                      No product images available
                    </p>

                  </div>

                )}

              </div>

            </div>


            {/* =====================================================
                MACHINE DETAILS
            ===================================================== */}

            <div className="col-md-6 mb-4 makecenter">

              <h3 className="machine-title">
                {modelName}
              </h3>


              {publicSpecifications.length > 0 ? (

                <ul className="list-unstyled">

                  {publicSpecifications.map(
                    (specification, index) => (

                      <li key={index}>

                        <strong>
                          {specification.label}:
                        </strong>{" "}

                        {specification.value}

                      </li>

                    )
                  )}

                </ul>

              ) : (

                <p className="text-muted">
                  No public specifications available for
                  this model.
                </p>

              )}


              <Link
                to={
                  selected.slug
                    ? `/${selected.slug}`
                    : "#"
                }

                className="btn btn-outline-success mt-3"
              >
                Read More
              </Link>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}


export default RasperSecondaryshredders;