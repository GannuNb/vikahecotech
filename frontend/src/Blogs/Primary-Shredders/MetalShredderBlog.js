import React, { useState, useEffect } from "react";
import styles from "../Baler/Blog.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Images
import MetalShredder1 from "../../images/Applications/shredm1.jpg";
import MetalShredder2 from "../../images/Applications/shredm2.jpg";
import MetalScrap1 from "../../images/Applications/shredm3.jpg";
import MetalScrap2 from "../../images/shredder_hd.jpg";

const faqsData = [
  {
    question: "Which industries use metal shredders?",
    answer:
      "Automotive, recycling plants, metal processing units, construction scrap handlers, and manufacturing facilities use metal shredders.",
  },
  {
    question: "What types of metals can be shredded?",
    answer:
      "Ferrous metals, non-ferrous metals, aluminum, steel, copper, and mixed metal scrap can be efficiently processed.",
  },
  {
    question: "Are metal shredders safe to operate?",
    answer:
      "Yes, modern metal shredders include safety interlocks, emergency stop buttons, and overload protection for operators.",
  },
  {
    question: "Do shredders reduce operational costs?",
    answer:
      "Absolutely, they minimize labor, transport, and storage costs by converting scrap into manageable sizes for resale or recycling.",
  },
];

const benefitsData = [
  {
    icon: "⚙️",
    title: "High Efficiency",
    text: "Process heavy metal scrap quickly with powerful shredding systems.",
  },
  {
    icon: "💰",
    title: "Lower Costs",
    text: "Reduce labor, transport, and storage expenses significantly.",
  },
  {
    icon: "♻️",
    title: "Better Recycling",
    text: "Improve metal recycling rates and maximize resale value.",
  },
  {
    icon: "🛡️",
    title: "Safer Workplace",
    text: "Reduce hazards caused by loose and bulky metal scrap.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Feed Scrap",
    text: "Metal scrap is loaded into the shredder system.",
  },
  {
    step: "02",
    title: "Shred Material",
    text: "Powerful cutters reduce metals into smaller pieces.",
  },
  {
    step: "03",
    title: "Separate Metals",
    text: "Processed scrap can be sorted by type and size.",
  },
  {
    step: "04",
    title: "Recycle Output",
    text: "Shredded metal is reused, sold, or sent for recycling.",
  },
];

