import React, { useState, useEffect } from "react";
import styles from "./Blog.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Images
import BlogImg1 from "../../images/Applications/app13.jpg";
import BlogImg2 from "../../images/Applications/app12.jpg";
import BlogImg4 from "../../images/Applications/pss1.png";

const faqsData = [
  {
    question: "Can tyre balers handle all types of tyre scrap?",
    answer:
      "Yes, tyre balers efficiently process shredded tyres, mixed rubber, and industrial tyre scrap into compact, manageable bales.",
  },
  {
    question: "Do tyre balers require trained operators?",
    answer:
      "Basic training is sufficient for safe operation, as most tyre balers are user-friendly and equipped with safety mechanisms.",
  },
  {
    question: "How do tyre balers help reduce costs?",
    answer:
      "By compressing tyre scrap into compact bales, tyre balers reduce storage, handling, and transportation expenses significantly.",
  },
  {
    question: "Are tyre balers environmentally friendly?",
    answer:
      "Absolutely. Baling tyre scrap improves recyclability, reduces landfill waste, and supports sustainable industrial practices.",
  },
];

const benefitsData = [
  {
    title: "Space Saving",
    icon: "📦",
    text: "Reduces loose tyre scrap and frees up valuable floor space.",
  },
  {
    title: "Lower Costs",
    icon: "💰",
    text: "Cuts storage, handling, transport, and labour expenses.",
  },
  {
    title: "Safer Workplace",
    icon: "🛡️",
    text: "Keeps workspaces cleaner and reduces workplace hazards.",
  },
  {
    title: "Better Recycling",
    icon: "♻️",
    text: "Improves tyre scrap handling and recycling efficiency.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Load Scrap",
    text: "Feed tyre scrap and rubber waste into the baler chamber.",
  },
  {
    step: "02",
    title: "Compress Material",
    text: "Hydraulic pressure compacts the tyre scrap into dense bales.",
  },
  {
    step: "03",
    title: "Tie & Secure",
    text: "The bale is tied using straps or steel wires for stability.",
  },
  {
    step: "04",
    title: "Store or Transport",
    text: "Compact bales are moved for storage, resale, or recycling.",
  },
];

