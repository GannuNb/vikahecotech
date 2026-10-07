import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductAccordion.module.css';

// --- IMAGE IMPORTS ---
import Baler from "../../images/baler.png";
import shredderhdimg from "../../images/Shedder _ Final PNG.png";
import img1 from "../../images/whatsup images/WhatsApp Image 2024-07-11 at 11.56.50 AM.jpeg";
import img2 from "../../images/whatsup images/WhatsApp Image 2024-07-11 at 11.56.49 AM(1).jpeg";
import shredderhd from "../../images/shredder_hd.jpg";
import shredderhd1 from "../../images/shredder_hd1.jpg";
import ssshredderhdimg from "../../images/R4.jpg";
import ssshredderhd from "../../images/R1.png";

/* Application Specific Visuals */
import plas_main from "../../images/Applications/plas14.webp";
import plas_img1 from "../../images/Applications/plas16.jpg";
import plas_img2 from "../../images/Applications/plas18.jpeg";
import metal_img1 from "../../images/Applications/appm1.jpg";
import metal_img2 from "../../images/Applications/appm4.jpg";
import metal_img3 from "../../images/Applications/appm6.jpg";
import pcb_main from "../../images/Applications/apppcb1.jpg";
import pcb_img1 from "../../images/Applications/apppcb6.webp";
import pcb_img2 from "../../images/Applications/apppcb3.jpg";
import shp_img1 from "../../images/Applications/shredp1.png";
import shp_img2 from "../../images/Applications/shredp4.webp";
import shp_img3 from "../../images/Applications/shredp2.jpeg";
import shm_main from "../../images/Applications/shredm1.jpg";
import shpcb_1 from "../../images/Applications/shredpcb1.jpg";
import shpcb_2 from "../../images/Applications/shredpcb4.jpg";
import shpcb_3 from "../../images/Applications/shredpcb7.jpg";
import sec_plas from "../../images/Applications/secplas.jpg";
import sec_metal from "../../images/Applications/secmetal.webp";
import sec_pcb from "../../images/Applications/secpcb.webp";
import ewaste from "../../images/Applications/shredewaste.jpeg";

