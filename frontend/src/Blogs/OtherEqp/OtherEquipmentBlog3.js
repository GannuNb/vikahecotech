import React, { useState, useEffect } from "react";
import styles from "../Baler/Blog.module.css";

// Images
import BlogImg1 from "../../images/Applications/plasticbaler1.jpg";
import BlogImg2 from "../../images/Applications/plasticbaler2.jpg";
import BlogImg3 from "../../images/Applications/pcb1.webp";
import BlogImg4 from "../../images/Applications/pcb3.webp";
import BlogImg5 from "../../images/Applications/pcb3.webp";

const faqsData = [
  {
    question: "How do bead wire removers improve tyre pre-processing?",
    answer:
      "They efficiently extract steel bead wires before shredding, reducing machine stress and recovering valuable steel.",
  },
  {
    question: "Why use strip cutters in recycling lines?",
    answer:
      "Strip cutters slice tyres into manageable strips, preventing blockages and improving downstream shredding throughput.",
  },
  {
    question: "Does block cutting help recycling efficiency?",
    answer:
      "Yes. By cutting rubber strips into smaller blocks, block cutters ensure consistent feed size and smoother processing.",
  },
  {
    question: "Who should use side wall removers?",
    answer:
      "Any facility processing car or truck tyres benefits. Side wall removers simplify cutting and prepare cleaner material for shredding.",
  },
  {
    question: "How to choose the right tyre cutting equipment?",
    answer:
      "Consider tyre types (car, truck, industrial), desired output size, machine capacity, and maintenance requirements.",
  },
  {
    question: "How often should cutting machines be serviced?",
    answer:
      "Regular inspection and maintenance, ideally weekly for high-use parts and monthly for thorough cleaning, ensures longevity and reduces downtime.",
  },
];

const benefitsData = [
  {
    icon: "⚙️",
    title: "Less Machine Stress",
    text: "Reduce shredder wear by removing steel beads and sidewalls early.",
  },
  {
    icon: "📦",
    title: "Uniform Feed Size",
    text: "Prepare tyres into strips and blocks for smooth shredding.",
  },
  {
    icon: "♻️",
    title: "Higher Recycling Efficiency",
    text: "Improve downstream processing and material quality.",
  },
  {
    icon: "💰",
    title: "Steel Recovery",
    text: "Recover valuable steel wires before shredding operations.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Bead Removal",
    text: "Steel bead wires are removed from tyres safely.",
  },
  {
    step: "02",
    title: "Strip Cutting",
    text: "Tyres are sliced into manageable strips for easier handling.",
  },
  {
    step: "03",
    title: "Block Cutting",
    text: "Rubber strips are cut into smaller blocks for shredders.",
  },
  {
    step: "04",
    title: "Shredder Feeding",
    text: "Prepared tyre material is sent to the shredding line.",
  },
];

