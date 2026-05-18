// OtherEqpTemp.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./OtherEqpTemp.css";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "feeding", label: "Feeding & Handling" },
  { id: "flow", label: "Flow " },
  { id: "screening", label: "Screening & Separation" },
  { id: "cutting", label: "Cutting & Preparation" },
  { id: "packing", label: "Packing " },
];

const PRODUCT_LINKS = {
  "STEEL CLEANING": "/steel-cleaning",
  "TUMBLE BACK FEEDER": "/tumble-back-feeder",
  "FEEDING & DISCHARGE CONVEYORS": "/feeding-discharge-conveyers",
  VIBRATORS: "/vibrators",
  CLASSIFIERS: "/classifiers",
  "OVERBAND MAGNETIC STEEL SEPARATORS": "/magnetic-steel-separators",
  "BEAD WIRE REMOVER": "/beedwire-remover",
  "STRIP CUTTER": "/strip-cutter",
  "BLOCK CUTTER": "/block-cutter",
  "SIDE WALL REMOVER": "/sidewall-remover",
  "FOLDING EQUIPMENT": "/tyrefolding",
  "DUST COLLECTOR": "/dust-collector",
  "VIBRO HOPPER": "/vibro-hopper",
  "FIBRE SEPARATOR": "/fibre-seperator",
};

const PRODUCTS = [
  {
    id: "steel-cleaning",
    name: "STEEL CLEANING",
    category: "screening",
    pillar: "Screening & Separation",
    description:
      "Separates embedded rubber remnants from extracted tyre steel wire. Delivers highly purified steel ready for smelting while reclaiming high-quality rubber particles.",
    materials: ["Tyre Steel Wire", "Rubber Contaminants"],
  },
  {
    id: "tumble-back-feeder",
    name: "TUMBLE BACK FEEDER",
    category: "feeding",
    pillar: "Feeding & Handling",
    description:
      "Provides a steady and controlled flow of raw materials into the recycling line. Reduces manual handling and prevents jams. Suitable for rubber, plastic, paper, cardboard, and other materials.",
    materials: ["Rubber", "Plastic", "Paper", "Cardboard"],
  },
  {
    id: "feed-discharge-conveyors",
    name: "FEEDING & DISCHARGE CONVEYORS",
    category: "feeding",
    pillar: "Feeding & Handling",
    description:
      "Heavy-duty conveyors for smooth transport of raw or processed materials. Prevents bottlenecks and reduces manual labor. Works with rubber, plastic, paper, cardboard, and more.",
    materials: ["Rubber", "Plastic", "Paper", "Cardboard"],
  },
  {
    id: "vibrators",
    name: "VIBRATORS",
    category: "flow",
    pillar: "Flow",
    description:
      "Prevents clumping by evenly distributing particles through vibration. Maintains consistent flow for classification and ensures high-quality output. Suitable for rubber, plastic, paper, cardboard, and more.",
    materials: ["Fine Rubber", "Plastics", "Powders"],
  },
  {
    id: "classifiers",
    name: "CLASSIFIERS",
    category: "screening",
    pillar: "Screening & Separation",
    description:
      "Separates materials into precise size ranges using advanced sieving. Ensures powders or chips meet quality standards. Works with rubber, plastic, paper, cardboard, and other feedstocks.",
    materials: ["Rubber Granules", "Plastic Flakes", "Fiber"],
  },
  {
    id: "overband-magnets",
    name: "OVERBAND MAGNETIC STEEL SEPARATORS",
    category: "screening",
    pillar: "Screening & Separation",
    description:
      "Uses powerful magnets to remove ferrous materials such as steel wires. Improves purity, enhances safety, and extends equipment life. Effective for rubber, plastic, paper, cardboard, and more.",
    materials: ["Steel Wire", "Ferrous Contamination"],
  },
  {
    id: "bead-wire-remover",
    name: "BEAD WIRE REMOVER",
    category: "cutting",
    pillar: "Cutting & Preparation",
    description:
      "Extracts strong bead wires before shredding to reduce machine stress and recover valuable steel. Ideal for pre-processing truck and car tyres.",
    materials: ["Tyre Bead Wire"],
  },
  {
    id: "strip-cutter",
    name: "STRIP CUTTER",
    category: "cutting",
    pillar: "Cutting & Preparation",
    description:
      "Cuts tyres into manageable strips for further processing. Improves machine throughput and prevents blockages. Simplifies downstream shredding.",
    materials: ["Truck Tyres", "Passenger Tyres"],
  },
  {
    id: "block-cutter",
    name: "BLOCK CUTTER",
    category: "cutting",
    pillar: "Cutting & Preparation",
    description:
      "Cuts rubber strips into smaller blocks for fine shredding or grinding. Ensures consistent feed size and smoother recycling flow.",
    materials: ["Rubber Blocks", "Pre-shred Tyres"],
  },
  {
    id: "sidewall-remover",
    name: "SIDE WALL REMOVER",
    category: "cutting",
    pillar: "Cutting & Preparation",
    description:
      "Removes tyre sidewalls efficiently to simplify cutting and prepare cleaner material for shredding. Speeds up processing and reduces wear on machines.",
    materials: ["Car & Truck Tyres"],
  },
  {
    id: "folding-equipment",
    name: "FOLDING EQUIPMENT",
    category: "packing",
    pillar: "Packing",
    description:
      "Folds processed rubber sheets or components into compact stacks. Saves storage space and improves handling efficiency for shipping and warehousing.",
    materials: ["Rubber Sheets", "Cut Strips"],
  },
  {
    id: "dust-collector",
    name: "DUST COLLECTOR",
    category: "flow",
    pillar: "Flow",
    description:
      "Efficiently captures and removes dust particles generated during recycling operations. Improves air quality, ensures cleaner working environment, and enhances machine life.",
    materials: ["Fine Dust", "Airborne Particles"],
  },
  {
    id: "vibro-hopper",
    name: "VIBRO HOPPER",
    category: "feeding",
    pillar: "Feeding & Handling",
    description:
      "Designed for efficient storage and vibration-assisted feeding of bulk materials into processing lines. Prevents clogging and ensures smooth, continuous material flow.",
    materials: ["Rubber", "Plastic", "Bulk Waste"],
  },
  {
    id: "fibre-separator",
    name: "FIBRE SEPARATOR",
    category: "screening",
    pillar: "Screening & Separation",
    description:
      "Separates lightweight fibre contaminants from rubber granules and powders to improve product purity and quality in tyre recycling operations.",
    materials: ["Rubber Powder", "Fibre", "Textile Waste"],
  },
];

