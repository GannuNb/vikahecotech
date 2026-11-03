import React, { useState, useEffect } from "react";
import styles from "./Blog.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Images
import BlogImg1 from "../../images/Applications/app13.jpg";
import BlogImg2 from "../../images/Applications/app12.jpg";
import BlogImg3 from "../../images/Applications/pss1.png";

const faqsData = [
  {
    question: "What types of tyre scrap can be processed?",
    answer:
      "Tyre balers efficiently compress shredded tyres, mixed rubber, and industrial tyre scrap into compact, manageable bales.",
  },
  {
    question: "Is it safe to operate for beginners?",
    answer:
      "Yes, tyre balers are designed with safety in mind, including emergency stops, interlocks, and protective mechanisms.",
  },
  {
    question: "Does it save operational costs?",
    answer:
      "Absolutely. By compressing tyre scrap into uniform bales, storage, handling, and transport costs are significantly reduced.",
  },
  {
    question: "How does it improve workflow?",
    answer:
      "Baled tyre scrap reduces clutter, frees up floor space, and allows for faster and more organized material handling.",
  },
];

const benefitsData = [
  {
    title: "Space Optimization",
    icon: "📦",
    text: "Compact bales reduce clutter and free up valuable floor space.",
  },
  {
    title: "Lower Costs",
    icon: "💰",
    text: "Cuts labour, storage, handling, and transport expenses.",
  },
  {
    title: "Improved Safety",
    icon: "🛡️",
    text: "Keeps facilities safer by reducing loose tyre scrap hazards.",
  },
  {
    title: "Better Productivity",
    icon: "⚙️",
    text: "Improves workflow, organization, and overall efficiency.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Load Tyre Scrap",
    text: "Operators feed shredded tyres and rubber scrap into the baler chamber.",
  },
  {
    step: "02",
    title: "Hydraulic Compression",
    text: "The baler compresses the scrap into dense, uniform blocks.",
  },
  {
    step: "03",
    title: "Secure Bale",
    text: "Bales are tied with straps or wires for secure storage and handling.",
  },
  {
    step: "04",
    title: "Transport or Store",
    text: "Finished bales are stored efficiently or moved for recycling.",
  },
];