export const productRegistry = {
    "BALER": {
        categoryIcon: Baler,
        "Tyre Scrap Baler": {
            blurb: "Hydraulic balers for tyre scrap",
            description: "Hydraulic balers specially configured for high-pressure tyre scrap baling.",
            items: [
                { id: 1, model: "BLT150", img: img1, link: "/blt150" },
                { id: 2, model: "BLT200", img: img2, link: "/blt200" },
                { id: 3, model: "BLT250", img: Baler, link: "/blt250" },
            ]
        },
        "Plastic Baler": {
            blurb: "For plastic flakes & bottles",
            description: "Efficient baling solutions for various plastic materials including PET and HDPE.",
            items: [
                { id: 4, model: "BLP30", img: plas_main, link: "/blp30" },
                { id: 5, model: "BLP40", img: plas_img1, link: "/blp40" },
                { id: 6, model: "BLP50", img: plas_img2, link: "/blp50" },
            ]
        },
        "Paper & Cardboard Baler": {
            blurb: "For paper & corrugated cardboard",
            description: "High-density baling for paper waste, magazines, and corrugated cardboard.",
            items: [
                { id: 7, model: "BLC30", img: pcb_main, link: "/blc30" },
                { id: 8, model: "BLC40", img: pcb_img1, link: "/blc40" },
                { id: 9, model: "BLC50", img: pcb_img2, link: "/blc50" },
            ]
        },
        "Metal Baler": {
            blurb: "For metallic scrap",
            description: "Heavy-duty baling for metallic waste, aluminum cans, and light scrap metal.",
            items: [
                { id: 10, model: "BLM150", img: metal_img1, link: "/blm150" },
                { id: 11, model: "BLM200", img: metal_img2, link: "/blm200" },
                { id: 12, model: "BLM250", img: metal_img3, link: "/blm250" },
            ]
        }
    },
    "PRIMARY SHREDDER": {
        categoryIcon: shredderhd,
        "Tyre Shredder": {
            blurb: "Heavy duty primary tyre shredding",
            description: "Twin-shaft shredders designed for primary reduction of OTR, truck, and car tyres.",
            items: [
                { id: 13, model: "SHT6000", img: shredderhd, link: "/sht6000" },
                { id: 14, model: "SHT8000", img: shredderhd1, link: "/sht8000" },
                { id: 15, model: "SHT12000", img: shredderhdimg, link: "/sht12000" },
            ]
        },
        "Plastic Primary Shredder": {
            blurb: "Industrial plastic shredder",
            description: "Powerful shredding for plastic drums, pipes, and large bulky waste.",
            items: [
                { id: 16, model: "SHP100", img: shp_img1, link: "/shp100" },
                { id: 17, model: "SHP150", img: shp_img2, link: "/shp150" },
                { id: 18, model: "SHP200", img: shp_img3, link: "/shp200" },
            ]
        },
        "Metal Primary Shredder": {
            blurb: "Scrap metal shredding",
            description: "High-torque shredders for light iron, aluminum profiles, and metal sheets.",
            items: [
                { id: 19, model: "SHM4000", img: shm_main, link: "/shm4000" },
            ]
        },
        "Paper & Cardboard Primary Shredder": {
            blurb: "Bulk paper processing",
            description: "Industrial shredding for high-volume paper and cardboard recycling plants.",
            items: [
                { id: 20, model: "SHC6000", img: shpcb_1, link: "/shc6000" },
                { id: 21, model: "SHC8000", img: shpcb_2, link: "/shc8000" },
                { id: 22, model: "SHC12000", img: shpcb_3, link: "/shc12000" },
            ]
        },
        "E-Waste Primary Shredder": {
            blurb: "Electronic waste recycling",
            description: "Specialized shredding for hard drives, circuit boards, and appliances.",
            items: [
                { id: 23, model: "SHE400", img: ewaste, link: "/ewasteshredder" },
            ]
        }
    },
    "SECONDARY SHREDDER": {
        categoryIcon: ssshredderhdimg,
        "Rasper": {
            blurb: "Secondary steel liberation",
            description: "Precision raspers for wire liberation and high-quality rubber mulch production.",
            items: [
                { id: 24, model: "RST4000", img: ssshredderhdimg, link: "/rst4000" },
                { id: 25, model: "RST6000", img: ssshredderhd, link: "/rst6000" },
            ]
        },
        "Secondary Shredder for Metal": {
            blurb: "Fine metal shredding",
            description: "Secondary processing for metal purification.",
            items: [],
            fallbackImg: sec_metal,
            link: "/secondarymetalshredder"
        },
        "Secondary Shredder for Plastic": {
            blurb: "Plastic granulation",
            description: "Refining plastics into small uniform granules.",
            items: [],
            fallbackImg: sec_plas,
            link: "/secondaryplasticshredder"
        },
        "Secondary Shredder for Paper & Cardboard": {
            blurb: "Confidential shredding",
            description: "Secondary shredding for high-security document destruction.",
            items: [],
            fallbackImg: sec_pcb,
            link: "/secondarypcb"
        }
    }
};