function OtherEqpTemp() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProducts = useMemo(
    () =>
      PRODUCTS.filter((p) => {
        const matchesCategory = category === "all" || p.category === category;
        if (!matchesCategory) return false;

        if (!normalizedSearch) return true;

        const haystack = (p.name + " " + p.description + " " + p.pillar)
          .toLowerCase()
          .trim();
        return haystack.includes(normalizedSearch);
      }),
    [category, normalizedSearch],
  );

  return (
    <div className="oe-wrapper">
      <Helmet>
        <title>Other Recycling Equipments | Vikah Ecotech</title>
        <meta
          name="description"
          content="Explore supporting machinery including feeders, conveyors, cutters, magnets, separators, and flow equipment for tyre & solid waste recycling lines."
        />
        <meta
          name="keywords"
          content="Recycling Equipment, Steel Cleaning, Feeding Machines, Cutting Machines, Screening Machinery, Tyre Recycling Equipment,Tumble Back Feeder,Feeding & Discharge Conveyors,Vibratory Feeders,Classifiers,Overband Magnetic Steel Separators,Beadwire Remover,Strip Cutter,Block Cutter,Side Wall Remover,Tyre Folding"
        />
        <link rel="canonical" href="https://vikahecotech.com/other-equipment" />
      </Helmet>

      <div className="oe-container">
        {/* Header row */}
        <div className="oe-headerRow">
          <div className="oe-heading">
            <div className="oe-kicker">Supporting equipment</div>
            <h1 className="oe-title">Other Equipment</h1>
            <p className="oe-subtitle">
              Feeding, conveying, separation and cutting equipment that
              completes your tyre &amp; solid waste recycling line.
            </p>
          </div>

          <div className="oe-controls">
            {/* Search bar */}
            <div className="oe-searchWrap">
              <input
                className="oe-searchInput"
                placeholder="Search equipment by name or function..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className="oe-searchClear"
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category chips */}
            <div className="oe-chips">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={
                    "oe-chip" + (category === c.id ? " oe-chip--active" : "")
                  }
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards section */}
        <section className="oe-gridSection">
          {filteredProducts.length === 0 ? (
            <div className="oe-empty">
              <h3>No equipment found</h3>
              <p>Try a different category or adjust your search keywords.</p>
            </div>
          ) : (
            <div className="oe-grid">
              {filteredProducts.map((product) => (
                <article key={product.id} className="oe-card">
                  <div className="oe-cardPill">{product.pillar}</div>

                  <h3 className="oe-cardTitle">{product.name}</h3>
                  <p className="oe-cardDesc">{product.description}</p>

                  {product.materials?.length > 0 && (
                    <div className="oe-cardMeta">
                      <span className="oe-cardMetaLabel">Handles</span>
                      <span className="oe-cardMetaTags">
                        {product.materials.join(" • ")}
                      </span>
                    </div>
                  )}

                  <div className="oe-btnRow">
                    <Link
                      to={`/enquire?machinery=other-equipment&model=${encodeURIComponent(
                        product.name,
                      )}`}
                      className="oe-cardBtn"
                    >
                      Enquire →
                    </Link>

                    <Link
                      to={PRODUCT_LINKS[product.name] || "#"}
                      className="oe-cardBtn oe-exploreBtn"
                    >
                      Explore →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default OtherEqpTemp;