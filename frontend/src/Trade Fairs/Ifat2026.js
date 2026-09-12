import React, { useEffect } from "react";
import "./CompletedTradefair1.css";

const Ifat2026 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="about-top-section text-white text-center py-5">
        <h1 className="display-5 fw-bold">
          IFAT India 2026
        </h1>

        <p className="mb-1">
          09-09-2026 to 11-09-2026
        </p>
      </div>

      <div className="gallery-container text-center py-5">
        <h3>Images and Videos will be added soon.</h3>
        <p>
          We will update this page with IFAT India 2026 event photos and videos.
        </p>
      </div>
    </>
  );
};

export default Ifat2026;