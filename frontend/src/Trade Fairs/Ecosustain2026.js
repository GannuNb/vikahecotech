import React, { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./CompletedTradefair1.css";

// Replace these with your 2026 images
import t1 from "../images/eco sustain 2026/image.jpg";
import t2 from "../images/eco sustain 2026/image5.jpeg";
import t3 from "../images/eco sustain 2026/image4.jpeg";
import t4 from "../images/eco sustain 2026/image3.jpeg";
import t5 from "../images/eco sustain 2026/image1.jpeg";

const Ecosustain2026 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = [
    { original: t1, thumbnail: t1 },
    { original: t2, thumbnail: t2 },
    { original: t3, thumbnail: t3 },
    { original: t4, thumbnail: t4 },
    { original: t5, thumbnail: t5 },

    // Replace the YouTube video ID if you have a 2026 video
    {
      original: "https://img.youtube.com/vi/VzwLMsXQ4_E/hqdefault.jpg",
      thumbnail: "https://img.youtube.com/vi/VzwLMsXQ4_E/default.jpg",
      renderItem: () => (
        <div className="video-gallery">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/VzwLMsXQ4_E?rel=0"
              title="Eco Sustain Expo 2026 Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ),
    },
    ,
  ];

  return (
    <>
      <div className="about-top-section text-white text-center py-5">
        <h1 className="display-5 fw-bold">
          Images and Videos of Eco Sustain Expo
        </h1>
        <p className="mb-1">
          <strong></strong>30-07-2026 to 01-08-2026
        </p>
      </div>

      <div className="gallery-container">
        <ImageGallery items={images} />
      </div>
    </>
  );
};

export default Ecosustain2026;
