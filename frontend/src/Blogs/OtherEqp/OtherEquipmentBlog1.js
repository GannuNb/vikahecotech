import React, { useState, useEffect } from "react";
import styles from "../Baler/Blog.module.css";

// Images
import BlogImg1 from "../../images/Applications/plasticbaler1.jpg";
import BlogImg2 from "../../images/Applications/plasticbaler2.jpg";
import BlogImg3 from "../../images/Applications/pcb1.webp";
import BlogImg4 from "../../images/Applications/pcb3.webp";
import BlogImg6 from "../../images/Applications/pcb3.webp";

const faqsData = [
  {
    question: "How do tumble back feeders help recycling lines?",
    answer:
      "They provide a steady, controlled flow of raw materials, reducing manual handling and preventing jams in the recycling process.",
  },
  {
    question: "Can feeding & discharge conveyors prevent bottlenecks?",
    answer:
      "Yes, these heavy-duty conveyors ensure smooth transport of materials, reducing delays and labor requirements.",
  },
  {
    question: "Who should use vibrators in the recycling line?",
    answer:
      "Facilities handling fine powders, granules, or shredded materials benefit from vibrators to prevent clumping and maintain a consistent flow.",
  },
  {
    question: "Do these feeding systems improve overall efficiency?",
    answer:
      "Absolutely. They streamline material handling, save labor, reduce downtime, and optimize the recycling workflow.",
  },
  {
    question: "Are there different types of feeders for specific materials?",
    answer:
      "Yes. There are vibratory feeders, screw feeders, belt feeders, and gravity-fed systems, each optimized for different materials like plastics, rubber, or metal scraps.",
  },
  {
    question: "How to choose the right feeding system?",
    answer:
      "Consider material type, size, density, flow characteristics, and line speed. Consulting a material handling expert can help select the best solution.",
  },
  {
    question: "How often should feeding equipment be maintained?",
    answer:
      "Regular maintenance should be done weekly for high-use components, and full inspection every 3–6 months depending on usage and material type.",
  },
];

const benefitsData = [
  {
    icon: "⚙️",
    title: "Smooth Material Flow",
    text: "Prevents bottlenecks and ensures steady feeding into machines.",
  },
  {
    icon: "📈",
    title: "Higher Productivity",
    text: "Improves throughput and increases line efficiency.",
  },
  {
    icon: "💰",
    title: "Lower Costs",
    text: "Reduces labor, downtime, and operational expenses.",
  },
  {
    icon: "🛡️",
    title: "Safer Operations",
    text: "Minimizes manual handling and reduces workplace risks.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Material Loading",
    text: "Raw materials are loaded into feeders or conveyors.",
  },
  {
    step: "02",
    title: "Controlled Feeding",
    text: "Equipment regulates flow to avoid overloading or jams.",
  },
  {
    step: "03",
    title: "Smooth Transport",
    text: "Conveyors transfer material between machines efficiently.",
  },
  {
    step: "04",
    title: "Continuous Processing",
    text: "Materials move through the recycling line without interruption.",
  },
];

