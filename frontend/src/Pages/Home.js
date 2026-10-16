import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import UpcomingTradeFairs from "../Trade Fairs/UpcomingTradeFairs";
import CompletedTradeFairs from "../Trade Fairs/CompletedTradeFairs";
import gif from "../images/green_combo_top.gif";
import Baler from "../images/baler.png";
import Baler1 from "../images/baler1.png";
import tyrefolding from "../images/tyre folding1.jpg";
import bgImage from "../images/backimg.avif";
import Homecards from "./Homecards";

function Home() {
  const productsRef = useRef(null);
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const scrollCards = (direction) => {
  //   const container = document.getElementById("tradeCardScroll");
  //   const scrollAmount = 320;
  //   if (direction === "left") {
  //     container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  //   } else {
  //     container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  //   }
  // };

  useEffect(() => {
    // Directly set the scroll position to the top of the page
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For compatibility with older browsers
  }, []); // Empty dependency array ensures it runs only once on page load

  const testimonials = [
    {
      company: "EUROPEAN ASIAN METALS LTD (UK)",
      feedback:
        "We recently purchased a Baler machine from Vikah Ecotech and we couldn’t be happier with the product. The quality of the machine is top notch, and it has significantly increased our baling production. The customer service provided by the team at Vikah Ecotech was exceptional. We highly recommend Vikah Ecotech machinery to anyone in the recycling industry.",
      author: "J.Shannu",
      image: Baler,
    },
    {
      company: "LG ENVIRONMENTAL SERVICES LLC (SAUDI ARABIA)",
      feedback:
        "I have been using Vikah Ecotech Tyre Cutting and Folding equipments and I have to say that their machines are built to last. I recently added a shredder line and it has been performing beyond my expectations. The precision and reliability of their shredders are truly impressive. Thank you Vikah Ecotech for providing such high quality machines.",
      author: "Mohammad El Assai",
      image: tyrefolding,
    },
    {
      company: "MTC (NEW ZEALAND)",
      feedback:
        "After extensive research, we decided to purchase a new baler machine from Vikah Ecotech, and it was one of the best decisions we made for our business. The machine has streamlined our baling process, saving us both time and money. The time at Vikah Ecotech was extremely helpful throughout the purchasing process guiding all customizable solutions and also their after sales support has been fantastic. We are extremely satisfied with our purchase.",
      author: "Capt Ject",
      image: Baler1,
    },
    {
      company: "VENKATA SIVA SAI INDUSTRIES (INDIA)",
      feedback:
        "We recently bought a baler machine for waste tyres and the quality of the machine is exceptionally good with no maintenance. The quality of the structure and the baling force are top quality. After sales service by the team in Vikah are very helpful and attending all our queries in no time. Happy with their service. Keep going Vikah Ecotech.",
      author: "K.Kumar",
      image: Baler,
    },
    {
      company: "GREEN EARTH RECYCLERS PTE LTD (SINGAPORE)",
      feedback:
        "We purchased a complete tyre recycling line from Vikah Ecotech, and the performance has been outstanding. The installation was smooth, and the machines run efficiently with minimal downtime. Their team provided excellent technical guidance and ensured we understood every part of the process. Truly a reliable partner for long-term industrial needs.",
      author: "Daniel Wong",
      image: tyrefolding, // or any image you prefer
    },

  ];

  const [current, setCurrent] = React.useState(0);

  const prev = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrent((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const [activeTab, setActiveTab] = useState("completed"); // Default to "completed" tab

  const scrollRef = useRef(null);

const scrollCards = (direction) => {
  const container = scrollRef.current;
  if (!container) return;

  const scrollAmount = container.clientWidth * 0.9;

  container.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};


  return (
    <>
      <div
        className="home-container"
        onClick={scrollToProducts}
        style={{ cursor: "pointer" }}
      >
        <img src={gif} alt="Top Animation" />
      </div>

      {/* Content section with Bootstrap grid layout */}
      <div className="container my-5">
        <div className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          <h2 className="green-heading mb-3">
            Your Partner in Sustainable Recycling Solutions
          </h2>
          <p className="mb-4">
            At Vikah Ecotech, we are dedicated to pioneering innovative
            solutions in the field of recycling machinery manufacturing. With a
            commitment to sustainability and environmental stewardship, we
            design and produce cutting-edge machinery that empowers industries
            to efficiently process waste materials and contribute to a circular
            economy.
          </p>
          <Link to="/About">
            <button className="btn btn-success">Learn More</button>
          </Link>
        </div>
      </div>

      <div ref={productsRef}>
        <Homecards />
      </div>


      {/* Trade Fair Section */}
      <div className="container my-5">
        <h2 className="green-heading text-center mb-4">
          Trade Fairs & Exhibitions
        </h2>

        {/* Tab Buttons */}
        <div className="d-flex justify-content-center mb-4">
          <button
            className={`btn-tab mx-2 ${activeTab === "upcoming" ? "active" : ""
              }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Trade Fair
          </button>
          <button
            className={`btn-tab mx-2 ${activeTab === "completed" ? "active" : ""
              }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Trade Fairs
          </button>
        </div>

        <div className="position-relative">
          {/* Scroll Buttons */}
          <button
            className="scroll-btn left"
            onClick={() => scrollCards("left")}
          >
            &#8249;
          </button>
          <button
            className="scroll-btn right"
            onClick={() => scrollCards("right")}
          >
            &#8250;
          </button>

          <div
            ref={scrollRef}
            className="trade-scroll-wrapper d-flex"
          >
            {activeTab === "upcoming" ? (
              <UpcomingTradeFairs />
            ) : (
              <CompletedTradeFairs />
            )}
          </div>
        </div>
      </div>

      <div
        className="testimonial-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="testimonial-card">
          <h4 className="green-heading mb-4">What Our Clients Say</h4>
          <button className="testimonial-btn left" onClick={prev}>
            &#8249;
          </button>

          <div className="testimonial-content">
            {/* 👇 Add image here */}
            <img
              src={testimonials[current].image}
              alt={testimonials[current].author}
              className="testimonial-avatar"
            />

            <h5 className="testimonial-company">
              {testimonials[current].company}
            </h5>
            <p className="testimonial-text">
              "{testimonials[current].feedback}"
            </p>
            <p className="testimonial-author">
              – {testimonials[current].author}
            </p>
          </div>

          <button className="testimonial-btn right" onClick={next}>
            &#8250;
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
