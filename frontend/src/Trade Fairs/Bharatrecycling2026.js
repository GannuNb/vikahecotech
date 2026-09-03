import React, { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./CompletedTradefair1.css";

// Bharat Recycling Show 2026 images
import firstSlide from "../images/bharat recycling 2026/first_slide.jpeg";
import t1 from "../images/bharat recycling 2026/1.jpeg";
import t2 from "../images/bharat recycling 2026/2.jpeg";
import t3 from "../images/bharat recycling 2026/4.jpeg";
import t4 from "../images/bharat recycling 2026/6.jpeg";
import t5 from "../images/bharat recycling 2026/7.jpeg";
import t6 from "../images/bharat recycling 2026/9.jpeg";
import t7 from "../images/bharat recycling 2026/10.jpeg";
import t8 from "../images/bharat recycling 2026/11.jpeg";
import t9 from "../images/bharat recycling 2026/13.jpeg";
import t10 from "../images/bharat recycling 2026/15.jpeg";
import t11 from "../images/bharat recycling 2026/16.jpeg";

const Bharatrecycling2026 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = [
    // First slide
    {
      original: firstSlide,
      thumbnail: firstSlide,
    },

    // Bharat Recycling Show 2026 images
    {
      original: t1,
      thumbnail: t1,
    },
    {
      original: t2,
      thumbnail: t2,
    },
    {
      original: t3,
      thumbnail: t3,
    },
    {
      original: t4,
      thumbnail: t4,
    },
    {
      original: t5,
      thumbnail: t5,
    },
    {
      original: t6,
      thumbnail: t6,
    },
    {
      original: t7,
      thumbnail: t7,
    },
    {
      original: t8,
      thumbnail: t8,
    },
    {
      original: t9,
      thumbnail: t9,
    },
    {
      original: t10,
      thumbnail: t10,
    },
    {
      original: t11,
      thumbnail: t11,
    },

    // YouTube video
    {
      original:
        "https://img.youtube.com/vi/_BPgUAtmv3Y/hqdefault.jpg",
      thumbnail:
        "https://img.youtube.com/vi/_BPgUAtmv3Y/default.jpg",

      renderItem: () => (
        <div className="video-gallery">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/_BPgUAtmv3Y?rel=0"
              title="Bharat Recycling Show 2026 Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="about-top-section text-white text-center py-5">
        <h1 className="display-5 fw-bold">
          Images and Videos of Bharat Recycling Show
        </h1>

        <p className="mb-1">
          <strong></strong>31-08-2026 to 02-09-2026
        </p>
      </div>

      <div className="gallery-container">
        <ImageGallery items={images} />
      </div>
    </>
  );
};

export default Bharatrecycling2026;