const ProductAccordion = ({ title, applications, isOpen, onToggle, searchQuery }) => {
    const registryKey = title ? title.toUpperCase() : "";
    const categoryData = productRegistry[registryKey] || {};
    
    const tabs = useMemo(() => 
        Object.keys(categoryData).filter(key => key !== 'categoryIcon'),
    [categoryData]);

    const [activeTab, setActiveTab] = useState(tabs[0] || "");

    useEffect(() => {
        if (tabs.length > 0 && (!activeTab || !tabs.includes(activeTab))) {
            setActiveTab(tabs[0]);
        }
    }, [tabs, activeTab]);

    useEffect(() => {
        if (!searchQuery) return;
        const query = searchQuery.toLowerCase().trim();
        const matchingTab = tabs.find(tab => {
            const tabNameMatch = tab.toLowerCase().includes(query);
            const tabItems = categoryData[tab]?.items || [];
            const modelMatch = tabItems.some(item => item.model.toLowerCase().includes(query));
            return tabNameMatch || modelMatch;
        });
        if (matchingTab && matchingTab !== activeTab) {
            setActiveTab(matchingTab);
        }
    }, [searchQuery, tabs, categoryData, activeTab]);

    const activeData = categoryData[activeTab] || { items: [], description: "" };

    const filteredItems = useMemo(() => {
        if (!searchQuery || searchQuery.trim() === "") {
            return activeData.items || [];
        }
        const query = searchQuery.toLowerCase().trim();
        const isTabMatch = activeTab.toLowerCase().includes(query);
        if (isTabMatch) {
            return activeData.items || [];
        }
        return (activeData.items || []).filter(item =>
            item.model.toLowerCase().includes(query)
        );
    }, [activeData.items, activeTab, searchQuery]);

    return (
        <div className={styles.accordionItem}>
            <div className={styles.header} onClick={onToggle}>
                <div className={styles.headerInfo}>
                    <div className={styles.categoryCircle}>
                        <img src={categoryData.categoryIcon} alt="" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
                    </div>
                    <div>
                        <h2 className={styles.mainTitle}>{title}</h2>
                        <p className={styles.appSubtitle}>Applications: {applications}</p>
                    </div>
                </div>
                <span className={styles.chevron}>{isOpen ? '▲' : '▼'}</span>
            </div>

            {isOpen && (
                <div className={styles.body}>
                    <div className={styles.sidebar}>
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={activeTab === tab ? styles.activeTab : styles.tabBtn}
                                onClick={() => setActiveTab(tab)}
                            >
                                <div className={styles.tabContent}>
                                    <span className={styles.tabIcon}>⚙️</span>
                                    <div className={styles.tabText}>
                                        <span className={styles.tabLabel}>{tab}</span>
                                        <span className={styles.tabBlurb}>{categoryData[tab].blurb}</span>
                                    </div>
                                    <span className={styles.tabArrow}>›</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className={styles.contentArea}>
                        <div className={styles.contentHeader}>
                            <h3 className={styles.contentTitle}>
                                {activeTab ? `${activeTab} ` : ""}
                            </h3>
                            <p className={styles.contentDesc}>{activeData.description}</p>
                        </div>

                        <div className={styles.productGrid}>
                            {/* CASE 1: Specific models exist and are found via filter */}
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item) => (
                                    <ProductCard key={item.id} item={item} type={activeTab} mainCategory={registryKey} />
                                ))
                            ) : (
                                /* CASE 2: No models exist in the registry for this tab (like Secondary Metal) */
                                activeData.items && activeData.items.length === 0 && activeData.link ? (
                                    <ProductCard 
                                        item={{ 
                                            model: `${activeTab}`, 
                                            img: activeData.fallbackImg, 
                                            link: activeData.link 
                                        }} 
                                        type={activeTab} 
                                        mainCategory={registryKey} 
                                    />
                                ) : (
                                    /* CASE 3: Search returned no matches */
                                    searchQuery && searchQuery.trim() !== "" && (
                                        <div className={styles.noResults}>
                                            <p>No specific models match "{searchQuery}" in this category.</p>
                                        </div>
                                    )
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProductCard = ({ item, type, mainCategory }) => (
    <div className={styles.card}>
        <div className={styles.machinePlaceholder}>
            <img src={item.img} alt={item.model} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
        </div>
        <h4 className={styles.productModel}>{item.model}</h4>
        <div className={styles.tagWrapper}>
            <span className={styles.greenTag}>
                {type} {mainCategory.includes("SHREDDER") ? "Shredder" : "Baler"}
            </span>
        </div>
        <Link to={item.link} className={styles.viewProductBtn}>View Product →</Link>
    </div>
);

export default ProductAccordion;