const OtherEquipmentBlog1 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "benefits", title: "Benefits of Feeding Equipment" },
    { id: "how-it-works", title: "How It Works" },
    { id: "types-of-equipment", title: "Types of Feeding Equipment" },
    { id: "process", title: "Feeding Process" },
    { id: "why-you-need-it", title: "Why You Need It" },
    {
      id: "does-it-improve-efficiency",
      title: "Does It Improve Efficiency?",
    },
    { id: "who-should-use-it", title: "Who Should Use It?" },
        { id: "key-takeaways", title: "Key Takeaways" },
    { id: "maintenance-tips", title: "Maintenance Tips" },
    { id: "faqs", title: "FAQs" },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      let scrollPos = window.scrollY + 200;

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
                Feeding & Handling Equipment
              </span>

              <h1 className={styles.heroTitle}>
                Feeding & Handling Equipment for Smooth Recycling Operations
              </h1>

              <p className={styles.heroDescription}>
                Discover how tumble back feeders, conveyors, and vibrators
                improve recycling efficiency, reduce downtime, and optimize
                material flow.
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
                alt="Feeding Equipment"
                className={styles.heroImage}
              />
            </div>
          </div>

          {/* introduction */}
          <section id="introduction" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg1} alt="Feeding Equipment" />
                <span>
                  Tumble back feeder keeping materials flowing efficiently
                </span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Introduction</span>
                <h2>Smooth Material Flow for Recycling Plants</h2>
                <p>
                  Efficient material feeding and handling are the backbone of modern recycling operations. With increasing volumes of industrial waste,
                  including plastics, rubber, metals, and paper, recycling facilities need reliable equipment that ensures continuous flow and operational efficiency.
                  Without proper feeding systems, lines can experience jams, inconsistent throughput, and higher labor costs.
                </p>
                <p>
                  Investing in advanced feeding and handling equipment not only increases productivity but also improves safety, reduces manual intervention,
                  and ensures consistent product quality. By automating material flow, recycling plants can process
                  larger volumes faster, which is critical for meeting environmental regulations and business goals.
                </p>
              </div>
            </div>
          </section>

          {/* benefits */}
          <section id="benefits" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Benefits</span>
              <h2>Why Feeding Equipment Matters</h2>
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

          {/* how-it-works */}
          <section id="how-it-works" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg2} alt="Feeding Conveyor" />
                <span>
                  Feeding conveyors streamline material transport
                </span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>How It Works</span>
                <h2>How Feeding Equipment Works</h2>
                <p>
                  Feeding equipment is designed to control the delivery of raw materials into recycling lines.
                  Tumble back feeders release a measured quantity of materials into processing machines, preventing overloading or underfeeding. Vibratory feeders shake materials gently to prevent clumping,
                  ensuring a uniform flow into downstream equipment.
                </p>
                <p>
                  Conveyors, both feeding and discharge types, transport materials between machines efficiently. Automated sensors can detect blockages
                  or uneven flow, adjusting speeds dynamically. This ensures that material processing remains smooth,
                  reducing downtime and maximizing line efficiency.
                </p>
              </div>
            </div>
          </section>

          {/* types-of-equipment */}
          <section id="types-of-equipment" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Equipment Types</span>
              <h2>Types of Feeding Equipment</h2>
            </div>
            <p>Choosing the right feeding equipment depends on the type, size, and density of the material being processed. Here are the most common types:</p>
            <ul className={styles.list}>
              <li>
                <strong>Vibratory Feeders:</strong> Best for powders and
                granular materials.
              </li>
              <li>
                <strong>Screw Feeders:</strong> Ideal for heavy or viscous
                materials.
              </li>
              <li>
                <strong>Belt Feeders:</strong> Used for plastics, metals, and
                rubber.
              </li>
              <li>
                <strong>Gravity Feed Systems:</strong> Simple low-maintenance
                systems.
              </li>
              <li>
                <strong>Combination Systems:</strong> Handle multiple material
                types efficiently.
              </li>
            </ul>
            <p>Selecting the right equipment ensures minimal downtime, consistent flow, and optimized processing,
              all of which directly impact profitability and recycling efficiency.</p>
          </section>

          {/* process */}
          <section id="process" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Process</span>
              <h2>Feeding Process</h2>
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

          {/* Why Feeding Equipment is Essential */}
          <section id="why-you-need-it" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Why Feeding Equipment is Essential</span>
              <h2>Why Feeding Equipment is Essential</h2>
            </div>
            <p>Recycling operations without proper feeding and handling equipment face frequent bottlenecks, production delays,
              and higher operational costs. Feeding systems maintain a consistent flow,
              protect machinery from overloading, and ensure uniform output quality.</p>
            <p>By reducing manual labor and human error, these systems also enhance workplace safety and allow staff to focus on higher-value tasks.
              Continuous operation leads to better throughput, higher revenue, and improved environme ntal compliance.</p>
          </section>

          {/* does-it-improve-efficiency */}
          <section
            id="does-it-improve-efficiency"
            className={styles.sectionCard}
          >
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg3} alt="Material Flow Vibrators" />
                <span>Vibrators keeping material flow consistent</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Efficiency</span>
                <h2>Efficiency Improvements Through Automation</h2>
                <p>
                  Automated feeding systems dramatically improve recycling efficiency. They reduce downtime caused by manual interventions, prevent blockages, and maintain a
                  consistent flow to processing machines. This results in faster production rates, optimized throughput, and increased profitability.
                </p>
                <p>
                  Facilities using modern feeding equipment report up to 30–40% improvement in line efficiency and significant
                  reductions in labor costs. Consistent material flow also reduces wear and tear on machines, extending their lifespan.
                </p>
              </div>
            </div>
          </section>

          {/* Who Benefits Most from Feeding Equipment? */}
          <section id="who-should-use-it" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Who Benefits Most from Feeding Equipment?</span>
              <h2>Who Benefits Most from Feeding Equipment?</h2>
            </div>
            <p>Recycling facilities, plastics and rubber manufacturers, metal processing units, and paper/cardboard recyclers benefit the most.
              Any operation that handles bulk materials requiring steady, reliable flow will see measurable improvements in productivity and safety.</p>
            <p>Even smaller plants can benefit by reducing manual labor, avoiding bottlenecks, and maintaining consistent output quality.
              Feeding equipment is scalable and adaptable to diverse material types.</p>
          </section>

          {/* Key Takeaways & Summary */}
          <section id="key-takeaways" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Key Takeaways & Summary</span>
              <h2>Key Takeaways & Summary</h2>
            </div>
            <ul className={styles.modernList}>
              <li> Consistent material flow without jams or stoppages </li>
              <li> Reduced manual labor and operational costs </li>
              <li> Higher throughput and productivity </li>
              <li> Improved safety for operators </li>
              <li> Optimized workflow across the recycling line </li>
              <li> Better quality control and uniform output </li>
              <li>Lower energy consumption and reduced waste</li>
              <li>Scalable solutions for growing recycling needs</li>
            </ul>
          </section>

          {/* maintenance-tips */}
          <section id="maintenance-tips" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg6} alt="Conveyor Maintenance" />
                <span>
                  Regular maintenance ensures peak performance
                </span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Maintenance</span>
                <h2>Maintenance Tips for Longevity</h2>
                <p>
                  Regular maintenance is essential for long-term performance:
                </p>
                <p>
                  I nspect belts, screws, and vibratory components for wear and tear weekly.
                </p>
              </div>
              <ul className={styles.modernList}>
                <li> Lubricate moving parts to prevent friction and overheating. </li>
                <li> Calibrate sensors and automation controls for accurate material flow. </li>
                <li> Clean feeding systems regularly to prevent clogs and contamination. </li>
                <li> Schedule professional inspections periodically to detect potential failures early. </li>
              </ul>
            </div>
            <p>Following these steps reduces unexpected downtime, prolongs equipment life, and ensures maximum efficiency</p>
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
          <a href="/other-equipment">Other Equipment →</a>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <a href="/ourproducts">All Products →</a>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <a href="/contact">Contact Us →</a>
        </div>

        <div className={`${styles.relatedCard} ${styles.floatCard}`}>
          <a href="/enquire">Enquire Us →</a>
        </div>
      </aside>
    </div>
  );
};

export default OtherEquipmentBlog1;