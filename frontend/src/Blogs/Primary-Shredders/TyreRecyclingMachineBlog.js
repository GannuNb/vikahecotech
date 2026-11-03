
import React, { useState, useEffect } from "react";
import styles from "./Blog.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import BlogImg1 from "../../images/Applications/tyreshred2.jpg";
import BlogImg2 from "../../images/Applications/tyreshred1.jpg";
import BlogImg3 from "../../images/Applications/shredtyre6.jpg";
import BlogImg4 from "../../images/Applications/tyre.webp";

const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "what-is-tyre-recycling", title: "What Is Tyre Recycling?" },
    { id: "importance", title: "Importance of Tyre Recycling" },
    { id: "working-process", title: "Working Process" },
    { id: "machinery", title: "Machines Used" },
    { id: "primary-shredder", title: "Primary Shredder" },
    { id: "secondary-shredder", title: "Secondary Shredder" },
    { id: "steel-separation", title: "Steel Separation" },
    { id: "applications", title: "Applications" },
    { id: "benefits", title: "Key Benefits" },
    { id: "sustainability", title: "Environmental Benefits" },
    { id: "selection", title: "Choosing the Right Machine" },
    { id: "conclusion", title: "Conclusion" },
    { id: "faqs", title: "FAQs" },
];

const benefitsData = [
    {
        title: "Efficient Waste Processing",
        icon: "⚙️",
        text: "Processes discarded tyres into smaller pieces, making further recycling and material handling easier.",
    },
    {
        title: "Material Recovery",
        icon: "♻️",
        text: "Supports the recovery of rubber, steel, and textile components from end-of-life tyres.",
    },
    {
        title: "Reduced Storage Requirements",
        icon: "📦",
        text: "Shredding reduces the space required to store and transport bulky waste tyres.",
    },
    {
        title: "Industrial Productivity",
        icon: "🏭",
        text: "Suitable machinery and processing systems help maintain a consistent tyre recycling workflow.",
    },
];

const processSteps = [
    {
        step: "01",
        title: "Tyre Collection",
        text: "Used tyres are collected from automobile workshops, tyre dealers, and other collection points.",
    },
    {
        step: "02",
        title: "Initial Processing",
        text: "Tyres are inspected and prepared for processing. Depending on the plant design, preliminary cutting or bead removal may be carried out.",
    },
    {
        step: "03",
        title: "Primary Shredding",
        text: "A primary tyre shredder reduces whole tyres into smaller pieces using heavy-duty rotating cutters.",
    },
    {
        step: "04",
        title: "Secondary Processing",
        text: "Further size reduction is performed using secondary shredders or rasper systems, depending on the required output.",
    },
    {
        step: "05",
        title: "Material Separation",
        text: "Steel wires and textile fibres are separated from the processed rubber using suitable separation equipment.",
    },
    {
        step: "06",
        title: "Final Material",
        text: "The recovered rubber material is prepared for further processing, recycling, or reuse.",
    },
];

const faqsData = [
    {
        question: "What is a tyre recycling machine?",
        answer:
            "A tyre recycling machine is industrial equipment used to process discarded tyres into smaller rubber pieces and recover materials such as steel and textile fibres. A complete recycling line may include shredders, rasper machines, conveyors, and separation equipment.",
    },
    {
        question: "How does a tyre recycling machine work?",
        answer:
            "A tyre recycling system generally starts with tyre preparation and primary shredding. The material can then pass through secondary shredding, further size reduction, and steel and fibre separation depending on the required output.",
    },
    {
        question: "What is a primary tyre shredder?",
        answer:
            "A primary tyre shredder is a heavy-duty industrial machine that reduces whole or prepared tyres into smaller pieces. It is generally used as the initial size-reduction stage in a tyre recycling plant.",
    },
    {
        question: "What is the difference between primary and secondary shredding?",
        answer:
            "Primary shredding performs the initial reduction of bulky tyres into smaller pieces. Secondary shredding further reduces the material size to meet the requirements of subsequent processing and material separation.",
    },
    {
        question: "Can tyre recycling machines recover steel?",
        answer:
            "Yes. Tyre recycling systems can include magnetic separation equipment to recover steel wires from processed tyre material. The separation arrangement depends on the plant configuration.",
    },
    {
        question: "What materials can be recovered from waste tyres?",
        answer:
            "Waste tyre processing can recover rubber, steel, and textile fibres. These materials can be directed to suitable recycling or further processing applications.",
    },
    {
        question: "What factors should be considered when selecting a tyre recycling machine?",
        answer:
            "Important factors include the required processing capacity, tyre types, desired output size, machine configuration, available space, power requirements, maintenance requirements, and the level of material separation needed.",
    },
    {
        question: "Is a complete tyre recycling plant different from a tyre shredder?",
        answer:
            "Yes. A tyre shredder is an individual machine used for size reduction, whereas a complete tyre recycling plant can include multiple machines and material-handling systems to process tyres through different stages.",
    },
];

