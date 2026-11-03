import React, { useState, useEffect } from "react";
import styles from "../Baler/Blog.module.css";

// Images
import BlogImg1 from "../../images/Applications/plasticbaler1.jpg";
import BlogImg2 from "../../images/Applications/plasticbaler2.jpg";
import BlogImg3 from "../../images/Applications/pcb1.webp";
import BlogImg4 from "../../images/Applications/pcb3.webp";

const faqsData = [
  {
    question: "How does folding equipment improve material handling?",
    answer:
      "Folding equipment compacts processed rubber sheets or components into neat stacks, saving storage space and making handling easier for shipping and warehousing.",
  },
  {
    question: "Why is folding important in tyre recycling lines?",
    answer:
      "It ensures organized storage, reduces clutter, and prevents damage to processed materials, improving overall efficiency.",
  },
  {
    question: "Does it reduce labor and operational costs?",
    answer:
      "Yes. By automating stacking and folding, facilities can reduce manual handling and save time and labor costs.",
  },
  {
    question: "Who benefits from folding equipment?",
    answer:
      "Facilities processing rubber sheets, cut strips, or recycled materials benefit from organized storage, safer handling, and faster logistics.",
  },
];

const benefitsData = [
  {
    icon: "📦",
    title: "Compact Storage",
    text: "Folded and stacked materials take up less warehouse space.",
  },
  {
    icon: "⚡",
    title: "Faster Handling",
    text: "Organized stacks are easier to move, store, and transport.",
  },
  {
    icon: "💰",
    title: "Lower Labor Costs",
    text: "Reduce manual handling and repetitive stacking tasks.",
  },
  {
    icon: "🛡️",
    title: "Safer Operations",
    text: "Minimize lifting injuries and improve workplace safety.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Material Collection",
    text: "Processed rubber sheets or strips are collected from the line.",
  },
  {
    step: "02",
    title: "Automatic Folding",
    text: "Machines fold materials into neat, uniform stacks.",
  },
  {
    step: "03",
    title: "Stacking & Alignment",
    text: "Sensors maintain consistent stack size and alignment.",
  },
  {
    step: "04",
    title: "Storage & Shipping",
    text: "Finished stacks are moved to pallets or warehouse storage.",
  },
];

