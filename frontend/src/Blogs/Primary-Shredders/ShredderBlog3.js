
import React, { useState, useEffect } from "react";
import styles from "../Baler/Blog.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import BlogImg1 from "../../images/Applications/tyreshred2.jpg";
import BlogImg3 from "../../images/Applications/tyreshred1.jpg";
import BlogImg4 from "../../images/Applications/shredtyre6.jpg";

const faqsData = [
  {
    question: "Can Tyre Primary Shredders improve recycling efficiency?",
    answer:
      "Yes, Tyre Primary Shredders reduce whole tyres into uniform pieces, enabling easier separation of rubber, steel, and fabric components. This improves downstream recycling efficiency and reduces processing time.",
  },
  {
    question: "Do Tyre Shredders support sustainable waste management?",
    answer:
      "Absolutely. By processing end-of-life tyres, these shredders reduce landfill disposal, enable recycling into rubber mats, fuel, or granules, and help industries comply with environmental regulations.",
  },
  {
    question: "What types of tyres can be shredded?",
    answer:
      "Tyre Primary Shredders can process passenger car tyres, truck tyres, off-road and industrial tyres, and sometimes even oversized or agricultural tyres, depending on the shredder model.",
  },
  {
    question: "Are Tyre Shredders cost-effective for recycling facilities?",
    answer:
      "YYes, they reduce manual labor, storage requirements, and transport costs. Processed tyre chips have resale value for fuel, rubber mats, playground surfaces, and other applications.",
  },
  {
    question: "Which industries benefit most from Tyre Primary Shredders?",
    answer:
      "Recycling centers, rubber product manufacturers, energy recovery facilities, and automotive waste management industries gain the most efficiency, cost reduction, and sustainability benefits.",
  },
  {
    question: "How does automation improve tyre shredding productivity?",
    answer:
      "Automation enables continuous feeding, prevents jams, integrates with conveyors or magnetic separators, and allows predictive maintenance, reducing downtime and human error.",
  },
  {
    question: "How long do Tyre Primary Shredders last?",
    answer:
      "With proper maintenance, high-quality Tyre Shredders can last over 10 years. Regular servicing of blades, motors, and hydraulic systems ensures consistent and reliable operation.",
  },

];

const benefitsData = [
  {
    title: "Better Recycling",
    icon: "♻️",
    text: "Improves separation of rubber, steel, and fabric materials.",
  },
  {
    title: "Reduce Costs",
    icon: "💰",
    text: "Lower transport, labor, and landfill expenses.",
  },
  {
    title: "Save Space",
    icon: "📦",
    text: "Shredded tyres occupy much less storage space.",
  },
  {
    title: "Improve Safety",
    icon: "🛡️",
    text: "Reduces fire hazards and loose tyre clutter.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Feed Tyres",
    text: "Whole tyres are loaded into the shredder system.",
  },
  {
    step: "02",
    title: "Shred Material",
    text: "Dual shafts and cutters reduce tyres into chips or strips.",
  },
  {
    step: "03",
    title: "Separate Steel",
    text: "Magnetic separators remove steel wire from shredded rubber.",
  },
  {
    step: "04",
    title: "Recycle Output",
    text: "Processed rubber can be reused in mats, fuel, or granules.",
  },
];