const BalerBlog4 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "importance", title: "Importance of Tyre Balers" },
    { id: "operation", title: "How Tyre Balers Operate" },
    { id: "process", title: "Working Process" },
    { id: "workflow", title: "Workflow Optimization" },
    { id: "cost", title: "Cost Efficiency" },
    { id: "safety", title: "Safety Advantages" },
    { id: "sustainability", title: "Sustainability" },
    { id: "maintenance", title: "Maintenance" },
    { id: "long-term", title: "Long-Term Impact" },
    { id: "why-us", title: "Why Choose Us" },
    { id: "conclusion", title: "Final Thoughts" },
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
        {/* SEO Title */}
        <title>
          Tyre Bailing Machines for Tyre scrap Management & Recycling | Vikah
          Ecotech
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Explore how tyre baling machines optimize scrap tyre management by reducing volume, improving handling efficiency, cutting transport costs, and supporting sustainable tyre recycling."
        />

        {/* Keywords (clean & safe) */}
        <meta
          name="keywords"
          content="tyre baling machines, baler for tyres, scrap tyre baler, tyre recycling baler, hydraulic tyre baler india, waste tyre management"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://vikahecotech.com/baler-for-tyres" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Tyre Baling Machines for Efficient Scrap Tyre Management"
        />
        <meta
          property="og:description"
          content="Learn how tyre baling machines help industries compress, store, and recycle scrap tyres efficiently while reducing costs and improving sustainability."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://vikahecotech.com/baler-for-tyres"
        />

        {/* Article Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Optimizing Tyre Scrap Management with Efficient Tyre Balers",
            description:
              "This article explains how tyre baling machines improve scrap tyre handling through efficient compaction, space optimization, cost reduction, and environmentally responsible recycling.",
            author: {
              "@type": "Organization",
              name: "Vikah Ecotech",
            },
            publisher: {
              "@type": "Organization",
              name: "Vikah Ecotech",
              logo: {
                "@type": "ImageObject",
                url: "https://vikahecotech.com/logo_vk.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://vikahecotech.com/baler-for-tyres",
            },
          })}
        </script>

        {/* FAQ Structured Data (matches your FAQs exactly) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Can tyre balers handle all types of tyre scrap?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, tyre balers efficiently process shredded tyres, mixed rubber, and industrial tyre scrap into compact, manageable bales.",
                },
              },
              {
                "@type": "Question",
                name: "Do tyre balers require trained operators?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Basic training is sufficient for safe operation, as most tyre balers are user-friendly and equipped with safety mechanisms.",
                },
              },
              {
                "@type": "Question",
                name: "How do tyre balers help reduce costs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "By compressing tyre scrap into compact bales, tyre balers significantly reduce storage, handling, and transportation costs.",
                },
              },
              {
                "@type": "Question",
                name: "Are tyre balers environmentally friendly?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Tyre balers improve recyclability, reduce landfill dependency, and support sustainable tyre waste management practices.",
                },
              },
            ],
          })}
        </script>
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
              <span className={styles.heroBadge}>Tyre Scrap Management</span>

              <h1 className={styles.heroTitle}>
                Optimizing Tyre Scrap Management with Efficient Tyre Balers
              </h1>

              <p className={styles.heroDescription}>
                Discover how tyre balers reduce storage costs, improve workflow,
                and create safer, more organized industrial facilities.
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
                alt="Tyre Balers in Industrial Facility"
                className={styles.heroImage}
              />
            </div>
          </div>

          {/* INTRODUCTION */}
          <section id="introduction" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Introduction</span>
              <h2>Industrial Waste Requires Smarter Management</h2>
            </div>

            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg1} alt="Compact tyre baler" />
                <span>Efficient tyre scrap handling in industrial facilities</span>
              </div>

              <div className={styles.textCard}>
                <p>
                  Industrial facilities generate large volumes of tyre scrap daily. Managing this efficiently is crucial for
                  operational flow, safety, and cost savings. Tyre balers provide a reliable solution by compressing tyres
                  and rubber scrap into compact, manageable bales.
                </p>

                <p>
                  By implementing tyre balers, facilities can streamline recycling processes, optimize storage, and reduce
                  transportation costs while maintaining compliance with environmental standards.
                </p>

              </div>
            </div>
          </section>

          <section id="importance" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Benefits</span>
              <h2>Why Industries Prefer Tyre Balers</h2>
            </div>
            <p>Tyre balers transform loose tyre scrap into standardized bales, improving space utilization and workflow efficiency.
              This ensures safer, cleaner, and more organized industrial environments.</p>
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

          {/* Operation */}
          <section id="operation" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg2} alt="Tyre balers in operation" />
                <span>Compression and baling of tyre scrap</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Operation</span>
                <h2>How Tyre Balers Operate</h2>
                <p>
                  Operators feed shredded tyres or mixed rubber into the baler, which compresses
                  the material into dense, uniform bales. Straps or wires secure each bale for storage or transport.
                </p>
                <p>
                  Advanced tyre balers may include automation and monitoring features to ensure consistent results.
                </p>
              </div>
            </div>
          </section>

          {/* Working Process */}
          <section id="process" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Working Process</span>
              <h2>Step-by-Step Baling Process</h2>
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

          {/* Workflow & Space Optimization */}
          <section id="workflow" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Workflow & Space Optimization</span>
            </div>
            <p>Compact bales occupy significantly less space, allowing better utilization of factory floors and storage areas. Organized bales reduce clutter,
              prevent bottlenecks, and improve overall workflow efficiency.</p>            <div className={styles.highlightBox}>
              <strong>Tip:</strong> Stack tyre bales carefully to maximize vertical space while maintaining safe access paths for equipment and personnel.
            </div>
          </section>

          {/* Cost Savings */}
          <section id="cost" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Cost Savings</span>
              <h2>Cost & Transport Efficiency</h2>
            </div>
            <p>By reducing the number of transport trips required, tyre balers save fuel, labor, and equipment costs. Standardized bales simplify
              logistics planning, loading, and unloading operations, providing measurable cost savings.</p>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>70%</h3>
                <p>Reduction in tyre scrap volume</p>
              </div>

              <div className={styles.statCard}>
                <h3>40%</h3>
                <p>Lower transport expenses</p>
              </div>

              <div className={styles.statCard}>
                <h3>60%</h3>
                <p>Improvement in storage efficiency</p>
              </div>
            </div>
          </section>

          {/* Safety Advantages */}
          <section id="safety" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Safety Advantages</span>
            </div>
            <p>Tyre balers maintain clean and organized workplaces, reducing hazards such as slips and trips.
              Safety features like emergency stops and interlocks ensure operators remain protected during operation.</p>
          </section>

          {/* Sustainability & Recycling */}
          <section id="sustainability" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Sustainability & Recycling</span>
            </div>
            <p>Baled tyre scrap is easier to recycle, reduces landfill dependency, and supports environmental responsibility.
              Using tyre balers aligns facilities with circular economy practices and sustainability goals.</p>
          </section>

          {/* Maintenance & Reliability */}
          <section id="maintenance" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Maintenance & Reliability</span>
            </div>
            <p>Tyre balers are designed for durability and minimal maintenance. Predictive maintenance alerts and robust components
              ensure reliable operations and reduce unplanned downtime.</p>
          </section>

          {/* Long-Term Benefits*/}
          <section id="long-term" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Long-Term Benefits</span>
              <h2>Long-Term Benefits</h2>
            </div>
            <ul className={styles.modernList}>
              <li> Reduces operational costs over time</li>
              <li> Enhances workflow efficiency and productivity</li>
              <li> Improves safety and compliance</li>
              <li>Maximizes resale value of tyre scrap </li>
              <li>Supports sustainability and environmental goals </li>
            </ul>
          </section>

          {/* Why Choose Vikah Ecotech */}
          <section id="why-us" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Why Choose Vikah Ecotech</span>
              <h2>Why Choose Vikah Ecotech</h2>
            </div>
            <p>Our tyre balers are reliable, efficient, and backed by expert support.
              We offer solutions for facilities of all sizes, ensuring long-term operational benefits and high-quality performance.</p>
          </section>

          {/* CONCLUSION */}
          <section id="conclusion" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg4} alt="Optimized tyre bales" />
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Conclusion</span>
                <h2>Final Thoughts</h2>
                <p>Tyre balers are a vital investment for companies looking to optimize waste management,
                  reduce costs, and improve operational efficiency. By compressing tyre scrap into compact bales,
                  facilities achieve safer, organized, and more sustainable workflows.</p>

                <a href="#faqs" className={styles.primaryBtn}>
                  Learn More
                </a>
              </div>
            </div>
          </section>

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
          <Link to="/tyre-scrap-balers">Tyre Scrap Balers →</Link>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <Link to="/plasticbaler">Plastic Balers →</Link>
        </div>
      </aside>
    </div>
  );
};

export default BalerBlog4;
