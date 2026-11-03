import React, { useState, useEffect } from "react";
import styles from "../Baler/Blog.module.css";
import { Helmet } from "react-helmet";

// Images
import Plant1 from "../../images/Applications/plasticbaler1.jpg";
import Plant2 from "../../images/Applications/plasticbaler2.jpg";
import Tyre1 from "../../images/Applications/pcb1.webp";
import Tyre2 from "../../images/Applications/pcb3.webp";

const faqsData = [
  {
    question:
      "Who are the leading tyre scrap recycling plant manufacturers in India?",
    answer:
      "Companies like Vikah Ecotech and several specialized recycling equipment manufacturers provide complete tyre scrap recycling plants with shredders, crushers, pyrolysis systems, balers, and conveyors.",
  },
  {
    question: "What machinery is included in a tyre scrap recycling plant?",
    answer:
      "A full plant includes tyre shredders, crushers, rubber grinders, balers, conveyors, dust collectors, and fully automated control systems.",
  },
  {
    question: "Is tyre scrap recycling profitable in India?",
    answer:
      "Yes. Recycling plants earn through recycled rubber, pyrolysis oil, steel wires, carbon black, and government incentives.",
  },
  {
    question: "Do recycling plants require environmental approvals?",
    answer:
      "Yes. Plants must comply with CPCB guidelines, pollution board clearances, and safety/ISO standards.",
  },
];

const benefitsData = [
  {
    icon: "♻️",
    title: "Waste Reduction",
    text: "Reduce tyre waste going to landfills and illegal dumping areas.",
  },
  {
    icon: "💰",
    title: "High Profit Potential",
    text: "Earn from crumb rubber, steel wire, pyrolysis oil, and carbon black.",
  },
  {
    icon: "🏭",
    title: "Industrial Efficiency",
    text: "Automated plants improve throughput and reduce manual labor.",
  },
  {
    icon: "🌍",
    title: "Environmental Benefits",
    text: "Support sustainability and government recycling initiatives.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Tyre Collection",
    text: "Waste tyres are collected from dealers, industries, and scrap yards.",
  },
  {
    step: "02",
    title: "Shredding & Cutting",
    text: "Tyres are cut into smaller pieces for easier processing.",
  },
  {
    step: "03",
    title: "Steel Separation",
    text: "Steel wire is removed and collected for resale.",
  },
  {
    step: "04",
    title: "Final Recycling Output",
    text: "Rubber, oil, carbon black, and steel are recovered for reuse.",
  },
];