const MetalShredderBlog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "benefits", title: "Benefits of Metal Shredders" },
    { id: "challenges", title: "Metal Scrap Challenges" },
    { id: "types", title: "Types of Metal Scrap" },
    { id: "how-it-works", title: "How Metal Shredders Work" },
    { id: "process", title: "Metal Shredding Process" },
    { id: "efficiency", title: "Efficiency & Workflow" },
    { id: "cost-benefits", title: "Cost & Transport Benefits" },
    { id: "value-maximization", title: "Maximizing Scrap Value" },
    { id: "safety", title: "Safety & Compliance" },
    { id: "sustainability", title: "Sustainable Practices" },
    { id: "operation", title: "Easy Operation & Reliability" },
    { id: "long-term", title: "Long-Term Benefits" },
    { id: "why-us", title: "Why Choose Vikah Ecotech" },
    { id: "conclusion", title: "Conclusion" },
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
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>
          Trusted Metal Shredders Manufacturers in India | Vikah Ecotech
        </title>
        <meta
          name="description"
          content="Discover trusted metal shredders manufacturers in India. Improve recycling efficiency, reduce costs, and safely manage metal scrap with Vikah Ecotech."
        />
        <meta
          name="keywords"
          content="metal shredders India, industrial metal shredders, scrap metal processing machines, metal recycling equipment, Vikah Ecotech"
        />
        <link rel="canonical" href="https://vikahecotech.com/metal-shredders" />
        <meta
          property="og:title"
          content="Trusted Metal Shredders Manufacturers in India | Vikah Ecotech"
        />
        <meta
          property="og:description"
          content="Vikah Ecotech offers high-quality metal shredders in India, helping industries efficiently manage scrap metal, optimize costs, and enhance recycling."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://vikahecotech.com/metal-shredders"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Trusted Metal Shredders Manufacturers in India",
            description:
              "Learn how Vikah Ecotech metal shredders help industries efficiently process metal scrap, reduce costs, and ensure safety in India.",
            author: {
              "@type": "Organization",
              name: "Vikah Ecotech",
            },
            publisher: {
              "@type": "Organization",
              name: "Vikah Ecotech",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://vikahecotech.com/metal-shredders",
            },
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
                Metal Recycling Solutions
              </span>

              <h1 className={styles.heroTitle}>
                Trusted Metal Shredders Manufacturers in India
              </h1>

              <p className={styles.heroDescription}>
                Discover how metal shredders improve scrap handling, increase
                recycling efficiency, reduce costs, and support safer industrial
                operations.
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
                src={MetalShredder1}
                alt="Industrial Metal Shredder"
                className={styles.heroImage}
              />
            </div>
          </div>

          {/* introduction */}
          <section id="introduction" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={MetalShredder1} alt="Industrial Metal Shredder" />
                <span>High-capacity metal shredder in action</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Introduction</span>
                <h2>Trusted Metal Shredders Manufacturers in India</h2>
                <p>
                  Metal scrap recycling is a crucial part of India's industrial
                  growth. Efficient metal shredders allow facilities to process
                  scrap metals safely, reduce storage space, and maximize resale
                  value.
                </p>
                <p>
                  Vikah Ecotech offers high-quality shredders designed for
                  heavy-duty metal processing, helping industries streamline
                  operations and minimize costs.
                </p>
              </div>
            </div>
          </section>

          {/* benefits */}
          <section id="benefits" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Benefits</span>
              <h2>Why Industries Use Metal Shredders</h2>
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

          {/* challenges */}
          <section id="challenges" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={MetalScrap1} alt="Metal Scrap Challenges" />
                <span>Loose metal scrap creating hazards</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Challenges</span>
                <h2>Metal Scrap Challenges in Industrial Facilities</h2>
                <p>
                  Metal scrap accumulation can obstruct workflow, increase fire risks,
                  and raise labor costs. Improper handling of scrap metals leads to workplace hazards and inefficiencies.
                </p>

                <ul className={styles.list}>
                  <li>Disorganized storage and limited space</li>
                  <li>Increased risk of injuries and accidents</li>
                  <li>High labor costs due to manual handling</li>
                  <li>Inconsistent scrap sizes impacting resale</li>
                </ul>
              </div>
            </div>
            <p>Metal shredders resolve these issues by converting scrap into uniform sizes, improving safety and operational efficiency.</p>
          </section>

          {/* Types of Metal Scrap */}
          <section id="types" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Types of Metal Scrap</span>
              <p><b>Ferrous scrap:  </b>iron, steel</p>
              <p><b>Non-ferrous metals: </b>aluminum, copper, brass</p>
              <p>Automotive parts and chassis components</p>
              <p>Industrial manufacturing offcuts</p>
              <p>Construction and demolition scrap</p>
            </div>
            <p>Proper shredding and segregation increases resale value and reduces handling risks, enabling a smoother metal recycling process.</p>
          </section>

          {/* How Metal Shredders Work */}
          <section id="how-it-works" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={MetalScrap1} alt="Metal Scrap Challenges" />
                <span>How Metal Shredders Work</span>
              </div>

              <div className={styles.textCard}>
                <h2>How Metal Shredders Work</h2>
                <p>
                  Metal shredders use powerful cutting and crushing mechanisms to break down
                  scrap metals into uniform sizes. Operators feed scrap into the machine, which processes it efficiently and safely.
                </p>
                <p>Modern shredders include PLCs, automated sensors, and overload protection to ensure consistent operation, reducing downtime and maximizing output.</p>
              </div>
            </div>
            <p>Metal shredders resolve these issues by converting scrap into uniform sizes, improving safety and operational efficiency.</p>
          </section>

          {/* process */}
          <section id="process" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Process</span>
              <h2>Metal Shredding Process</h2>
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

          {/* workflow */}
          <section id="efficiency" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Efficiency & Workflow</span>
              <p>Shredding metals allows efficient storage, reduces clutter, and optimizes workflow.
                Automated metal handling and conveyor integration streamline operations further.</p>
            </div>
          </section>

          {/* Cost & Transport Benefits */}
          <section id="cost-benefits" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Cost & Transport Benefits</span>
              <p>Shredded metals are easier to transport, reducing freight trips and lowering fuel and
                labor costs. This improves cost predictability and reduces environmental impact.</p>
            </div>
          </section>

          {/* Maximizing Scrap Value */}
          <section id="value-maximization" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Maximizing Scrap Value</span>
              <p>Uniform, clean shredded metals fetch higher resale prices. Proper segregation and
                shredding improve transparency and strengthen buyer confidence.</p>
            </div>
          </section>

          {/* Safety & Compliance */}
          <section id="safety" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Safety & Compliance</span>
              <p>Properly shredded metals reduce workplace hazards and ensure compliance with ISO and environmental standards.</p>
              <ul className={styles.modernList}>
                <li>Emergency stops for immediate shutdown</li>
                <li>Interlocks preventing unsafe operation</li>
                <li>Overload protection to avoid mechanical failures</li>
              </ul>
            </div>
          </section>

          {/* Maximizing Scrap Value */}
          <section id="sustainability" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Sustainable Practices</span>
              <p>Metal shredding promotes recycling, reduces landfill dependency, and aligns with CSR
                and environmental goals, fostering a circular economy.</p>
            </div>
          </section>

          {/* Easy Operation & Reliability*/}
          <section id="operation" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Easy Operation & Reliability</span>
              <p>Minimal training is required, and modern metal shredders offer predictive maintenance and remote monitoring, ensuring maximum uptime.</p>
            </div>
          </section>

          {/* Long-Term Benefits */}
          <section id="long-term" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Long-Term Benefits</span>
              <ul className={styles.modernList}>
                <li>Lower operational costs over time</li>
                <li>Higher resale revenue</li>
                <li>Durable machinery for decades</li>
                <li>Improved safety and compliance</li>
                <li>Supports sustainability goals</li>
              </ul>
            </div>
          </section>

          {/* Why Choose Vikah Ecotech */}
          <section id="why-us" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Why Choose Vikah Ecotech</span>
              <p>Vikah Ecotech provides reliable, high-performance metal shredders in India with excellent support, 
                customization options, and ROI-focused solutions for all industrial setups.</p>
            </div>
          </section>

          {/* conclusion */}
          <section id="conclusion" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={MetalScrap2} alt="Shredded Metal Ready" />
                <span>Optimized shredded metal ready for recycling</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Conclusion</span>
                <h2>Metal Shredders Improve Efficiency and Recycling</h2>
                <p>
                  Trusted metal shredders are critical for operational
                  efficiency, safety, and sustainability.
                </p>
                <p>
                  Investing in quality shredders ensures better workflow, higher
                  revenue, and compliance with regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Long-Term Benefits */}
          <section id="key-takeaways" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Key Takeaways</span>
              <ul className={styles.modernList}>
                <li>Efficient metal scrap processing</li>
                <li>Reduced labor and transport costs</li>
                <li>Enhanced resale value of metals</li>
                <li>Improved workplace safety and compliance</li>
                <li>Supports sustainability and recycling initiatives</li>
              </ul>
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
          <a href="/tyreshredder">Tyre Shredder →</a>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <a href="/plasticshredder">Plastic Primary Shredders →</a>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <a href="/papershredder">PCB Primary Shredders →</a>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <a href="/shm4000">Metal Primary Shredders →</a>
        </div>
      </aside>
    </div>
  );
};

export default MetalShredderBlog;