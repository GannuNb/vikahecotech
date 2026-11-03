
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Blog.module.css";

// ==============================
// Baler Blogs Images
// ==============================
import Img1 from "./../images/Applications/plasticbaler1.jpg";
import Img2 from "./../images/Applications/apppcb6.webp";
import BlogImg2 from "./../images/Applications/app12.jpg";
import BlogImg3 from "./../images/Applications/pss1.png";
import Img18 from "./../images/Applications/plasticbaler1.jpg";

// ==============================
// Secondary Shredder Images
// ==============================
import Img5 from "./../images/Applications/shredpcb1.jpg";
import Img6 from "./../images/Applications/secplas.jpg";
import Img7 from "./../images/Applications/secmetal.webp";
import Img8 from "./../images/R2.png";

import Img19 from "./../images/Applications/plasticbaler1.jpg";

// ==============================
// Other Equipment Images
// ==============================
import Img9 from "./../images/Applications/plasticbaler1.jpg";
import Img10 from "./../images/Applications/plasticbaler2.jpg";
import Img11 from "./../images/Applications/pcb1.webp";
import Img12 from "./../images/Applications/pcb3.webp";

// ==============================
// Primary Shredder Images
// ==============================
import Img13 from "./../images/Applications/tyreshred2.jpg";
import Img14 from "./../images/Applications/tyreshred1.jpg";
import Img15 from "./../images/Applications/shredp1.png";
import Img16 from "./../images/Applications/shredewaste2.webp";
import Img17 from "./../images/Applications/shredm2.jpg";

