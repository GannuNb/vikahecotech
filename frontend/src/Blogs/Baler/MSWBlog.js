import React, { useState, useEffect } from "react";
import styles from "./Blog.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Images
import MSW1 from "../../images/Applications/plasticbaler1.jpg";
import MSW2 from "../../images/Applications/pcb1.webp";
import MSW3 from "../../images/Applications/pcb3.webp";

const faqsData = [
  {
    question: "What is municipal solid waste management?",
    answer:
      "Municipal Solid Waste Management (MSWM) refers to the systematic collection, segregation, processing, recycling, and disposal of waste generated from households, industries, and commercial establishments.",
  },
  {
    question: "Why are shredders important in waste management?",
    answer:
      "Shredders reduce waste size, improve sorting efficiency, and enhance recycling output by preparing materials for further processing.",
  },
  {
    question: "How do balers help in recycling?",
    answer:
      "Balers compress waste into compact bales, reducing storage space and lowering transportation costs significantly.",
  },
  {
    question: "Can MSWM reduce environmental pollution?",
    answer:
      "Yes, proper waste management reduces landfill waste, minimizes pollution, and supports sustainable environmental practices.",
  },
];

const benefitsData = [
  {
    title: "Better Recycling",
    icon: "♻️",
    text: "Improves sorting, segregation, and recycling output efficiently.",
  },
  {
    title: "Lower Costs",
    icon: "💰",
    text: "Reduces labor, transport, and waste handling expenses.",
  },
  {
    title: "Less Space Usage",
    icon: "📦",
    text: "Compacted waste takes up far less storage space.",
  },
  {
    title: "Cleaner Environment",
    icon: "🌍",
    text: "Reduces pollution and landfill dependency significantly.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Collection",
    text: "Waste is collected from households, industries, and commercial facilities.",
  },
  {
    step: "02",
    title: "Segregation",
    text: "Waste is separated into recyclable, biodegradable, and non-recyclable categories.",
  },
  {
    step: "03",
    title: "Shredding & Baling",
    text: "Machines reduce waste size and compress it into manageable bales.",
  },
  {
    step: "04",
    title: "Recycling & Disposal",
    text: "Reusable materials are recovered while the remaining waste is safely disposed.",
  },
];

