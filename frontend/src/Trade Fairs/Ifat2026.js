import React, { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./CompletedTradefair1.css";

// IFAT India 2026 images
import t1 from "../images/ifat 2026/2.jpg";
import t2 from "../images/ifat 2026/7.jpg";
import t3 from "../images/ifat 2026/10.jpg";
import t4 from "../images/ifat 2026/12.jpg";
import t5 from "../images/ifat 2026/15.jpg";
import t6 from "../images/ifat 2026/16.jpg";
import t7 from "../images/ifat 2026/18.jpg";
import t8 from "../images/ifat 2026/20.jpg";
import t9 from "../images/ifat 2026/25.jpg";
import t10 from "../images/ifat 2026/26.jpg";
import t11 from "../images/ifat 2026/28.jpg";
import t12 from "../images/ifat 2026/31.jpg";
import t13 from "../images/ifat 2026/34.jpg";
import t14 from "../images/ifat 2026/35.jpg";
import t15 from "../images/ifat 2026/36.jpg";
import t16 from "../images/ifat 2026/38.jpg";
import t17 from "../images/ifat 2026/40.jpg";
import t18 from "../images/ifat 2026/41.jpg";
import t19 from "../images/ifat 2026/43.jpg";
import t20 from "../images/ifat 2026/44.jpg";
import t21 from "../images/ifat 2026/46.jpg";
import t22 from "../images/ifat 2026/47.jpg";
import t23 from "../images/ifat 2026/48.jpg";

const Ifat2026 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = [
    { original: t1, thumbnail: t1 },
    { original: t2, thumbnail: t2 },
    { original: t3, thumbnail: t3 },
    { original: t4, thumbnail: t4 },
    { original: t5, thumbnail: t5 },
    { original: t6, thumbnail: t6 },
    { original: t7, thumbnail: t7 },
    { original: t8, thumbnail: t8 },
    { original: t9, thumbnail: t9 },
    { original: t10, thumbnail: t10 },
    { original: t11, thumbnail: t11 },
    { original: t12, thumbnail: t12 },
    { original: t13, thumbnail: t13 },
    { original: t14, thumbnail: t14 },
    { original: t15, thumbnail: t15 },
    { original: t16, thumbnail: t16 },
    { original: t17, thumbnail: t17 },
    { original: t18, thumbnail: t18 },
    { original: t19, thumbnail: t19 },
    { original: t20, thumbnail: t20 },
    { original: t21, thumbnail: t21 },
    { original: t22, thumbnail: t22 },
    { original: t23, thumbnail: t23 },

    // IFAT India 2026 YouTube Video - Last Slide
    {
      original: "https://img.youtube.com/vi/JPorIBm88YY/hqdefault.jpg",
      thumbnail: "https://img.youtube.com/vi/JPorIBm88YY/default.jpg",
      renderItem: () => (
        <div className="video-gallery">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/JPorIBm88YY?rel=0"
              title="IFAT India 2026 Video"
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
          Images and Videos of IFAT India 2026
        </h1>

        <p className="mb-1">
          09-09-2026 to 11-09-2026
        </p>
      </div>

      <div className="gallery-container">
        <ImageGallery items={images} />
      </div>
    </>
  );
};

export default Ifat2026;