import React, { useState, useEffect } from "react";
import styles from "../Baler/Blog.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import BlogImg1 from "../../images/Applications/tyreshred2.jpg";
import BlogImg4 from "../../images/Applications/tyreshred1.jpg";
import shred1 from "../../images/Applications/shredtyre6.jpg";

const faqsData = [
  {
    question: "What types of materials can Primary Shredders handle?",
    answer:
      "Industrial Primary Shredders handle plastics, rubber, wood, paper, and various scrap materials, providing a versatile solution for manufacturing and recycling operations.",
  },
  {
    question: "Are Primary Shredders safe to operate?",
    answer:
      "Yes, modern industrial Primary Shredders include safety interlocks, emergency stops, and overload protection to ensure operator safety.",
  },
  {
    question: "How do Primary Shredders improve workflow?",
    answer:
      "Primary Shredders reduce material size, making handling, storage, and transport easier while improving throughput.",
  },
  {
    question: "Do Primary Shredders support sustainability goals?",
    answer:
      "Absolutely. Shredded materials are easier to recycle, reducing landfill dependency and supporting green industrial practices.",
  },
];

const benefitsData = [
  {
    title: "Reduce Waste Volume",
    icon: "⚙️",
    text: "Breaks down bulky materials into manageable sizes for easier handling.",
  },
  {
    title: "Improve Workflow",
    icon: "🚛",
    text: "Makes storage, transport, and material movement more efficient.",
  },
  {
    title: "Lower Costs",
    icon: "💰",
    text: "Reduces labor, transport, and storage expenses over time.",
  },
  {
    title: "Support Recycling",
    icon: "♻️",
    text: "Prepares materials for recycling and sustainable reuse.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Feed Material",
    text: "Bulky scrap and waste materials are loaded into the shredder.",
  },
  {
    step: "02",
    title: "Shred Material",
    text: "Rotating blades or cutters reduce material into smaller pieces.",
  },
  {
    step: "03",
    title: "Sort & Store",
    text: "Processed materials are easier to sort, store, and transport.",
  },
  {
    step: "04",
    title: "Recycle or Reuse",
    text: "Shredded output is ready for recycling or reuse in operations.",
  },
];