const OtherEquipmentBlog4 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const sections = [
    {
      id: "introduction",
      title: "Introduction: Overview of Folding & Packing Equipment",
    },
    {
      id: "benefits",
      title: "Key Benefits of Folding Equipment",
    },
    {
      id: "how-it-works",
      title: "How Folding Machines Work: Step by Step",
    },
    {
      id: "process",
      title: "Folding & Packing Workflow",
    },
    {
      id: "why-you-need-it",
      title: "Importance of Folding Equipment in Recycling Lines",
    },
    {
      id: "efficiency-impact",
      title: "Impact on Efficiency and Workflow Optimization",
    },
    {
      id: "safety-benefits",
      title: "Safety and Material Handling Benefits",
    },
    {
      id: "cost-savings",
      title: "Reducing Labor Costs and Storage Expenses",
    },
    {
      id: "who-should-use-it",
      title: "Who Should Use Folding and Packing Machines?",
    },
    {
      id: "implementation-tips",
      title: "Tips for Implementing Folding Equipment Successfully",
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
                Packing & Folding Equipment
              </span>

              <h1 className={styles.heroTitle}>
                Packing & Folding Equipment for Organized, Safe, and Efficient
                Recycling
              </h1>

              <p className={styles.heroDescription}>
                Learn how automated folding and packing systems improve storage,
                reduce labor, and optimize recycling workflow.
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
                alt="Packing Equipment"
                className={styles.heroImage}
              />
            </div>
          </div>

          {/* introduction */}
          <section id="introduction" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg1} alt="Packing Equipment" />
                <span>
                  Folding equipment stacking rubber sheets
                </span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Introduction</span>
                <h2>Overview of Folding & Packing Equipment</h2>
                <p>
                  Packing and folding equipment plays a pivotal role in modern recycling operations.
                  These machines help in compacting processed rubber sheets or cut materials into uniform stacks,
                  improving storage, handling, and transportation efficiency.<b>Recycling facilities that implement
                  proper folding and packing solutions often see higher throughput, less clutter, and more organized warehouses.</b>
                </p>
                <p>
                  These machines improve storage efficiency, simplify handling,
                  and support smoother shipping and logistics operations.
                </p>
              </div>
            </div>
          </section>

          {/* benefits */}
          <section id="benefits" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Benefits</span>
              <h2>Why Folding Equipment Matters</h2>
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
                <img src={BlogImg2} alt="Folding Rubber Sheets" />
                <span>
                  Neatly folded rubber sheets ready for storage
                </span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>How It Works</span>
                <h2>How Folding Machines Work: Step by Step</h2>
                <p>
                  Folding machines automatically pick up processed sheets or strips and fold them into uniform stacks.
                   Advanced sensors ensure proper alignment and consistent stack height. 
                  Some machines also include conveyors that move the folded stacks to pallets
                   or storage areas, minimizing manual handling.
                </p>
                <p>
                  This step not only organizes materials but also prevents damage to fragile sheets, ensuring that 
                  the quality of recycled rubber or plastics is maintained.
                </p>
              </div>
            </div>
          </section>

          {/* process */}
          <section id="process" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Workflow</span>
              <h2>Folding & Packing Workflow</h2>
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

          {/* Importance of Folding Equipment in Recycling Lines*/}
          <section id="why-you-need-it" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Importance of Folding Equipment in Recycling Lines</span>
              <h2>Importance of Folding Equipment in Recycling Lines</h2>
            </div>
            <p>Without automated folding, materials can pile up haphazardly, causing storage inefficiencies and slowing down 
              the recycling process. Folding equipment ensures a streamlined workflow, reduced clutter, and safer storage practices.</p>
            <p>Facilities aiming for ISO compliance or operational excellence benefit from implementing these machines.</p>
          </section>

          {/* efficiency-impact */}
          <section id="efficiency-impact" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg3} alt="Stacked Rubber Sheets" />
                <span>
                  Compact stacks improve handling efficiency
                </span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Efficiency</span>
                <h2>Impact on Efficiency and Workflow Optimization</h2>
                <p>
                  Automated folding reduces labor requirements and accelerates logistics operations. 
                </p>
                <p>
                   By minimizing human intervention, recycling facilities can process larger volumes 
                   without adding staff. This improves turnaround time and ensures consistent workflow across all stages.
                </p>
              </div>
            </div>
          </section>

          {/* Safety and Material Handling Benefits */}
          <section id="safety-benefits" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Safety and Material Handling Benefits</span>
              <h2>Safety and Material Handling Benefits</h2>
            </div>
            <p>Folding equipment reduces the need for manual lifting and stacking, lowering the risk of workplace injuries.
               Organized stacks are easier to transport with forklifts or pallet jacks, ensuring safer material handling.</p>
          </section>

          {/* cost-savings */}
          <section id="cost-savings" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg4} alt="Folding Equipment Benefits" />
                <span>
                  Organized stacks for storage and shipping
                </span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Cost Savings</span>
                <h2>Reducing Labor Costs and Storage Expenses</h2>
                <p>
                  By automating repetitive stacking tasks, facilities save on labor costs and reduce storage space requirements. 
                </p>
                <p>
                  Uniform stacks maximize warehouse capacity, and faster packing leads to higher operational efficiency.
                </p>
              </div>
            </div>
          </section>

          {/* Who Should Use Folding and Packing Machines? */}
          <section id="who-should-use-it" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Who Should Use Folding and Packing Machines?</span>
              <h2>Who Should Use Folding and Packing Machines?</h2>
            </div>
            <p>Warehouses, tyre recycling facilities, rubber sheet processors, and large-scale recycling operations benefit most. 
              Any facility that handles high volumes of processed material can improve workflow, safety, and storage efficiency.</p>
          </section>

          {/* implementation-tips */}
          <section id="implementation-tips" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Implementation</span>
              <h2>Tips for Implementing Folding Equipment Successfully</h2>
            </div>

            <ul className={styles.list}>
              <li>
                Evaluate your facility layout before installing machines.
              </li>
              <li>
                Train staff on safe operation and material handling practices.
              </li>
              <li>
                Integrate folding machines with conveyors and pallet systems.
              </li>
              <li>
                Schedule routine maintenance to reduce downtime.
              </li>
              <li>
                Use smart controls and sensors for better stack alignment.
              </li>
            </ul>
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

export default OtherEquipmentBlog4;