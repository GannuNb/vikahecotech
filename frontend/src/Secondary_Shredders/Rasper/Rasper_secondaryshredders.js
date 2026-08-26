import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../../Other Equipments/Tyrecutting.css";
import "../../Pages/Models.css";

import shredderhd from "../../images/R1.png";
import shredderhd1 from "../../images/R2.png";
import shredderhdimg from "../../images/R4.jpg";
import Carousel from "react-bootstrap/Carousel";
import styles from "../../Styles/Topheadings.module.css";

function RasperSecondaryshredders() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

const shredders = [
  {
    name: "RST2000",
    type: "Secondary Shredder (Rasper)",
    power: "75 - 100 HP (55 kw -73 kw)",
    Voltage: "As per Customer's Requirement",
    Drive: "ABB / Inovance / Equivalent",
  },

  {
    name: "RST3000",
    type: "Secondary Shredder (Rasper)",
    power: "150 Hp - 180 Hp (112 kw -134 kw)",
    Voltage: "As per Customer's Requirement",
    Drive: "ABB / Inovance / Equivalent",
  },

  {
    name: "RST4000",
    type: "Secondary Shredder (Rasper)",
    power: "180 Hp - 200 Hp (134 kW - 149 kW)",
    Voltage: "As per Customer's Requirement",
    Drive: "ABB / Inovance / Equivalent",
  },

  // {
  //   name: "RST6000",
  //   type: "Secondary Shredder (Rasper)",
  //   power: "200 HP (150 kW)",
  //   Voltage: "415 V / 50 Hz",
  //   Drive: "ABB 160 kW Heavy-Duty VFD",
  // },
];
  const carouselImages = [shredderhd, shredderhd1, shredderhdimg];

  const [selected, setSelected] = useState(shredders[0]);
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  return (
    <>
      {/* ================= SEO HELMET ================= */}
      <Helmet>
        <title>
          Secondary Shredders for Tyre Recycling (Rasper Machines) | Vikah
          Ecotech
        </title>

        <meta
          name="description"
          content="Vikah Ecotech manufactures secondary shredder machines, also known as rasper shredders, designed for tyre recycling plants. These machines perform fine shredding of pre-processed tyres for granulation and material recovery."
        />

        <meta
          name="keywords"
          content="secondary shredder, rasper machine, tyre recycling rasper, secondary tyre shredder, rasper shredder machine"
        />

        <link
          rel="canonical"
          href="https://vikahecotech.com/rasper_secondaryshredders"
        />
      </Helmet>

      {/* ================= PAGE HEADER ================= */}
      {/* HERO CAROUSEL */}

      <div className={styles.heroWrapper}>
        <Carousel controls indicators interval={4000}>
          {/* Slide 1 */}

          <Carousel.Item>
            <img
            style={{ objectFit: "contain" }}
              className={styles.heroImage}
              src={shredderhd}
              alt="Secondary Tyre Shredder"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Secondary Tyre Shredders</h1>

                <p className={styles.heroSubtitle}>
                  Advanced rasper shredders designed for secondary processing of
                  tyre scrap after primary shredding, delivering consistent
                  particle size reduction.
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
              alt="Rasper Machine"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Rasper Shredder Machines</h1>

                <p className={styles.heroSubtitle}>
                  Heavy-duty rasper machines engineered for fine shredding of
                  pre-processed tyres in recycling plants, ensuring high
                  efficiency and durability.
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
              style={{ objectFit: "contain" }}
              src={shredderhdimg}
              alt="Tyre Recycling Secondary Shredder"
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Tyre Recycling Solutions</h1>

                <p className={styles.heroSubtitle}>
                  Reliable secondary shredders for tyre recycling plants,
                  preparing rubber material for granulation, steel separation,
                  and downstream recovery processes.
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

      {/* ================= INTRO CONTENT ================= */}
      <div className="container text-center my-4 balerbackimg">
        <p>
          Our secondary shredder machines, also known as rasper shredders, are
          engineered for efficient fine shredding of tyres in tyre recycling
          plants. These machines process material after primary shredding and
          prepare rubber for downstream granulation, separation, and recovery
          processes.
        </p>

        <p>
          These rasper machines form a critical part of our
          <a href="/secondary-shredder"> secondary shredder systems</a>, helping
          recycling plants achieve consistent particle sizing, higher recovery
          efficiency, and stable long-term operation.
        </p>

        {/* ================= MODEL SELECTION ================= */}
        <div id="modelsSection" className="btn-group flex-wrap mb-4" role="group">
          {shredders.map((machine, index) => (
            <button
              key={index}
              className={`btn btn-outline-success mx-1 my-1 ${
                selected.name === machine.name ? "active" : ""
              }`}
              onClick={() => setSelected(machine)}
            >
              {machine.name}
            </button>
          ))}
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="row justify-content-center align-items-center">
          {/* IMAGE CAROUSEL */}
          <div className="col-md-6 mb-4">
            <div className="custom-carousel">
              <img
                src={carouselImages[slide]}
                className="carousel-img baler-carousel-img"
                alt={`${selected.name} secondary shredder machine by Vikah Ecotech`}
              />

              <button
                type="button"
                className="carousel-btn left"
                onClick={prevSlide}
                aria-label="Previous image"
              >
                ❮
              </button>

              <button
                type="button"
                className="carousel-btn right"
                onClick={nextSlide}
                aria-label="Next image"
              >
                ❯
              </button>
            </div>
          </div>

          {/* MACHINE DETAILS */}
          <div className="col-md-6 mb-4 makecenter">
            <h3 className="machine-title">{selected.name}</h3>

            <ul className="list-unstyled">
              <li>
                <strong>Type:</strong> {selected.type}
              </li>
              <li>
                <strong>Power Range:</strong> {selected.power}
              </li>
              {selected.Voltage && (
                <li>
                  <strong>Voltage:</strong> {selected.Voltage}
                </li>
              )}
              {selected.Drive && (
                <li>
                  <strong>Drive:</strong> {selected.Drive}
                </li>
              )}
            </ul>

            <Link
              to={`/${selected.name.toLowerCase()}`}
              className="btn btn-outline-success mt-3"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RasperSecondaryshredders;
