import React, { useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './CompletedTradefair1.css';

import t1 from "../images/ifattrade/entry1.jpeg";
import t2 from "../images/ifattrade/customer1.jpeg";
import t3 from "../images/ifattrade/customer2.jpeg";
import t4 from "../images/ifattrade/customer3.jpeg";
import t5 from "../images/ifattrade/group1.jpeg";
import t6 from "../images/ifattrade/group2.jpeg";
import t7 from "../images/ifattrade/group3.jpeg";

const Ifat = () => {
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

        // First YouTube Shorts Video
        {
            original: "https://img.youtube.com/vi/e061UbSCaSs/maxresdefault.jpg",
            thumbnail: t3,
            renderItem: () => (
                <div className="video-gallery">
                    <div className="video-wrapper">
                        <iframe
                            width="100%"
                            height="400"
                            src="https://www.youtube.com/embed/e061UbSCaSs?rel=0"
                            title="IFAT 2024 Video 1"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )
        },

        // Second YouTube Shorts Video
        {
            original: "https://img.youtube.com/vi/kZ_dqFlAJJ8/maxresdefault.jpg",
            thumbnail: t5,
            renderItem: () => (
                <div className="video-gallery">
                    <div className="video-wrapper">
                        <iframe
                            width="100%"
                            height="400"
                            src="https://www.youtube.com/embed/kZ_dqFlAJJ8?rel=0"
                            title="IFAT 2024 Video 2"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )
        }
    ];

    return (
        <>
            <div>
                <div className="about-top-section text-white text-center py-5">
                    <h1 className="display-5 fw-bold">Images and Videos of Ifat</h1>
                    <p className="mb-1"><strong></strong> 16-10-2024 to 18-10-2024</p>
                </div>
            </div>

            <div className="gallery-container">
                <ImageGallery items={images} useBrowserFullscreen={false} />
            </div>
        </>
    );
};

export default Ifat;