const BalerBlog3 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "why-use", title: "Why Use Tyre Balers" },
    { id: "how-it-works", title: "How Tyre Balers Work" },
    { id: "process", title: "Working Process" },
    { id: "efficiency", title: "Efficiency & Productivity" },
    { id: "space-management", title: "Space Management" },
    { id: "cost-benefits", title: "Cost Benefits" },
    { id: "safety", title: "Safety Features" },
    { id: "sustainability", title: "Sustainability" },
    { id: "operation", title: "Ease of Operation" },
    { id: "long-term", title: "Long-Term Benefits" },
    { id: "why-us", title: "Why Choose Us" },
    { id: "conclusion", title: "Final Thoughts" },
    { id: "key-takeaways", title: "Key Takeaways" },
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
          Tyre Scrap Balers for Efficient Industrial Recycling | Vikah Ecotech
        </title>

        <meta
          name="description"
          content="Discover how tyre balers help industries manage tyre scrap efficiently, reduce costs, save space, and streamline recycling operations in India."
        />

        <meta
          name="keywords"
          content="tyre balers, tyre scrap baling machines, industrial tyre recycling, tyre scrap management, tyre waste compaction, tyre balers India"
        />

        <link
          rel="canonical"
          href="https://vikahecotech.com/tyre-balers-machine"
        />

        <meta
          property="og:title"
          content="Industrial Tyre Scrap Balers for Recycling & Waste Management"
        />

        <meta
          property="og:description"
          content="Learn how tyre balers transform tyre scrap into compact bales, improving operational efficiency, storage, transport, and safety for industries."
        />

        <meta property="og:type" content="article" />

        <meta
          property="og:url"
          content="https://vikahecotech.com/tyre-balers-machines"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Industrial Tyre Scrap Balers for Efficient Operations",
              description:
                "This article explains how tyre balers improve scrap management, operational efficiency, safety, and sustainability in industrial facilities.",
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
                "@id": "https://vikahecotech.com/tyre-balers-machine",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What types of tyre scrap can be processed?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tyre balers can efficiently handle shredded tyres, mixed rubber, and industrial tyre scrap, turning them into uniform bales.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is it safe to operate for beginners?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, tyre balers include emergency stops, interlocks, and protective features for operator safety.",
                  },
                },
              ],
            }),
          }}
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
              <span className={styles.heroBadge}>Industrial Tyre Recycling</span>

              <h1 className={styles.heroTitle}>
                How Tyre Balers Transform Industrial Waste Management
              </h1>

              <p className={styles.heroDescription}>
                Discover how tyre balers improve storage, reduce costs, enhance
                workflow, and make industrial recycling more efficient.
              </p>
            </div>

            <div className={styles.heroImageWrapper}>
              <img
                src={BlogImg1}
                alt="Tyre baler in industrial facility"
                className={styles.heroImage}
              />
            </div>
          </div>

          {/* INTRODUCTION */}
          <section id="introduction" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Introduction</span>
              <h2>Efficient tyre scrap handling</h2>
            </div>

            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg1} alt="Compact tyre baler" />
                <span>Compact tyre baler in action</span>
              </div>

              <div className={styles.textCard}>
                <p>
                  Industrial facilities generate significant tyre scrap, which can create storage and workflow challenges.
                  Tyre balers efficiently compress shredded tyres and mixed rubber into compact bales, reducing clutter and optimizing storage.
                </p>

                <p>
                  With proper implementation, tyre balers streamline recycling, improve transport efficiency, and ensure compliance with environmental
                  regulations. Manufacturing, recycling, and logistics facilities across India benefit from these machines for smoother operations.
                </p>
              </div>
            </div>
          </section>

          <section id="why-use" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Benefits</span>
              <h2>Why Industries Use Tyre Balers</h2>
            </div>
            <p>Tyre balers turn loose tyre scrap into standardized bales, simplifying handling, storage, and transport. This reduces manual labor,
              improves safety, and enhances overall operational productivity.</p>
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

          <section id="how-it-works" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg2} alt="Tyre baler process" />
                <span>Baling process in progress</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Technology</span>
                <h2>How Tyre Balers Work</h2>
                <p>
                  Operators feed tyre scrap into the baler, which compresses it into dense bales. Straps or wires secure the bales for storage or transport.
                  Advanced machines may include sensors and automation to ensure consistent bale size and quality.
                </p>
                <p>
                  Compacted bales reduce volume by up to 70%, freeing up floor space and optimizing logistics. This also improves resale value for recyclers
                  and facilitates compliance with industrial recycling standards.
                </p>
              </div>
            </div>
          </section>

          <section id="process" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Working Process</span>
              <h2>Step-by-Step Tyre Baling Process</h2>
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

          <section id="efficiency" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Efficiency & Productivity</span>
            </div>
            <p>Baled tyre scrap increases efficiency by reducing manual handling, speeding up processing, and enabling facilities to manage more scrap with fewer resources.</p>
            <div className={styles.highlightBox}>
              <strong>Tip:</strong> Integrating tyre balers with workflow planning maximizes productivity and minimizes downtime.
            </div>
          </section>

          <section id="space-management" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Space & Workflow Management</span>
            </div>
            <p>Compact bales occupy less space, improve material flow, and reduce hazards. Organized storage allows staff to focus on production
              instead of handling loose tyre scrap.</p>
          </section>

          <section id="cost-benefits" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Savings</span>
              <h2>Cost & Transport Benefits</h2>
            </div>
            <p>Reducing transport trips through compact bales saves fuel, labor, and equipment costs. Standardized bales simplify loading, unloading, and logistics, providing measurable operational savings.</p>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>70%</h3>
                <p>Reduction in tyre scrap volume</p>
              </div>

              <div className={styles.statCard}>
                <h3>40%</h3>
                <p>Lower transport and handling costs</p>
              </div>

              <div className={styles.statCard}>
                <h3>60%</h3>
                <p>Improvement in storage efficiency</p>
              </div>
            </div>
          </section>

          <section id="safety" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Safety Features</span>
            </div>
            <p>Tyre balers reduce workplace hazards by keeping scrap organized. Emergency stops, interlocks, and protective mechanisms ensure safe operation.</p>
          </section>

          <section id="sustainability" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Sustainability</span>
            </div>
            <p> Compressed tyre scrap is easier to recycle, reduces landfill dependence, and supports environmental responsibility. This aligns with CSR initiatives
              and promotes circular economy practices.</p>
          </section>


          <section id="operation" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Ease of Operation</span>
            </div>
            <p>Tyre balers are user-friendly, requiring minimal training. Automation and safety systems ensure reliable operation, while predictive maintenance
              features prevent downtime.</p>
          </section>


          {/* Long-Term Benefits*/}
          <section id="long-term" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Long-Term Benefits</span>
              <h2>Long-Term Benefits</h2>
            </div>
            <ul className={styles.modernList}>
              <li> Lower labor and operational costs</li>
              <li> Optimized workflow and efficiency </li>
              <li>Enhanced safety and compliance</li>
              <li>Increased resale value of tyre scrap </li>
              <li>Supports sustainability and CSR goals </li>
            </ul>
          </section>


          {/* Why Choose Vikah Ecotech */}
          <section id="why-us" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Why Choose Vikah Ecotech</span>
              <h2>Why Choose Vikah Ecotech</h2>
            </div>
            <p>Our tyre balers are reliable, efficient, and supported by expert service. We offer solutions for facilities of all sizes, ensuring consistent performance and long-term value.</p>
          </section>

          <section id="conclusion" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg3} alt="Tyre scrap bales" />
                <span>Ready-to-transport tyre scrap bales</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Conclusion</span>
                <h2>Final Thoughts</h2>
                <p>
                  Tyre balers are essential for efficient waste management, operational flow, and sustainability. Investing in high-quality balers provides measurable 
                  long-term benefits for industrial operations.
                </p>
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

export default BalerBlog3;