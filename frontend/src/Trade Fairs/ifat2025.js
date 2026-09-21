import React, { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./CompletedTradefair1.css";

import t1 from "../images/ifat2025/8.jpg";
import t2 from "../images/ifat2025/4.jpg";
import t3 from "../images/ifat2025/1.jpg";
import t4 from "../images/ifat2025/2.jpg";
import t5 from "../images/ifat2025/3.jpg";
import t6 from "../images/ifat2025/10.jpg";
import t7 from "../images/ifat2025/12.jpg";
import t8 from "../images/ifat2025/9.jpg";

const Ifat2025 = () => {
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

    // ✅ Embedded YouTube Video using correct embed URL
    {
      original: "https://img.youtube.com/vi/32e0MAfXBWI/0.jpg",
      thumbnail: "https://img.youtube.com/vi/32e0MAfXBWI/default.jpg",
      renderItem: () => (
        <div className="video-gallery">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/32e0MAfXBWI"
              title="IFAT 2025 Video 1"
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
      <div>
        <div className="about-top-section text-white text-center py-5">
          <h1 className="display-5 fw-bold">Images and Videos of Ifat 2025</h1>
          <p className="mb-1">
            <strong>Dates:</strong> 14-10-2025 to 16-10-2025
          </p>
        </div>
      </div>

      <div className="gallery-container">
        <ImageGallery items={images} useBrowserFullscreen={false}/>
      </div>
    </>
  );
};

export default Ifat2025;