const TyreRecyclingBlog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "benefits", title: "Benefits of Tyre Recycling Plants" },
    { id: "demand", title: "Demand for Tyre Recycling Plants in India" },
    { id: "process", title: "How Tyre Scrap Recycling Plants Work" },
    { id: "machinery", title: "Core Machinery in a Recycling Plant" },
    {
      id: "manufacturers",
      title: "Top Tyre Scrap Recycling Plant Manufacturers",
    },
    { id: "cost", title: "Cost of Setting Up a Plant" },
    { id: "compliance", title: "Government Policies & Compliance" },
    { id: "why-us", title: "Why Choose Vikah Ecotech" },
    { id: "conclusion", title: "Final Thoughts" },
    { id: "faqs", title: "Frequently Asked Questions" },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      let pos = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);

        if (el && el.offsetTop <= pos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        {/* ===== BASIC SEO ===== */}
        <title>
          Tyre Scrap Recycling Plant Manufacturers in India – Complete Guide
        </title>

        <meta
          name="description"
          content="Explore the leading tyre scrap recycling plant manufacturers in India. Learn how tyre recycling plants work, essential machinery, setup cost, profitability, and government compliance."
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Vikah Ecotech Pvt Ltd" />

        <link
          rel="canonical"
          href="https://vikahecotech.com/tyre-recycling-plant-manufacturers"
        />

        {/* ===== OPEN GRAPH (FOR SOCIAL SHARING) ===== */}
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Tyre Scrap Recycling Plant Manufacturers in India – Complete Guide"
        />
        <meta
          property="og:description"
          content="Discover top tyre scrap recycling plant manufacturers in India and explore machinery, process, cost, and compliance details."
        />
        <meta
          property="og:url"
          content="https://vikahecotech.com/tyre-recycling-plant-manufacturers"
        />
        <meta
          property="og:image"
          content="https://vikahecotech.com/images/baler_bg.png"
        />
        <meta property="og:site_name" content="Vikah Ecotech Pvt Ltd" />

        {/* ===== TWITTER CARD ===== */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Tyre Scrap Recycling Plant Manufacturers in India"
        />
        <meta
          name="twitter:description"
          content="Complete guide on tyre recycling plant manufacturers, machinery, cost, and benefits in India."
        />
        <meta
          name="twitter:image"
          content="https://vikahecotech.com/images/baler_bg.png"
        />

        {/* ===== BLOG STRUCTURED DATA ===== */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline:
              "Tyre Scrap Recycling Plant Manufacturers in India – Complete Guide",
            description:
              "A detailed guide on tyre scrap recycling plant manufacturers in India, machinery required, industrial benefits, and government compliance.",
            image: "https://vikahecotech.com/images/baler_bg.png",
            author: {
              "@type": "Organization",
              name: "Vikah Ecotech Pvt Ltd",
            },
            publisher: {
              "@type": "Organization",
              name: "Vikah Ecotech Pvt Ltd",
              logo: {
                "@type": "ImageObject",
                url: "https://vikahecotech.com/logo_vk.png",
              },
            },
            datePublished: "2026-02-20",
            dateModified: "2026-02-20",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id":
                "https://vikahecotech.com/tyre-recycling-plant-manufacturers",
            },
          })}
        </script>

        {/* ===== FAQ STRUCTURED DATA (VERY IMPORTANT FOR RICH RESULTS) ===== */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who are the leading tyre scrap recycling plant manufacturers in India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Companies like Vikah Ecotech and other specialized recycling equipment manufacturers provide complete tyre scrap recycling plants with shredders, crushers, pyrolysis systems, balers, and conveyors.",
                },
              },
              {
                "@type": "Question",
                name: "What machinery is included in a tyre scrap recycling plant?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A full plant includes tyre shredders, crushers, rubber grinders, balers, conveyors, dust collectors, and automated control systems.",
                },
              },
              {
                "@type": "Question",
                name: "Is tyre scrap recycling profitable in India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Revenue is generated through recycled rubber, pyrolysis oil, steel wires, carbon black, and government incentives.",
                },
              },
              {
                "@type": "Question",
                name: "Do recycling plants require environmental approvals?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Plants must comply with CPCB guidelines, pollution control board approvals, and safety standards.",
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
              <span className={styles.heroBadge}>
                Tyre Scrap Recycling Plants
              </span>

              <h1 className={styles.heroTitle}>
                Tyre Scrap Recycling Plant Manufacturers in India
              </h1>

              <p className={styles.heroDescription}>
                Explore how tyre recycling plants work, the machinery required,
                setup costs, profitability, and the best manufacturers in India.
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
                src={Plant1}
                alt="Tyre Recycling Plant"
                className={styles.heroImage}
              />
            </div>
          </div>


          {/* intro */}
          <section id="intro" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={Plant1} alt="Tyre Recycling Plant" />
                <span>Modern tyre scrap recycling plant</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Introduction</span>
                <h2>Growing Need for Tyre Recycling Plants</h2>
                <p>
                  With India generating over 6 million tonnes of tyre waste every year, the demand for advanced tyre scrap recycling
                  plants has increased dramatically. Manufacturers now build fully-automated recycling machinery
                  capable of shredding, grinding, baling, and processing tyres into reusable materials like rubber granules, pyrolysis oil, steel wire, and carbon black.
                </p>
                <p>
                  Leading manufacturers in India offer durable, customizable recycling plants suitable for factories, municipal waste facilities,
                  tyre processing companies, and recycling units.
                </p>
              </div>
            </div>
          </section>

          {/* benefits */}
          <section id="benefits" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Benefits</span>
              <h2>Why Tyre Recycling Plants Matter</h2>
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

          {/* demand */}
          <section id="demand" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={Tyre1} alt="Tyre scrap demand" />
                <span>India’s rising tyre scrap generation</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Demand</span>
                <h2>Demand for Tyre Recycling Plants in India</h2>
                <p>
                  Rapid urbanization, transportation growth, and industrial expansion have resulted in massive tyre waste accumulation.
                </p>
                <p>
                  Without proper recycling, these tyres become fire hazards, mosquito breeding grounds, and environmental threats.
                </p>
              </div>
            </div>
            <ul className={styles.modernList}>
              <li> India generates millions of end-of-life tyres annually </li>
              <li> Recycling demand is rising due to government mandates </li>
              <li> High profitability from recovered materials </li>
              <li> Industries need sustainable waste management solutions </li>
            </ul>
          </section>

          {/* process */}
          <section id="process" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Process</span>
              <h2>How Tyre Scrap Recycling Plants Work</h2>
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

          {/* machinery */}
          <section id="machinery" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Machinery</span>
              <h2>Core Machinery in a Tyre Recycling Plant</h2>
            </div>

            <ul className={styles.list}>
              <li>Tyre Shredders & Crushers</li>
              <li>Rubber Grinders & Granulators</li>
              <li>Steel Wire Separators</li>
              <li>Hydraulic Balers</li>
              <li>Conveyors & Feeders</li>
              <li>Dust Collection Units</li>
              <li>PLC Automation Controls</li>
            </ul>
            <p>Each plant is customized based on tyre scrap volume, facility size, and recycling goals.</p>
          </section>

          {/* manufacturers */}
          <section id="manufacturers" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={Plant2} alt="Manufacturing Recycling Plants" />
                <span>Manufacturing high-quality recycling plants</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Manufacturers</span>
                <h2>Top Tyre Scrap Recycling Plant Manufacturers</h2>
                <p>
                  Vikah Ecotech and other specialized equipment manufacturers
                  provide complete recycling plant solutions.
                </p>
                <p>
                  These plants include shredders, balers, conveyors, automation
                  systems, and maintenance support.
                </p>
              </div>
              <ul className={styles.list}>
              <li>Vikah Ecotech — Trusted for durable tyre balers & recycling machinery</li>
              <li>Specialized tyre shredder manufacturers</li>
              <li>Rubber granulation equipment suppliers</li>
              <li>Pyrolysis plant manufacturers</li>
              <li>Industrial waste management equipment providers</li>

            </ul>
            </div>
          </section>

          {/* cost */}
          <section id="cost" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Investment</span>
              <h2>Cost of Setting Up a Tyre Recycling Plant</h2>
            </div>

            <ul className={styles.list}>
              <li>Small Scale Plant: ₹15–25 Lakhs</li>
              <li>Medium Scale Plant: ₹40–80 Lakhs</li>
              <li>Large Automated Plant: ₹1.2–4 Crores+</li>
              <li>Additional costs for land, labor, and approvals</li>
            </ul>
          </section>

          {/* compliance */}
          <section id="compliance" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Compliance</span>
              <h2>Government Policies & Recycling Compliance</h2>
            </div>

            <ul className={styles.list}>
              <li>CPCB tyre waste management rules</li>
              <li>Environmental impact assessment requirements</li>
              <li>Pollution control board approvals</li>
              <li>Fire and safety certifications</li>
              <li>ISO quality compliance</li>
            </ul>
          </section>

          {/* why-us */}
          <section id="why-us" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Why Us</span>
              <h2>Why Choose Vikah Ecotech</h2>
            </div>

            <p>
              Vikah Ecotech offers durable, reliable, and efficient tyre
              recycling machinery designed for long-term industrial use.
            </p>

            <ul className={styles.list}>
              <li>Advanced shredders, balers, and conveyors</li>
              <li>Customized plant layouts</li>
              <li>Reliable automation and PLC controls</li>
              <li>Installation, maintenance, and technical support</li>
              <li>High productivity with lower operational costs</li>
            </ul>
          </section>

          {/* conclusion */}
          <section id="conclusion" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={Tyre2} alt="Recycled tyre scrap ready for reuse" />
                <span>Recycled tyre scrap ready for reuse</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Conclusion</span>
                <h2>Final Thoughts</h2>
                <p>
                  Tyre recycling plants are essential for India’s industrial and
                  environmental future.
                </p>
                <p>
                  Choosing the right manufacturer ensures better efficiency,
                  higher profits, and long-term sustainability.
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
          <a href="/primary-shredder">Industrial Primary Shredders →</a>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <a href="/balers">Balers →</a>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <a href="/secondary-shredder">Secondary Shredders →</a>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <a href="/rasper_secondaryshredders">Rasper →</a>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <a href="/ourproducts">All Products →</a>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <a href="/other-equipment">Other Equipment →</a>
        </div>
      </aside>
    </div>
  );
};

export default TyreRecyclingBlog;
