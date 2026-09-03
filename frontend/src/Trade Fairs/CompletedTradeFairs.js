import React from "react";
import { Link } from "react-router-dom";
import ifatimg from "../images/ifat-india-300x218.png";
import ece from "../images/eco sustain 2025/ese.png";
import ese from "../images/eco sustain 2026/ese.png";
import envirotechimg from "../images/envirotech/envirotechimg.png";
import ecosustainimg from "../images/ecosustain.png";
import bharatrecycling from "../images/bharatrecycling.png";
import "./CompletedTradeFairs.css";

function CompletedTradeFairs() {

  const completedFairs = [

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
      link: "/bharatrecycling2026",
      buttonText: "Images and Videos",
    },
    {
      title: "Eco Sustain Expo & Conference",
      image: ese,
      description: `Eco Sustain Expo & Conference is India's premier sustainability platform, bringing together industry leaders, innovators, policymakers, researchers, and solution providers. The event showcases cutting-edge technologies and sustainable solutions across waste management, bioenergy, recycling, environmental protection, and circular economy initiatives. Exhibitors gain the opportunity to present their innovations to a global audience, build strategic partnerships, and contribute to a greener future, while the conference connects participants with sustainability visionaries and industry experts driving positive environmental change.`,
      date: "30-07-2026 to 01-08-2026",
      location: "HITEX Exhibition Center, Hyderabad",
      hall: 2,
      booth: "2K14",
      link: "/ecosustain2026",
      buttonText: "Images and Videos",
    },
    {
      title: "IFAT India",
      image: ifatimg,
      description: `IFAT India brings together professionals from water, sewage, waste,
      and recycling industries to foster knowledge sharing, networking, and collaboration
      among policymakers, industry leaders, and environmental experts.`,
      date: "14-10-2025 to 16-10-2025",
      location: "Bombay Exhibition Centre, Mumbai",
      booth: "2 / B005",
      link: "/ifat2025",
      buttonText: "Images and Videos",
      isInternal: true,
    },
    {
      title: "Eco Sustain Expo & Conference",
      image: ece,
      description: `Eco Sustain Expo & Conference, an exceptional event meticulously crafted
      by HITEX, Hyderabad that brings together a diverse community of professionals,
      visionaries, policymakers, researchers, and solution providers, all bound by a
      resolute dedication to shaping a sustainable future.`,
      date: "22-08-2025 to 24-08-2025",
      location: "HITEX Exhibition Center, Hyderabad",
      booth: "C06",
      link: "/ecosustain2025",
      buttonText: "Images and Videos",
      isInternal: true,
    },
    {
      title: "EnviroTech Asia 2024",
      image: envirotechimg,
      description: `The 7th edition provides a platform for business leaders, investors,
      government officials, industry experts, and NGOs to share insights and opportunities
      in environmental protection and green business. It is one of the largest gatherings
      in the environment sector, bringing together key stakeholders.`,
      date: "3–5 Dec 2024",
      location: "Yashobhoomi Convention Center, Dwarka, Delhi",
      booth: null,
      link: "/Tradefairs",
      buttonText: "Know More",
      isInternal: true,
    },
    {
      title: "IFAT India",
      image: ifatimg,
      description: `IFAT India has been bringing together professionals and experts from
      various sectors of the water, sewage, waste, and recycling industry, providing a
      platform for knowledge exchange, networking, and partnership opportunities.`,
      date: "16–18 Oct 2024",
      location: "Mumbai Exhibition Centre",
      booth: "D016, Hall: 3",
      link: "/ifat",
      buttonText: "Images and Videos",
      isInternal: true,
    },
    {
      title: "Eco Sustain Expo & Conference",
      image: ecosustainimg,
      description: `Eco Sustain Expo & Conference is a leading sustainability-focused
      event organized at HITEX, Hyderabad, bringing together innovators, businesses,
      and policymakers committed to environmental solutions and sustainable growth.`,
      date: "16–18 Aug 2024",
      location: "HITEX Exhibition Center, Hyderabad",
      booth: "4N01",
      link: "/completedTradefair1",
      buttonText: "Images and Videos",
      isInternal: true,
    },
  ];

  return (
    <>
      {completedFairs.map((fair, index) => (
        <div className="trade-card" key={index}>
          <img src={fair.image} alt={fair.title} className="trade-img" />

          <div className="trade-content p-3">
            <h5>{fair.title}</h5>

            <p>{fair.description}</p>

            <p><strong>Date:</strong> {fair.date}</p>
            <p><strong>Location:</strong> {fair.location}</p>

            {fair.booth && (
              <p><strong>Booth No:</strong> {fair.booth}</p>
            )}

            {/* 🔥 Handle Link / Button */}
            {fair.isInternal ? (
              <Link to={fair.link} className="btn btn-success">
                {fair.buttonText}
              </Link>
            ) : (
              <a
                href={fair.link}
                className="btn btn-success"
                target="_blank"
                rel="noopener noreferrer"
              >
                {fair.buttonText}
              </a>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default CompletedTradeFairs;