const TyreRecyclingMachineBlog = () => {
    const [activeSection, setActiveSection] = useState("introduction");
    const [openFAQ, setOpenFAQ] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i].id);

                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleFAQ = (index) => {
        setOpenFAQ((previous) => (previous === index ? null : index));
    };

    return (
        <div className={styles.pageWrapper}>
            <Helmet>
                <title>
                    Tyre Recycling Machine | Industrial Tyre Recycling Solutions -
                    Vikah Ecotech
                </title>

                <meta
                    name="description"
                    content="Explore tyre recycling machines, primary tyre shredders, secondary shredders, and steel separation systems. Learn about the tyre recycling process and industrial recycling solutions from Vikah Ecotech."
                />

                <meta
                    name="keywords"
                    content="tyre recycling machine, tyre recycling plant, waste tyre recycling machine, tyre shredder machine, primary tyre shredder, secondary tyre shredder, tyre recycling equipment, industrial tyre recycling machine, waste tyre processing"
                />

                <link
                    rel="canonical"
                    href="https://vikahecotech.com/tyre-recycling-machine"
                />

                <meta property="og:type" content="article" />

                <meta
                    property="og:title"
                    content="Tyre Recycling Machine | Vikah Ecotech"
                />

                <meta
                    property="og:description"
                    content="Learn about tyre recycling machines, the tyre recycling process, shredding technology, and material recovery."
                />

                <meta
                    property="og:url"
                    content="https://vikahecotech.com/tyre-recycling-machine"
                />

                <meta
                    property="og:image"
                    content="https://vikahecotech.com/images/tyre-recycling-machine.jpg"
                />

                <meta name="robots" content="index, follow" />
            </Helmet>

            {/* TABLE OF CONTENTS */}

            <nav className={styles.toc}>
                <h3>Explore Sections</h3>

                <ul>
                    {sections.map((section) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className={
                                    activeSection === section.id ? styles.active : ""
                                }
                            >
                                {section.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.blogWrapper}>
                <div className={styles.blogInner}>

                    {/* HERO SECTION */}

                    <div className={styles.heroSection}>
                        <div className={styles.heroContent}>
                            <span className={styles.heroBadge}>
                                Industrial Tyre Recycling Solutions
                            </span>

                            <h1 className={styles.heroTitle}>
                                Tyre Recycling Machine: Complete Guide to Waste Tyre
                                Recycling and Processing
                            </h1>

                            <p className={styles.heroDescription}>
                                Discover how industrial tyre recycling machines transform
                                discarded tyres into reusable materials through primary
                                shredding, secondary processing, and material separation.
                            </p>

                            <div className={styles.heroButtons}>
                                <a href="#working-process" className={styles.primaryBtn}>
                                    Explore Recycling Process
                                </a>

                                <a href="#faqs" className={styles.secondaryBtn}>
                                    Read FAQs
                                </a>
                            </div>
                        </div>

                        <div className={styles.heroImageWrapper}>
                            <img
                                src={BlogImg1}
                                alt="Industrial tyre recycling machine and tyre shredder"
                                className={styles.heroImage}
                            />
                        </div>
                    </div>

                    {/* INTRODUCTION */}

                    <section
                        id="introduction"
                        className={styles.sectionCard}
                    >
                        <div className={styles.contentGrid}>
                            <div className={styles.imageCard}>
                                <img
                                    src={BlogImg1}
                                    alt="Industrial waste tyre recycling machine"
                                />

                                <span>
                                    Industrial tyre recycling and shredding equipment
                                </span>
                            </div>

                            <div className={styles.textCard}>
                                <span className={styles.sectionTag}>
                                    Introduction
                                </span>

                                <h2>
                                    Understanding Modern Tyre Recycling Machines
                                </h2>

                                <p>
                                    Waste tyres are generated in large quantities through
                                    automobiles, commercial vehicles, and industrial
                                    transportation. Managing these discarded tyres is an
                                    important part of modern waste management and recycling.
                                </p>

                                <p>
                                    A tyre recycling machine is designed to process
                                    end-of-life tyres into smaller rubber pieces and recover
                                    valuable materials such as steel and textile fibres.
                                </p>

                                <p>
                                    Industrial tyre recycling systems use different machines
                                    working together to perform size reduction, material
                                    separation, and further processing.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* WHAT IS TYRE RECYCLING */}

                    <section
                        id="what-is-tyre-recycling"
                        className={styles.sectionCard}
                    >
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionTag}>
                                Tyre Recycling
                            </span>

                            <h2>
                                What Is a Tyre Recycling Machine?
                            </h2>
                        </div>

                        <p className={styles.sectionParagraph}>
                            A tyre recycling machine is specialized industrial
                            equipment used to process used and discarded tyres into
                            smaller, manageable material sizes. The processing system
                            may include primary shredders, secondary shredders,
                            rasper machines, conveyors, and separation equipment.
                        </p>

                        <p className={styles.sectionParagraph}>
                            Depending on the required output, the recycling line can
                            be configured to produce tyre chips, rubber granules,
                            and other processed rubber materials.
                        </p>

                        <div className={styles.highlightBox}>
                            <strong>
                                Important:
                            </strong>

                            <p>
                                A complete tyre recycling plant is not just one machine.
                                It is a combination of equipment designed to process
                                waste tyres through different stages.
                            </p>
                        </div>
                    </section>

                    {/* IMPORTANCE */}

                    <section
                        id="importance"
                        className={styles.sectionCard}
                    >
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionTag}>
                                Importance
                            </span>

                            <h2>
                                Why Is Tyre Recycling Important?
                            </h2>
                        </div>

                        <p>
                            Discarded tyres require proper handling because of their
                            size, durability, and slow natural decomposition.
                            Unmanaged tyre waste can create environmental and
                            storage challenges.
                        </p>

                        <p>
                            Industrial tyre recycling equipment helps convert
                            bulky waste tyres into processed materials that can
                            be used in further recycling applications.
                        </p>

                        <ul className={styles.modernList}>
                            <li>
                                Reduces the volume of bulky discarded tyres.
                            </li>

                            <li>
                                Supports recovery of rubber and steel materials.
                            </li>

                            <li>
                                Improves waste handling and storage.
                            </li>

                            <li>
                                Helps establish organized tyre recycling operations.
                            </li>

                            <li>
                                Supports resource recovery and circular economy practices.
                            </li>
                        </ul>
                    </section>

                    {/* WORKING PROCESS */}

                    <section
                        id="working-process"
                        className={styles.sectionCard}
                    >
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionTag}>
                                Working Process
                            </span>

                            <h2>
                                How Does a Tyre Recycling Machine Work?
                            </h2>

                            <p className={styles.sectionParagraph}>
                                A tyre recycling plant generally follows a sequence
                                of processing stages. The exact arrangement depends
                                on tyre types, required output size, and plant capacity.
                            </p>
                        </div>

                        <div className={styles.processGrid}>
                            {processSteps.map((item, index) => (
                                <div
                                    key={index}
                                    className={styles.processCard}
                                >
                                    <div className={styles.processNumber}>
                                        {item.step}
                                    </div>

                                    <h3>{item.title}</h3>

                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* MACHINERY */}

                    <section
                        id="machinery"
                        className={styles.sectionCard}
                    >
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionTag}>
                                Recycling Equipment
                            </span>

                            <h2>
                                Different Machines Used in a Tyre Recycling Plant
                            </h2>
                        </div>

                        <p>
                            A complete tyre recycling plant may contain several
                            types of industrial machinery. Each machine performs
                            a specific function during the recycling process.
                        </p>

                        <div className={styles.cardGrid}>
                            <div className={styles.smallInfoCard}>
                                <h4>Primary Tyre Shredder</h4>

                                <p>
                                    Performs initial size reduction of whole or prepared
                                    tyres into smaller tyre pieces.
                                </p>
                            </div>

                            <div className={styles.smallInfoCard}>
                                <h4>Secondary Shredder</h4>

                                <p>
                                    Further reduces primary shredded tyre material
                                    to the required processing size.
                                </p>
                            </div>

                            <div className={styles.smallInfoCard}>
                                <h4>Rasper Machine</h4>

                                <p>
                                    Processes tyre chips further to separate rubber
                                    from embedded steel and textile components.
                                </p>
                            </div>

                            <div className={styles.smallInfoCard}>
                                <h4>Magnetic Separator</h4>

                                <p>
                                    Helps separate recovered ferrous steel from
                                    processed tyre material.
                                </p>
                            </div>

                            <div className={styles.smallInfoCard}>
                                <h4>Conveyor Systems</h4>

                                <p>
                                    Transport tyres and processed materials between
                                    different machinery stages.
                                </p>
                            </div>

                            <div className={styles.smallInfoCard}>
                                <h4>Fibre Separation System</h4>

                                <p>
                                    Helps separate textile fibre from processed
                                    rubber material.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* PRIMARY SHREDDER */}

                    <section
                        id="primary-shredder"
                        className={styles.sectionCard}
                    >
                        <div className={styles.contentGrid}>
                            <div className={styles.textCard}>
                                <span className={styles.sectionTag}>
                                    Primary Shredding
                                </span>

                                <h2>
                                    Primary Tyre Shredder Machine
                                </h2>

                                <p>
                                    The primary tyre shredder is one of the most
                                    important machines in an industrial tyre
                                    recycling plant.
                                </p>

                                <p>
                                    It is designed to handle bulky tyres and perform
                                    the initial size reduction using heavy-duty
                                    rotating cutting systems.
                                </p>

                                <p>
                                    The resulting tyre pieces can be transferred
                                    to secondary shredding or other downstream
                                    processing equipment.
                                </p>

                                <ul className={styles.modernList}>
                                    <li>
                                        Designed for initial tyre size reduction.
                                    </li>

                                    <li>
                                        Heavy-duty industrial shredding arrangement.
                                    </li>

                                    <li>
                                        Supports continuous material processing
                                        when properly configured.
                                    </li>

                                    <li>
                                        Can be integrated with conveyor systems.
                                    </li>
                                </ul>

                                <Link to="/tyreshredder">
                                    Explore Tyre Shredder Machines →
                                </Link>
                            </div>

                            <div className={styles.imageCard}>
                                <img
                                    src={BlogImg2}
                                    alt="Primary tyre shredder machine for waste tyre recycling"
                                />

                                <span>
                                    Primary tyre shredding equipment
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* SECONDARY SHREDDER */}

                    <section
                        id="secondary-shredder"
                        className={styles.sectionCard}
                    >
                        <div className={styles.contentGrid}>
                            <div className={styles.imageCard}>
                                <img
                                    src={BlogImg3}
                                    alt="Secondary tyre shredding and recycling process"
                                />

                                <span>
                                    Further size reduction in tyre recycling
                                </span>
                            </div>

                            <div className={styles.textCard}>
                                <span className={styles.sectionTag}>
                                    Secondary Processing
                                </span>

                                <h2>
                                    Secondary Tyre Shredding
                                </h2>

                                <p>
                                    After primary shredding, tyre pieces may require
                                    further size reduction depending on the final
                                    material specifications.
                                </p>

                                <p>
                                    Secondary shredders and rasper systems are used
                                    in different configurations to process the
                                    material further.
                                </p>

                                <p>
                                    This stage helps prepare the material for
                                    subsequent steel and fibre separation.
                                </p>

                                <ul className={styles.modernList}>
                                    <li>
                                        Further reduces tyre chip size.
                                    </li>

                                    <li>
                                        Prepares material for downstream processing.
                                    </li>

                                    <li>
                                        Supports the overall recycling workflow.
                                    </li>
                                </ul>

                                <Link to="/secondaryshredder">
                                    Explore Secondary Shredders →
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* STEEL SEPARATION */}

                    <section
                        id="steel-separation"
                        className={styles.sectionCard}
                    >
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionTag}>
                                Material Recovery
                            </span>

                            <h2>
                                Steel and Fibre Separation in Tyre Recycling
                            </h2>
                        </div>

                        <p>
                            End-of-life tyres contain rubber along with steel
                            reinforcement and textile materials. These
                            components need to be separated during the
                            recycling process.
                        </p>

                        <p>
                            Magnetic separators are commonly integrated into
                            tyre recycling lines to recover ferrous steel.
                            Fibre separation systems help remove textile
                            material from the processed rubber.
                        </p>

                        <div className={styles.contentGrid}>
                            <div className={styles.smallInfoCard}>
                                <h4>Steel Recovery</h4>

                                <p>
                                    Magnetic separation equipment helps extract
                                    steel wires from processed tyre material.
                                </p>
                            </div>

                            <div className={styles.smallInfoCard}>
                                <h4>Fibre Recovery</h4>

                                <p>
                                    Fibre separation equipment helps remove
                                    textile components from the rubber stream.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* APPLICATIONS */}

                    <section
                        id="applications"
                        className={styles.sectionCard}
                    >
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionTag}>
                                Applications
                            </span>

                            <h2>
                                Applications of Tyre Recycling Machines
                            </h2>
                        </div>

                        <p>
                            Tyre recycling machines are used in industrial
                            facilities that process end-of-life tyres and
                            recover reusable materials.
                        </p>

                        <ul className={styles.modernList}>
                            <li>
                                Waste tyre recycling plants.
                            </li>

                            <li>
                                Rubber recycling facilities.
                            </li>

                            <li>
                                Tyre waste management operations.
                            </li>

                            <li>
                                Rubber granule production facilities.
                            </li>

                            <li>
                                Steel and rubber material recovery operations.
                            </li>

                            <li>
                                Industrial recycling and resource recovery plants.
                            </li>
                        </ul>
                    </section>

                    {/* BENEFITS */}

                    <section
                        id="benefits"
                        className={styles.sectionCard}
                    >
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionTag}>
                                Advantages
                            </span>

                            <h2>
                                Key Benefits of Industrial Tyre Recycling Machines
                            </h2>
                        </div>

                        <div className={styles.benefitsGrid}>
                            {benefitsData.map((item, index) => (
                                <div
                                    key={index}
                                    className={styles.benefitCard}
                                >
                                    <div className={styles.benefitIcon}>
                                        {item.icon}
                                    </div>

                                    <h3>{item.title}</h3>

                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SUSTAINABILITY */}

                    <section
                        id="sustainability"
                        className={styles.sectionCard}
                    >
                        <div className={styles.contentGrid}>
                            <div className={styles.imageCard}>
                                <img
                                    src={BlogImg4}
                                    alt="Waste tyre recycling for sustainable rubber recovery"
                                />

                                <span>
                                    Waste tyre recycling and material recovery
                                </span>
                            </div>

                            <div className={styles.textCard}>
                                <span className={styles.sectionTag}>
                                    Sustainability
                                </span>

                                <h2>
                                    Environmental Benefits of Tyre Recycling
                                </h2>

                                <p>
                                    Tyre recycling plays an important role in
                                    responsible waste management by recovering
                                    useful materials from discarded tyres.
                                </p>

                                <p>
                                    Processing waste tyres helps reduce the amount
                                    of bulky tyre waste requiring disposal and
                                    supports the reuse of recovered rubber and steel.
                                </p>

                                <p>
                                    Industrial recycling systems also contribute
                                    to resource efficiency by converting waste
                                    materials into useful secondary resources.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* MACHINE SELECTION */}

                    <section
                        id="selection"
                        className={styles.sectionCard}
                    >
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionTag}>
                                Machine Selection
                            </span>

                            <h2>
                                How to Choose the Right Tyre Recycling Machine?
                            </h2>
                        </div>

                        <p>
                            Selecting the right tyre recycling machine
                            requires understanding the processing requirements
                            of your recycling facility.
                        </p>

                        <p>
                            Before selecting equipment, consider the following
                            factors:
                        </p>

                        <ul className={styles.modernList}>
                            <li>
                                <strong>Processing Capacity:</strong> Determine
                                the required tyre processing capacity.
                            </li>

                            <li>
                                <strong>Tyre Types:</strong> Consider the
                                different tyre sizes and types to be processed.
                            </li>

                            <li>
                                <strong>Output Requirements:</strong> Identify
                                the required output size and material quality.
                            </li>

                            <li>
                                <strong>Machine Configuration:</strong> Choose
                                suitable primary and secondary processing
                                equipment.
                            </li>

                            <li>
                                <strong>Material Separation:</strong> Consider
                                steel and textile fibre recovery requirements.
                            </li>

                            <li>
                                <strong>Maintenance:</strong> Evaluate accessibility,
                                cutter maintenance, and machine service requirements.
                            </li>

                            <li>
                                <strong>Plant Integration:</strong> Check conveyor
                                arrangements, power requirements, and available
                                installation space.
                            </li>
                        </ul>

                        <div className={styles.highlightBox}>
                            <h3>
                                Plan Your Tyre Recycling Plant
                            </h3>

                            <p>
                                The right equipment configuration depends on
                                your processing capacity, material requirements,
                                and final output specifications.
                            </p>
                        </div>
                    </section>

                    {/* CONCLUSION */}

                    <section
                        id="conclusion"
                        className={styles.sectionCard}
                    >
                        <div className={styles.contentGrid}>
                            <div className={styles.imageCard}>
                                <img
                                    src={BlogImg2}
                                    alt="Industrial tyre recycling and shredding machinery"
                                />

                                <span>
                                    Industrial tyre recycling machinery
                                </span>
                            </div>

                            <div className={styles.textCard}>
                                <span className={styles.sectionTag}>
                                    Conclusion
                                </span>

                                <h2>
                                    Building an Efficient Tyre Recycling Plant
                                </h2>

                                <p>
                                    Tyre recycling machines are essential for
                                    processing discarded tyres and recovering
                                    valuable materials.
                                </p>

                                <p>
                                    From primary shredding and secondary processing
                                    to steel and fibre separation, every stage
                                    contributes to an organized recycling operation.
                                </p>

                                <p>
                                    Selecting suitable machinery and designing
                                    the right processing arrangement can help
                                    establish an efficient and sustainable
                                    tyre recycling facility.
                                </p>

                                <p>
                                    Vikah Ecotech provides industrial shredding
                                    and recycling machinery designed for different
                                    material processing requirements.
                                </p>

                                <Link to="/tyreshredder">
                                    Explore Vikah Ecotech Tyre Shredders →
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}

                    <section
                        id="faqs"
                        className={styles.sectionCard}
                    >
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionTag}>
                                FAQs
                            </span>

                            <h2>
                                Frequently Asked Questions About Tyre Recycling Machines
                            </h2>
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
                                        role="button"
                                        tabIndex={0}
                                        aria-expanded={openFAQ === index}
                                        onKeyDown={(event) => {
                                            if (
                                                event.key === "Enter" ||
                                                event.key === " "
                                            ) {
                                                event.preventDefault();
                                                toggleFAQ(index);
                                            }
                                        }}
                                    >
                                        <span>{faq.question}</span>

                                        <span className={styles.faqIcon}>
                                            {openFAQ === index ? "−" : "+"}
                                        </span>
                                    </div>

                                    <div className={styles.faqAnswerWrapper}>
                                        <div className={styles.faqAnswer}>
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* RELATED PAGES */}


            <aside className={styles.relatedSidebar}>
                <h3 className={styles.relatedTitle}>
                    Related Pages
                </h3>

                <div className={`${styles.relatedCard} ${styles.floatCard}`}>
                    <Link to="/tyreshredder">
                        Tyre Shredder Machine →
                    </Link>
                </div>

                <div className={`${styles.relatedCard} ${styles.floatCard}`}>
                    <Link to="/primary-shredder">
                        Primary Shredder Machine →
                    </Link>
                </div>

                <div className={`${styles.relatedCard} ${styles.floatCard}`}>
                    <Link to="/secondary-shredder">
                        Secondary Shredder →
                    </Link>
                </div>

                <div className={`${styles.relatedCard} ${styles.floatCard}`}>
                    <Link to="/rasper_secondaryshredders">
                        Rasper Machine →
                    </Link>
                </div>

                <div className={`${styles.relatedCard} ${styles.floatCard}`}>
                    <Link to="/magnetic-steel-separators">
                        Magnetic Steel Separator →
                    </Link>
                </div>

                <div className={`${styles.relatedCard} ${styles.floatCard}`}>
                    <Link to="/fibre-seperator">
                        Fibre Separator →
                    </Link>
                </div>

                {/* <div className={`${styles.relatedCard} ${styles.floatCard}`}>
                    <Link to="/tyre-recycling-plant-manufacturers">
                        Tyre Recycling Plant Manufacturers →
                    </Link>
                </div>

                <div className={`${styles.relatedCard} ${styles.floatCard}`}>
                    <Link to="/bloglandingpage">
                        Explore All Blogs →
                    </Link>
                </div> */}
            </aside>

        </div>
    );
};

export default TyreRecyclingMachineBlog;
