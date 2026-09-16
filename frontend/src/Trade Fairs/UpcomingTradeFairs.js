import React from "react";
import rsme from "../images/Recyclingexpo_middleeast_2025/logo_rsme.jpg";
import "./UpcomingTradeFairs.css";

function UpcomingTradeFairs() {
  const tradeFairs = [
    {
      title: "Recycling Expo Middle East",
      image: rsme,

      participation:
        "Vikah Ecotech is participating in the event, showcasing innovative recycling machinery and sustainable solutions for the waste management industry.",

      description: `Organized by Eljays44, a globally recognized event company,
      Recycling Expo Middle East 2026 serves as a premier B2B platform connecting
      industry leaders, innovators, and decision-makers in the recycling and waste
      management sector. The event highlights cutting-edge technologies,
      sustainable practices, and investment opportunities shaping the future of recycling.`,

      date: "22-09-2026 to 23-09-2026",
      location: "Dubai",
      hall: null,
      booth: "A60",
      link: "https://www.recyclingexpome.com/",
      buttonText: "Explore Recycling Expo",
    },
    
  ];

  return (
    <>
      {tradeFairs.map((fair, index) => (
        <div className="trade-card position-relative" key={index}>
          <div className="upcoming-badge">Upcoming Trade Fair</div>

          <img
            src={fair.image}
            alt={fair.title}
            className="trade-img"
          />

          <div className="trade-content p-3">
            <h5>{fair.title}</h5>

            <p className="participation-text">
              {fair.participation}
            </p>

            <p>{fair.description}</p>

            <p>
              <strong>Date:</strong> {fair.date}
            </p>

            <p>
              <strong>Location:</strong> {fair.location}
            </p>

            {fair.hall && (
              <p>
                <strong>Hall No:</strong> {fair.hall}
              </p>
            )}

            <p>
              <strong>Booth No:</strong> {fair.booth}
            </p>

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