// ==============================
// Blog Data
// ==============================
const blogsData = [
    // ------------------------------
    // Baler Blogs
    // ------------------------------
    {
        title: "Hydraulic Balers in India",
        description:
            "How do hydraulic tyre balers improve efficiency, safety, and overall waste management?",
        route: "/baler-info",
        image: Img1,
        category: "Baler"
    },
    {
        title: "Advanced Baling Solutions",
        description:
            "Learn about modern baling technologies that optimize storage and reduce operational costs.",
        route: "/baler-scrap-management",
        image: Img2,
        category: "Baler"
    },
    {
        title: "Industrial Tyre Baling Machines",
        description:
            "What makes industrial tyre balers essential for large-scale recycling facilities?",
        route: "/tyre-balers-machine",
        image: BlogImg3,
        category: "Baler"
    },
    {
        title: "Tyre Baler Operational Insights",
        description:
            "Understand how balers streamline workflow, ensure compliance, and boost resale value.",
        route: "/baler-for-tyres",
        image: BlogImg2,
        category: "Baler"
    },
    {
        title: "Hydraulic Baling Solution for Plastic Recycling",
        description:
            "Explore how hydraulic balers transform plastic waste into compact, high-density bales for efficient recycling and reduced logistics costs.",
        route: "/plastic-baler-info",
        image: Img18,
        category: "Baler"
    },

    // ------------------------------
    // Municipal Solid Waste Blog
    // ------------------------------
    {
        title: "Municipal Solid Waste Management in India",
        description:
            "Explore how municipal solid waste management uses recycling solutions like balers and shredders to improve efficiency, reduce costs, and support sustainable urban development.",
        route: "/munipical-waste-management",
        image: Img18,
        category: "Other"
    },

    // ------------------------------
    // Primary Shredder Blogs
    // ------------------------------
    {
        title: "Primary Shredders – Complete Breakdown",
        description:
            "How do primary shredders manage bulky waste and enhance shredding efficiency?",
        route: "/primary-shredder-waste-management",
        image: Img13,
        category: "Shredder"
    },
    {
        title: "High-Capacity Shredders",
        description:
            "Explore performance, cost savings, and the safety features of high-capacity shredders.",
        route: "/recycling-process-with-shredder-machines",
        image: Img14,
        category: "Shredder"
    },
    {
        title: "Tyre Shredding Technology Trends",
        description:
            "What are the latest innovations boosting throughput and reducing downtime in shredding?",
        route: "/primary-shredders-for-tyres",
        image: Img13,
        category: "Shredder"
    },
    {
        title: "Advanced Shredders for Metal Recycling",
        description:
            "Trusted metal shredders manufacturers in India offering efficient scrap processing, cost savings, and safety.",
        route: "/metal-shredders",
        image: Img17,
        category: "Shredder"
    },
    {
        title: "Industrial Primary Shredders",
        description:
            "Discover new shredder technologies designed for better productivity and lower maintenance.",
        route: "/industrial-primary-shredders",
        image: Img16,
        category: "Shredder"
    },

    // ------------------------------
    // Tyre Recycling Blogs
    // ------------------------------
    {
        title: "Tyre Scrap Recycling Plant Manufacturers - India",
        description:
            "Discover leading tyre scrap recycling plant manufacturers in India offering advanced machinery.",
        route: "/tyre-recycling-plant-manufacturers",
        image: Img19,
        category: "Other"
    },
    {
        title: "Tyre Recycling Machine",
        description:
            "Explore how modern tyre recycling machines process waste tyres into reusable rubber, steel, and fibre through efficient recycling technology.",
        route: "/tyre-recycling-machine",
        image: Img13,
        category: "Other"
    },

    // ------------------------------
    // Secondary Shredder Blogs
    // ------------------------------
    {
        title: "Secondary Shredders Explained",
        description:
            "Why are secondary shredders crucial for fine processing and size reduction?",
        route: "/industrial-secondary-shredder",
        image: Img5,
        category: "Secondary"
    },
    {
        title: "Dual-Shaft Secondary Shredders",
        description:
            "Understand how dual-shaft systems increase performance, safety, and reliability.",
        route: "/secondaryshredder-blog2",
        image: Img6,
        category: "Secondary"
    },
    {
        title: "Zero-Waste Processing with Secondary Shredders",
        description:
            "How do secondary shredders contribute to a complete zero-waste recycling workflow?",
        route: "/secondaryshredder-blog3",
        image: Img7,
        category: "Secondary"
    },
    {
        title: "Secondary Shredders – Cost & ROI",
        description:
            "Detailed cost breakdown, maintenance insights, and long-term ROI advantages.",
        route: "/secondaryshredder-blog4",
        image: Img8,
        category: "Secondary"
    },

    // ------------------------------
    // Other Equipment Blogs
    // ------------------------------
    {
        title: "How Feeding Equipment Works",
        description:
            "Learn how feeding equipment ensures smooth and continuous material flow in recycling operations, preventing jams and improving efficiency.",
        route: "/otherequipment-blog1",
        image: Img9,
        category: "Other"
    },
    {
        title: "Who Should Use Screening & Separation Equipment?",
        description:
            "Discover which recycling facilities benefit most from screening and separation equipment to maintain material purity and improve downstream processing.",
        route: "/otherequipment-blog2",
        image: Img10,
        category: "Other"
    },
    {
        title: "Types of Tyre Cutting & Preparation Machines",
        description:
            "Understand the different types of tyre cutting and preparation machines and how they streamline tyre recycling, from bead wire removal to block cutting.",
        route: "/otherequipment-blog3",
        image: Img11,
        category: "Other"
    },
    {
        title: "Impact on Efficiency and Workflow Optimization",
        description:
            "Explore how packing and folding equipment improves workflow, reduces manual labor, and optimizes efficiency across tyre recycling facilities.",
        route: "/otherequipment-blog4",
        image: Img12,
        category: "Other"
    }
];

// ==============================
// Blog Landing Page Component
// ==============================
const BlogLandingPage = () => {

    // Scroll to top when the page loads.
    // Do not implicitly return window.scrollTo() from useEffect.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container my-5">

            <h1 className="text-center mb-5">
                Our Industrial Recycling Blogs
            </h1>

            <div className="row g-4">

                {blogsData.map((blog, index) => (
                    <div
                        key={blog.route || index}
                        className="col-md-6 col-lg-4"
                    >
                        <Link
                            to={blog.route}
                            className={styles.cardLink}
                        >
                            <div className={styles.uniqueCard}>

                                {/* Card Heading */}
                                <div className={styles.topWave}>
                                    <h3>{blog.title}</h3>
                                </div>

                                {/* Blog Image */}
                                <div className={styles.imageContainer}>
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className={styles.machineImg}
                                        loading="lazy"
                                    />
                                </div>

                                {/* Card Description */}
                                <div className={styles.bottomOval}>
                                    <h4>{blog.title}</h4>

                                    <p>{blog.description}</p>

                                    <button
                                        type="button"
                                        className={styles.readMoreBtn}
                                    >
                                        Read More
                                    </button>
                                </div>

                            </div>
                        </Link>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default BlogLandingPage;