const MSWBlog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "benefits", title: "Key Benefits" },
    { id: "challenge", title: "MSW Challenges" },
    { id: "types", title: "Types of Waste" },
    { id: "process", title: "Waste Management Process" },
    { id: "equipment", title: "Balers & Shredders" },
    { id: "space", title: "Space Management" },
    { id: "cost", title: "Cost Optimization" },
    { id: "value", title: "Recycling Value" },
    { id: "safety", title: "Safety & Compliance" },
    { id: "sustainability", title: "Sustainability" },
    { id: "why-us", title: "Why Vikah Ecotech" },
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
          Municipal Solid Waste Management in India | Balers & Shredders for Recycling | Vikah Ecotech
        </title>

        <meta
          name="description"
          content="Explore municipal solid waste management in India using advanced balers and shredders. Improve recycling efficiency, reduce operational costs, and achieve sustainable waste management solutions."
        />

        <meta
          name="keywords"
          content="municipal solid waste management India, MSW recycling solutions, industrial balers and shredders, waste recycling machines India, solid waste management equipment, recycling machinery India"
        />

        <link
          rel="canonical"
          href="https://vikahecotech.com/munipical-waste-management"
        />

        <meta
          property="og:title"
          content="Municipal Solid Waste Management with Balers & Shredders | Vikah Ecotech"
        />

        <meta
          property="og:description"
          content="Discover how balers and shredders improve municipal solid waste management, recycling efficiency, and sustainability across industries in India."
        />

        <meta property="og:type" content="article" />

        <meta
          property="og:url"
          content="https://vikahecotech.com/munipical-waste-management"
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
              <span className={styles.heroBadge}>Municipal Waste Management</span>

              <h1 className={styles.heroTitle}>
                Municipal Solid Waste Management Through Recycling Solutions:
                Balers & Shredders in India
              </h1>

              <p className={styles.heroDescription}>
                Learn how balers and shredders improve recycling efficiency,
                reduce waste volume, and support sustainable municipal solid
                waste management.
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
                src={MSW1}
                alt="Municipal Solid Waste Management"
                className={styles.heroImage}
              />
            </div>
          </div>

          {/* introduction */}
          <section id="introduction" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={MSW1} alt="MSW India" />
                <span>Efficient municipal waste management system</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Introduction</span>
                <h2>Managing Growing Waste Volumes</h2>
                <p>
                  Municipal Solid Waste Management (MSWM) is one of the most critical aspects of modern urban infrastructure.
                  With increasing population and industrial growth in India, the volume of waste generated has grown exponentially,
                  making efficient waste handling a necessity.
                </p>
                <p>
                  Traditional disposal methods such as dumping and landfilling are no longer viable.
                  Instead, modern systems emphasize segregation, recycling, and recovery using advanced technologies.
                </p>
                <p>
                  Recycling machinery such as balers and shredders plays a vital role in converting waste into reusable
                  materials, reducing landfill dependency and improving operational efficiency.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section id="benefits" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Benefits</span>
              <h2>Why Modern MSW Systems Matter</h2>
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

          {/* Challenges */}
          <section id="challenge" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Challenges</span>
                <h2>Challenges in MSW Management</h2>
                <p>Waste management systems in India face multiple operational and environmental challenges that impact efficiency and sustainability.</p>
                <ul className={styles.modernList}>
                  <li>Improper segregation of waste at source</li>
                  <li>Overflowing landfills and pollution</li>
                  <li>High logistics and transport costs</li>
                  <li>Health hazards and environmental damage</li>
                </ul>
              </div>

              <div className={styles.imageCard}>
                <img src={MSW2} alt="MSW Challenges" />
                <span>Improper waste handling creates major challenges</span>
              </div>
            </div>
          </section>

          {/* Types of Waste */}
          <section id="types" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Types of Waste</span>
                <h2>Types of Waste</h2>
                <p> Municipal waste consists of biodegradable waste, recyclable materials such as plastic and paper, and non-recyclable residues.</p>
                <p>Proper classification ensures efficient recycling and reduces contamination in processing facilities.</p>
              </div>

              <div className={styles.imageCard}>
                <img src={MSW2} alt="MSW Challenges" />
                <span>Improper waste handling creates major challenges</span>
              </div>
            </div>
          </section>

          {/* Process */}
          <section id="process" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Process</span>
              <h2>Waste Management Process</h2>
            </div>
            <p>The MSW process includes collection, segregation, shredding, baling, recycling, and disposal. Each stage plays a crucial role in ensuring efficient waste handling and material recovery.</p>
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

          {/* Equipment */}
          <section id="equipment" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={MSW3} alt="Balers and shredders" />
                <span>Balers and shredders improve waste recycling</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Equipment</span>
                <h2>Role of Balers & Shredders</h2>
                <p>
                  Shredders reduce waste size for easier processing, while balers compress materials into compact bales for storage and transport.
                </p>
                <p>
                  Together, these machines improve recycling efficiency, reduce manual labor, and optimize operational workflows.
                </p>
              </div>
            </div>
          </section>

          {/* Space Management */}
          <section id="space" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Space Management</span>
                <h2>Space Management</h2>
              </div>
            </div>
            <p>
              Compacted waste occupies significantly less space, allowing better warehouse organization and improved safety. </p>
          </section>

          {/* Cost Savings */}
          <section id="cost" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Cost Savings</span>
              <h2>Cost Optimization & Efficiency</h2>
            </div>
            <p>Reduced waste volume leads to fewer transport trips, lowering fuel and operational costs.</p>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>50%</h3>
                <p>Reduction in transport trips</p>
              </div>

              <div className={styles.statCard}>
                <h3>60%</h3>
                <p>Improvement in storage efficiency</p>
              </div>

              <div className={styles.statCard}>
                <h3>40%</h3>
                <p>Lower waste handling costs</p>
              </div>
            </div>
          </section>

          {/* Cost Optimization */}
          <section id="cost" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Cost Optimization</span>
                <h2>Cost Optimization</h2>
              </div>
            </div>
            <p>
              Reduced waste volume leads to fewer transport trips, lowering fuel and operational costs. </p>
          </section>

          {/* Recycling Value */}
          <section id="value" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Recycling Value</span>
                <h2>Recycling Value</h2>
              </div>
            </div>
            <p>
              Properly processed waste increases resale value and supports a circular economy. </p>
          </section>

          {/* Safety & Compliance */}
          <section id="safety" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Safety & Compliance</span>
                <h2>Safety & Compliance</h2>
              </div>
            </div>
            <p>
              Organized waste management improves safety and ensures compliance with environmental regulations.</p>
          </section>

          {/* Sustainability */}
          <section id="sustainability" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Sustainability</span>
                <h2>Sustainability</h2>
              </div>
            </div>
            <p>
              Recycling reduces landfill dependency and supports environmental sustainability goals.</p>
          </section>

          {/* Why Vikah Ecotech */}
          <section id="why-us" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Why Vikah Ecotech</span>
                <h2>Why Vikah Ecotech</h2>
              </div>
            </div>
            <p>
              Vikah Ecotech provides reliable recycling machinery designed for modern waste management needs.</p>
          </section>

          {/* CONCLUSION */}
          <section id="conclusion" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={MSW1} alt="Optimized tyre bales" />
                <span>Optimized tyre scrap bales ready for transport</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Conclusion</span>
                <h2>Final Thoughts</h2>
                <p>
                  MSW management requires advanced solutions like balers and shredders to ensure efficiency, sustainability, and cost savings.  </p>

                <a href="#faqs" className={styles.primaryBtn}>
                  Learn More
                </a>
              </div>
            </div>
          </section>

          {/* FAQs */}
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
          <Link to="/balers">Industrial Balers →</Link>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <Link to="/primary-shredder-waste-management">
            Primary Shredders →
          </Link>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <Link to="/secondaryshredder-blog2">
            Secondary Shredders →
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default MSWBlog;
