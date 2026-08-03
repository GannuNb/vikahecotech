import React from "react";
import rsme from "../images/Recyclingexpo_middleeast_2025/logo_rsme.jpg";
import ifatimg from "../images/ifat-india-300x218.png";
import bharatrecycling from "../images/bharatrecycling.png";
import ece from "../images/eco sustain 2026/ese.png";
import "./UpcomingTradeFairs.css";

function UpcomingTradeFairs() {

  const tradeFairs = [
    {
      title: "Bharat Recycling Show",
      image: bharatrecycling,
      description: `Bharat Recycling Show is a premier platform dedicated to India’s
      recycling and waste management industry. It connects manufacturers,
      recyclers, policymakers, and innovators to explore sustainable solutions
      and business opportunities.`,
      date: "31-08-2026 to 02-09-2026",
      location: "Bombay Exhibition Centre (NESCO), Mumbai",
      booth: "B410",
      link: "https://www.bharatrecyclingshow.com/",
      buttonText: "Explore Bharat Recycling Show",
    },
    {
      title: "IFAT",
      image: ifatimg,
      description: `IFAT is the world’s leading trade fair for environmental
      technologies, focusing on water, sewage, waste, and recycling solutions.
      It brings together global industry leaders, policymakers, and innovators
      to showcase advanced technologies for a circular economy.`,
      date: "09-09-2026 to 11-09-2026",
      location: "Bombay Exhibition Centre",
      hall: "02",
      booth: "C021",
      link: "https://ifat.de/en/trade-fair/",
      buttonText: "Explore IFAT",
    },
    {
      title: "Recycling Expo Middle East",
      image: rsme,
      description: `Organized by Eljays44, a globally recognized event company,
      Recycling Expo Middle East 2026 serves as a premier B2B platform connecting
      industry leaders, innovators, and decision-makers in the recycling and waste
      management sector. The event highlights cutting-edge technologies,
      sustainable practices, and investment opportunities shaping the future of recycling.`,
      date: "22-09-2026 to 23-09-2026",
      location: "Dubai",
      hall: null,
      booth: "A52",
      link: "https://www.recyclingexpome.com/",
      buttonText: "Explore Recycling Expo",
    },
  ];

  return (
    <>
      {tradeFairs.map((fair, index) => (
        <div className="trade-card position-relative" key={index}>
          <div className="upcoming-badge">Upcoming Trade Fair</div>

          <img src={fair.image} alt={fair.title} className="trade-img" />

          <div className="trade-content p-3">
            <h5>{fair.title}</h5>

            <p>{fair.description}</p>

            <p><strong>Date:</strong> {fair.date}</p>
            <p><strong>Location:</strong> {fair.location}</p>

            {fair.hall && (
              <p><strong>Hall No:</strong> {fair.hall}</p>
            )}

            <p><strong>Booth No:</strong> {fair.booth}</p>

            <a
              href={fair.link}
              className="btn btn-success"
              target="_blank"
              rel="noopener noreferrer"
            >
              {fair.buttonText}
            </a>
          </div>
        </div>
      ))}
    </>
  );
}

export default UpcomingTradeFairs;