const ShredderBlog3 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "benefits", title: "Key Benefits" },
    { id: "role", title: "Role in Recycling" },
    { id: "operation", title: "How It Works" },
    { id: "types", title: "Types of Shredders" },
    { id: "recycling", title: "Boosting Tyre Recycling Efficiency" },
    { id: "workflow", title: "Optimizing Workflow & Storage" },
    { id: "space", title: "Space Utilization Advantages" },
    { id: "process", title: "Working Process" },
    { id: "cost", title: "Cost & Operational Savings" },
    { id: "safety", title: "Safety Considerations" },
    { id: "sustainability", title: "Sustainability Benefits " },
    { id: "maintenance", title: "Maintenance & Longevity" },
    { id: "automation", title: "Automation & Smart Integration" },
    { id: "troubleshooting", title: "Common Issues & Troubleshooting Tips" },
    { id: "roi", title: "Return on Investment & Long-Term Benefits" },
    { id: "future", title: "Future Trends in Tyre Shredding Technology" },
    { id: "why-us", title: "Why Choose Us" },
    { id: "conclusion", title: "Conclusion" },
    { id: "key-takeaways", title: "Key Takeaways" },
    { id: "faqs", title: "Frequently Asked Questions" },
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
          Tyre Primary Shredders | Efficient Recycling & Waste Management | Vikah Ecotech
        </title>
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
              <span className={styles.heroBadge}>Tyre Recycling Solutions</span>

              <h1 className={styles.heroTitle}>
                Tyre Primary Shredders: Efficient Recycling & Waste Management Solutions
              </h1>

              <p className={styles.heroDescription}>
                Learn how tyre shredders improve recycling efficiency, reduce costs,
                save storage space, and support sustainable waste management.
              </p>
            </div>
          </div>

          {/* INTRODUCTION */}
          <section id="introduction" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Introduction</span>
              <h2>Processing end-of-life tyres efficiently</h2>
            </div>

            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg1} alt="Compact tyre baler" />
              </div>

              <div className={styles.textCard}>
                <p>
                  Tyre Primary Shredders are critical for sustainable tyre recycling.
                  They reduce whole tyres into manageable chips or strips, making storage, transport, and recycling more efficient.
                </p>

                <p>
                  Efficient shredding reduces manual labor, enhances facility throughput, and ensures proper material recovery,
                  supporting environmental and regulatory compliance.
                </p>

              </div>
            </div>
          </section>

          {/* BENEFITS */}
          <section id="benefits" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Key Benefits</span>
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

          {/* role */}
          <section id="role" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Role in Recycling</span>
              <h2>The Role of Tyre Primary Shredders in Recycling</h2>
            </div>
            <p>Tyre Shredders convert bulky end-of-life tyres into uniform pieces suitable for separation into rubber, steel, and fiber components. </p>
            <p>This process enables easier recycling, energy recovery, and material reuse.</p>
            <p>By improving workflow and reducing bottlenecks, tyre shredders increase facility efficiency while lowering costs and supporting eco-friendly waste management.</p>
          </section>

          {/* operation */}
          <section id="operation" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>How It Works</span>
              <h2>How Tyre Primary Shredders Operate</h2>
            </div>
            <p>Tyre Shredders use rotating blades or dual-shaft cutters to break tyres into chips.
              High-torque motors ensure efficient shredding, even for truck or industrial tyres.</p>
            <p>Adjustable cutting settings allow customization of chip size to match recycling, energy recovery, or resale requirements.</p>
          </section>

          {/* Different Types of Primary Shredders and Their Applications */}
          <section id="types" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Different Types of Tyre Primary Shredders and Their Applications</span>
              <p><b>Single-Shaft Tyre Shredders: </b> Ideal for medium tyres and steady throughput in smaller facilities.</p>
              <p><b>Dual-Shaft Tyre Shredders:</b>Handle truck, industrial, and oversized tyres efficiently.</p>
              <p><b>Granulators:</b>Produce smaller rubber granules for mats, playground surfaces, or fuel pellets.</p>
              <p><b>High-Speed Rotary hredders:</b>Efficient for lightweight tyres or secondary shredding stages.</p>
              <p><b>Hammermills:</b>Reduce shredded tyre chips further for energy recovery or fine rubber granules.</p>
            </div>
          </section>

          {/* recycling */}
          <section id="recycling" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Boosting Tyre Recycling Efficiency</span>
              <p>Shredded tyres allow efficient separation of steel, fiber, and rubber. Recycled rubber can be used in construction,
                playground surfaces, mats, and as fuel in cement kilns.</p>
              <p>Facilities benefit from reduced landfill dependency, compliance with environmental standards, and the creation of valuable recycled products.</p>
            </div>
          </section>

          {/* workflow */}
          <section id="workflow" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Optimizing Workflow & Storage</span>
              <p>Tyre Shredders streamline the material flow. Chips can be fed directly to conveyors, magnetic separators,
                or storage areas, reducing manual handling and improving productivity.</p>
            </div>
          </section>

          {/* space */}
          <section id="space" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Space Utilization Advantages </span>
              <p>Shredded tyres take less space than whole tyres, improving storage efficiency, warehouse organization, and safety. </p>
              <p>This enables facilities to process higher volumes without expanding their footprint.</p>
            </div>
          </section>

          {/* process */}
          <section id="process" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}> Working Process</span>
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
              <span className={styles.sectionTag}>Cost & Operational Savings</span>
              <p>Tyre Shredders reduce labor, transport, and storage costs. Processed chips have resale value,
                and energy recovery opportunities reduce waste-to-landfill expenses.</p>
            </div>
          </section>

          {/* safety */}
          <section id="safety" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Safety Considerations</span>
              <p>Shredding tyres reduces clutter and prevents fire hazards from stored whole tyres. Emergency stops, interlocks,
                and overload protection ensure operator safety.</p>
            </div>
          </section>

          {/* sustainability */}
          <section id="sustainability" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Sustainability Benefits</span>
              <p>Tyre Shredders support environmental sustainability by enabling rubber recycling, reducing landfill usage,
                and contributing to circular economy initiatives.</p>
            </div>
          </section>

          {/* maintenance */}
          <section id="maintenance" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Maintenance & Longevity</span>
              <p>Regular inspection of blades, motors, and hydraulics ensures long shredder life. Proper maintenance minimizes downtime and ensures consistent chip quality.</p>
            </div>
          </section>

          {/* automation */}
          <section id="automation" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Automation & Smart Integration</span>
              <p>Tyre Shredders with smart sensors, conveyors, and IoT integration enable continuous operation, predictive maintenance, and reduced human error.</p>
            </div>
          </section>

          {/* troubleshooting */}
          <section id="troubleshooting" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Troubleshooting</span>
              <p>Common Issues & Troubleshooting Tips</p>
              <ul className={styles.list}>
                <li><b>Tyre jams: </b>Use emergency stop and reverse carefully.</li>
                <li><b>Blade wear: </b>Inspect and replace blades regularly.</li>
                <li><b>Motor overload: </b>Ensure proper load handling and cooling.</li>
                <li><b>Excess vibration: </b>Check alignment and rotor balance.</li>
              </ul>
            </div>
          </section>

          {/* roi */}
          <section id="roi" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Return on Investment & Long-Term Benefits</span>
              <p>Investing in Tyre Primary Shredders provides long-term savings, improves material recovery, enhances recycling revenue, and reduces labor and landfill costs.</p>
            </div>
          </section>

          {/* future */}
          <section id="future" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Future Trends in Tyre Shredding Technology</span>
              <p>AI-driven monitoring, energy-efficient motors, and integration with Industry 4.0 are shaping tyre shredding. </p>
              <p>Smart sensors allow predictive maintenance and real-time process optimization.</p>
            </div>
          </section>

          {/* why-us */}
          <section id="why-us" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Why Choose Our Tyre Primary Shredders</span>
              <p>Our Tyre Shredders combine durability, efficiency, and safety. Designed for diverse tyre recycling applications,
                they optimize workflow, reduce costs, and support sustainability.</p>
            </div>
          </section>


          {/* conclusion */}
          <section id="conclusion" className={styles.sectionCard}>
            <div className={styles.contentGrid}>
              <div className={styles.imageCard}>
                <img src={BlogImg4} alt="Processed shredded materials" />
                <span>Shredded tyres ready for recycling or energy recovery</span>
              </div>

              <div className={styles.textCard}>
                <span className={styles.sectionTag}>Conclusion</span>
                <h2>Final Thoughts</h2>
                <p>
                  Tyre Primary Shredders are essential for efficient and sustainable tyre recycling.
                </p>
                <p>
                  They improve workflow, reduce costs, support environmental initiatives, and provide long-term operational benefits.
                </p>

              </div>
            </div>
          </section>

          {/* key-takeaways */}
          <section id="key-takeaways" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Key Takeaways</span>
            </div>
            <ul className={styles.modernList}>
              <li> Streamlines tyre recycling operations</li>
              <li> Enhances sustainability and material recovery</li>
              <li> Reduces operational, labor, and landfill costs</li>
              <li>Improves workplace safety and workflow</li>
              <li>Durable, reliable, and long-term solution  </li>
              <li>Supports automation and smart integration</li>
            </ul>
          </section>

          {/* faqs */}
          <section id="faqs" className={styles.sectionCard}>
            <div className={styles.faqContainer}>
              {faqsData.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <div
                    className={styles.faqQuestion}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    <span>{openFAQ === index ? "−" : "+"}</span>
                  </div>

                  {openFAQ === index && (
                    <div className={styles.faqAnswer}>{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShredderBlog3;