const OtherEquipmentBlog3 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const sections = [
    {
      id: "introduction",
      title: "Introduction: Importance of Tyre Pre-Processing",
    },
    {
      id: "benefits",
      title: "Benefits of Tyre Pre-Processing Equipment",
    },
    {
      id: "how-it-works",
      title: "How Tyre Cutting & Preparation Equipment Works",
    },
    {
      id: "types-of-machines",
      title: "Types of Tyre Cutting & Preparation Machines",
    },
    {
      id: "process",
      title: "Tyre Pre-Processing Workflow",
    },
    {
      id: "why-you-need-it",
      title: "Why You Need Tyre Cutting & Preparation Equipment",
    },
    {
      id: "efficiency-improvement",
      title: "How Equipment Improves Recycling Efficiency",
    },
    {
      id: "who-should-use-it",
      title: "Who Should Use Tyre Preparation Equipment?",
    },
    { id: "key-takeaways",
       title: "Key Takeaways" },

    {
      id: "maintenance-tips",
      title: "Maintenance Tips for Tyre Cutting Machines",
    },
    {
      id: "faqs",
      title: "Frequently Asked Questions",
    },
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
        <h3>Explore This Blog</h3>
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
                Tyre Cutting & Preparation Equipment
              </span>

              <h1 className={styles.heroTitle}>
                Cutting & Preparation Equipment for Efficient Tyre Recycling
              </h1>

              <p className={styles.heroDescription}>
                Discover how bead wire removers, strip cutters, block cutters,
                and side wall removers improve tyre recycling efficiency.
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
                alt="Tyre Cutting Equipment"
                className={styles.heroImage}
              />
            </div>
          </div>

          {/* introduction */}
          <section id="introduction" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg1} alt="Cutting Equipment" />
                <span>
                  Bead wire removers and cutters in action
                </span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Introduction</span>
                <h2>Importance of Tyre Pre-Processing</h2>
                <p>
                  Tyre recycling is a multi-step process, and pre-processing is critical for efficiency. Cutting and preparation equipment
                  removes steel beads, slices tyres into strips, cuts blocks, and prepares material for shredding.
                  Without this step, shredders face jams, uneven feed, and increased wear.
                </p>
                <p>
                  Investing in proper tyre cutting machines not only protects expensive shredders but also recovers valuable steel
                  and ensures consistent material size. A smooth pre-processing workflow directly contributes
                  to higher throughput, safer operations, and improved material quality.
                </p>
              </div>
            </div>
          </section>

          {/* benefits */}
          <section id="benefits" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Benefits</span>
              <h2>Why Tyre Pre-Processing Equipment Matters</h2>
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
                <img src={BlogImg2} alt="Strip Cutter Equipment" />
                <span>
                  Strip cutters prepare tyres for shredding
                </span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>How It Works</span>
                <h2>How Tyre Cutting & Preparation Equipment Works</h2>
                <p>
                  Bead wire removers first extract steel wires from the tyre, which reduces machine wear and allows for steel recovery. Strip cutters then slice tyres into
                  long strips, and block cutters divide these strips into smaller, manageable sizes. Side wall removers eliminate unwanted rubber
                  walls, preparing clean material for shredding.
                </p>
                <p>
                  Advanced equipment may include automated feeding, sensors to detect blockage,
                  and adjustable cutting speeds. This ensures consistent output, minimizes human error, and improves overall line efficiency.
                </p>
              </div>
            </div>
          </section>

          {/* types-of-machines */}
          <section id="types-of-machines" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Machine Types</span>
              <h2>Types of Tyre Cutting & Preparation Machines</h2>
            </div>

            <ul className={styles.list}>
              <li>
                <strong>Bead Wire Removers:</strong> Extract steel bead wires
                safely and efficiently.
              </li>
              <li>
                <strong>Strip Cutters:</strong> Slice tyres into uniform strips
                for shredding.
              </li>
              <li>
                <strong>Block Cutters:</strong> Reduce strips into smaller blocks for consistent feed.
              </li>
              <li>
                <strong>Side Wall Removers:</strong> Remove sidewalls to prepare
                cleaner rubber material.
              </li>
              <li>
                <strong>Combination Pre-Processing Lines:</strong>  Fully automated systems combining all the above functions to maximize efficiency.
              </li>
            </ul>
          </section>

          {/* process */}
          <section id="process" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Process</span>
              <h2>Tyre Pre-Processing Workflow</h2>
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

          {/* Why You Need Tyre Cutting & Preparation Equipment */}
          <section id="why-you-need-it" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Why You Need Tyre Cutting & Preparation Equipment</span>
              <h2>Why You Need Tyre Cutting & Preparation Equipment</h2>
            </div>
            <p>Shredders without proper pre-processing face frequent jams, uneven feed, and faster wear. Pre-processing machines
              eliminate these problems by standardizing tyre size, removing steel, and cleaning the material. </p>
            <p>This reduces downtime, extends shredder lifespan, and allows operators to focus on higher-value tasks.</p>
          </section>

          {/* efficiency-improvement */}
          <section
            id="efficiency-improvement"
            className={styles.sectionCard}
          >
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg3} alt="Block Cutting Equipment" />
                <span>
                  Block cutters for uniform feed sizes
                </span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Efficiency</span>
                <h2>How Equipment Improves Recycling Efficiency</h2>
                <p>
                  Standardizing tyre pieces ensures shredders work at maximum efficiency with minimal interruptions. Removing
                  obstacles like steel beads and sidewalls reduces machine wear and improves safety. Facilities can
                  process more tyres in less time while maintaining consistent quality.
                </p>
                <p>
                  Pre-processing also optimizes downstream processes, including grinding, granulation, and separation,
                  improving overall plant productivity and cost-effectiveness.
                </p>
              </div>
            </div>
          </section>

          {/* Who Should Use Tyre Preparation Equipment? */}
          <section id="who-should-use-it" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Who Should Use Tyre Preparation Equipment?</span>
              <h2>Who Should Use Tyre Preparation Equipment?</h2>
            </div>
            <p>Any facility processing passenger, truck, or industrial tyres will benefit. Recycling plants, tyre shredding units, and large-scale
              rubber processing operations can improve throughput, protect machines, and recover steel using cutting and preparation equipment.</p>
          </section>

          {/* Key Takeaways & Summary */}
          <section id="key-takeaways" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Key Benefits of Pre-Processing Equipment</span>
              <h2>Key Benefits of Pre-Processing Equipment</h2>
            </div>
            <ul className={styles.modernList}>
              <li> Reduced machine wear and downtime. </li>
              <li> Consistent feed size for shredders. </li>
              <li> Recovery of valuable steel from tyres.</li>
              <li> Cleaner and safer material for operators. </li>
              <li> Increased throughput and operational efficiency. </li>
              <li> Minimized labour costs and human error. </li>
              <li> Optimized shredding and recycling workflow. </li>
            </ul>
          </section>

          {/* maintenance-tips */}
          <section id="maintenance-tips" className={styles.sectionCard}>
            <div className={styles.contentGrid}>

              <div className={styles.imageCard}>
                <img
                  src={BlogImg5}
                  alt="Maintenance of Separation Equipment"
                />
                <span>
                  Maintenance Tips for Tyre Cutting Machines
                </span>
              </div>
              <ul className={styles.modernList}>
                <li> Inspect moving parts weekly and clean thoroughly. </li>
                <li> Lubricate bearings, motors, and cutting mechanisms regularly. </li>
                <li> Check sensor calibration and feeding alignment monthly. </li>
                <li> Replace worn blades and cutting edges on schedule. </li>
                <li> Schedule professional servicing for optimal longevity. </li>
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

export default OtherEquipmentBlog3;