const ShredderBlog1 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "benefits", title: "Key Benefits" },
    { id: "importance", title: "Importance" },
    { id: "operation", title: "How It Works" },
    { id: "types", title: "Types of Shredders" },
    { id: "process", title: "Working Process" },
    { id: "workflow", title: "Workflow Optimization" },
    { id: "cost", title: "Cost Reduction" },
    { id: "safety", title: "Safety" },
    { id: "sustainability", title: "Sustainability" },
    { id: "automation", title: "Automation" },
    { id: "long-term", title: "Long-Term Impact" },
    { id: "conclusion", title: "Conclusion" },
    { id: "faqs", title: "FAQs" },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      let scrollPos = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sections[i].id);

        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>
          Industrial Primary Shredders for Efficient Waste Management | Vikah Ecotech
        </title>

        <meta
          name="description"
          content="Learn why industries use industrial primary shredders for efficient waste management, recycling, cost reduction, and sustainability. Explore benefits, safety, and applications."
        />

        <meta
          name="keywords"
          content="industrial primary shredder, waste management shredder, recycling shredder machine, industrial shredding solutions"
        />

        <link
          rel="canonical"
          href="https://vikahecotech.com/primary-shredder-waste-management"
        />
      </Helmet>

      <nav className={styles.toc}>
        <h3>Explore Sections</h3>
        <ul>
          {sections.map((sec) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                className={activeSection === sec.id ? styles.active : ""}
              >
                {sec.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.blogWrapper}>
        <div className={styles.blogInner}>
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <span className={styles.heroBadge}>Industrial Shredding Solutions</span>

              <h1 className={styles.heroTitle}>
                Why Industries Use Industrial Primary Shredders for Efficient Waste Management
              </h1>

              <p className={styles.heroDescription}>
                Discover how primary shredders reduce waste volume, improve recycling,
                lower transport costs, and support sustainability goals.
              </p>

              <div className={styles.heroButtons}>
                <a href="#benefits" className={styles.primaryBtn}>
                  Explore Benefits
                </a>

                <a href="#faqs" className={styles.secondaryBtn}>
                  Read FAQs
                </a>
              </div>
            </div>

            <div className={styles.heroImageWrapper}>
              <img
                src={BlogImg1}
                alt="Industrial primary shredder"
                className={styles.heroImage}
              />
            </div>
          </div>

          {/* introduction */}
          <section id="introduction" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg1} alt="Industrial primary shredders" />
                <span>Industrial Primary Shredders in action</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Introduction</span>
                <h2>Efficient Waste Handling for Modern Industries</h2>
                <p>
                  Industrial Primary Shredders are essential machines for converting bulky waste and scrap materials into smaller, manageable pieces.
                </p>
                <p>
                  They help industries maintain operational efficiency, reduce clutter, improve safety, and support recycling initiatives.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section id="benefits" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Benefits</span>
              <h2>Why Industries Prefer Primary Shredders</h2>
            </div>

            <div className={styles.benefitsGrid}>
              {benefitsData.map((item, index) => (
                <div key={index} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Importance of Industrial Primary Shredders in Manufacturing and Recycling */}
          <section id="importance" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Importance of Industrial Primary Shredders in Manufacturing and Recycling</span>
              </div>
            </div>
            <p>
              Primary Shredders are critical for reducing waste volume, improving workflow, and preparing materials for recycling.
              They ensure compliance with environmental regulations and reduce handling risks, making them indispensable in modern industrial operations.
            </p>
          </section>

          {/* Types of Industrial Primary Shredders and Their Applications */}
          <section id="types" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Types of Industrial Primary Shredders and Their Applications</span>
              </div>
            </div>
            <p>
              <b>Single-Shaft Primary Shredders:</b> Ideal for medium-sized materials and consistent output for recycling.
            </p>
            <p><b>Dual-Shaft Primary Shredders:</b> Handle heavy-duty shredding for tyres, plastics, and metals with higher throughput.</p>
            <p><b>Granulators: </b>Reduce shredded material into small granules suitable for resale or recycling.</p>
            <p><b>High-Speed Rotary Primary Shredders: </b>Efficient for paper, cardboard, and lightweight plastic waste.</p>

          </section>

          {/* Workflow, Storage, and Space Optimization */}
          <section id="workflow" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Workflow, Storage, and Space Optimization</span>
              </div>
            </div>
            <p> Shredded materials are compact, uniform, and easy to store. This improves workflow, reduces bottlenecks, and optimizes warehouse space for better productivity.</p>
          </section>

          {/* operation */}
          <section id="operation" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={shred1} alt="Shredder process" />
                <span>Shredding scrap materials for optimized handling</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>How It Works</span>
                <h2>Understanding the Shredding Process</h2>
                <p>
                  Materials are fed into the shredder where rotating cutters
                  reduce them into smaller pieces.
                </p>
                <p>
                  The processed materials become easier to transport, sort, and recycle.
                </p>
              </div>
            </div>
          </section>

          {/* process */}
          <section id="process" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Working Process</span>
              <h2>Step-by-Step Shredding Process</h2>
            </div>

            <div className={styles.processGrid}>
              {processSteps.map((item, index) => (
                <div key={index} className={styles.processCard}>
                  <div className={styles.processNumber}>{item.step}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* cost */}
          <section id="cost" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Savings</span>
              <h2>Cost Reduction & Efficiency</h2>
            </div>
            <p>Uniformly shredded materials minimize transport trips and maximize container usage. This leads to lower fuel and labor
              costs while simplifying logistics and material handling.</p>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>60%</h3>
                <p>Reduction in waste volume</p>
              </div>

              <div className={styles.statCard}>
                <h3>35%</h3>
                <p>Lower logistics and transport costs</p>
              </div>

              <div className={styles.statCard}>
                <h3>50%</h3>
                <p>Improvement in storage efficiency</p>
              </div>
            </div>
          </section>

          {/* safety */}
          <section id="safety" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Safety Features and Advantages</span>
              <h2>Safety Features and Advantages</h2>
            </div>
            <p>Modern Primary Shredders include interlocks, emergency stops, overload protection,
              and protective enclosures. Reducing clutter and organizing waste helps prevent workplace accidents and injuries.</p>
          </section>

          {/* Sustainability & Recycling */}
          <section id="sustainability" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Sustainability & Recycling</span>
              <h2>Sustainability & Recycling</h2>
            </div>
            <p>Shredded materials are easier to recycle, supporting environmental initiatives and reducing landfill dependency.
              Proper material processing enhances recycling quality and promotes eco-friendly practices.</p>
          </section>

          {/* Automation and Integration */}
          <section id="automation" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Automation and Integration</span>
              <h2>Automation and Integration</h2>
            </div>
            <p>Modern Primary Shredders integrate with conveyors, sensors, and sorting systems for automated material handling.
               Real-time monitoring and predictive maintenance reduce labor, downtime, and operational costs.</p>
          </section>

          {/* Long-Term Benefits*/}
          <section id="long-term" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Long-Term Benefits</span>
              <h2>Long-Term Benefits</h2>
            </div>
            <ul className={styles.modernList}>
              <li> Reduced operational costs over time</li>
              <li> Improved workflow and productivity </li>
              <li> Enhanced safety and compliance</li>
              <li>Supports recycling and sustainability goals</li>
              <li>Maximizes resale or reuse value of materials   </li>
            </ul>
          </section>

          {/* conclusion */}
          <section id="conclusion" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg4} alt="Processed shredded materials" />
                <span>Processed materials ready for recycling</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Conclusion</span>
                <h2>Final Thoughts</h2>
                <p>
                  Industrial Primary Shredders are essential for efficient waste management, optimized workflow, and sustainable practices.
                </p>
                <p>
                  Investing in Primary Shredders ensures operational efficiency, safety, and long-term ROI.
                </p>
              </div>
            </div>
          </section>

          {/* faqs */}
          <section id="faqs" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>FAQs</span>
              <h2>Frequently Asked Questions</h2>
            </div>

            <div className={styles.faqContainer}>
              {faqsData.map((faq, index) => (
                <div
                  key={index}
                  className={`${styles.faqItem} ${openFAQ === index ? styles.activeFAQ : ""
                    }`}
                >
                  <div
                    className={styles.faqQuestion}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    <span className={styles.faqIcon}>
                      {openFAQ === index ? "−" : "+"}
                    </span>
                  </div>

                  <div className={styles.faqAnswerWrapper}>
                    <div className={styles.faqAnswer}>{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <aside className={styles.relatedSidebar}>
        <h3 className={styles.relatedTitle}>Related Pages</h3>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <Link to="/primary-shredder">Industrial Primary Shredders →</Link>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <Link to="/tyreshredder">Tyre Shredder →</Link>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <Link to="/plasticshredder">Plastic Primary Shredders →</Link>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <Link to="/papershredder">PCB Primary Shredders →</Link>
        </div>
      </aside>
    </div>
  );
};

export default ShredderBlog1;
