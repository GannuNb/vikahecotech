import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ============================================================
// IMAGES
// ============================================================

import logo from "../../../../images/logo.png";

import machineImage from "../../../../images/R1.png";
import machineImage2 from "../../../../images/secondary-shredders/R2.png";
import machineImage3 from "../../../../images/Machinery images/Rasper.jpeg";

// ============================================================
// RST-2000 PDF GENERATOR
// ============================================================

const generateRst2000Pdf = () => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Reserve enough space for footer
  const footerHeight = 18;

  // ==========================================================
  // COLORS
  // ==========================================================

  const COLORS = {
    black: [30, 30, 30],
    dark: [45, 45, 45],
    grey: [105, 105, 105],
    lightGrey: [245, 245, 245],
    border: [215, 215, 215],
    white: [255, 255, 255],
  };

  // ==========================================================
  // PDF INFORMATION
  // ==========================================================

  doc.setProperties({
    title: "RST-2000 Technical Specification",
    subject: "RST-2000 Secondary Rasper",
    author: "Vikah Ecotech",
    keywords:
      "RST-2000, Rasper, Tyre Recycling, Vikah Ecotech",
    creator: "Vikah Ecotech",
  });

  // ==========================================================
  // HEADER
  // ==========================================================

  const drawHeader = () => {
    try {
      doc.addImage(
        logo,
        "PNG",
        margin,
        9,
        42,
        17
      );
    } catch (error) {
      console.warn("Logo could not be loaded:", error);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...COLORS.black);

      doc.text(
        "VIKAH ECOTECH",
        margin,
        20
      );
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.grey);

    doc.text(
      "Recycling & Waste Management Solutions",
      margin,
      30
    );

    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.4);

    doc.line(
      margin,
      35,
      pageWidth - margin,
      35
    );
  };

  // ==========================================================
  // FOOTER
  // ==========================================================

  const drawFooter = (
    pageNumber,
    totalPages
  ) => {
    const footerY =
      pageHeight - footerHeight;

    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.35);

    doc.line(
      margin,
      footerY,
      pageWidth - margin,
      footerY
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);

    doc.setTextColor(...COLORS.grey);

    doc.text(
      "Vikah Ecotech | RST-2000 Technical Datasheet",
      margin,
      footerY + 7
    );

    doc.text(
      `Page ${pageNumber} of ${totalPages}`,
      pageWidth - margin,
      footerY + 7,
      {
        align: "right",
      }
    );
  };

  // ==========================================================
  // SECTION TITLE
  // ==========================================================

  const drawSectionTitle = (
    title,
    y
  ) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);

    doc.setTextColor(
      ...COLORS.black
    );

    doc.text(
      title,
      margin,
      y
    );

    doc.setDrawColor(
      ...COLORS.border
    );

    doc.setLineWidth(0.35);

    doc.line(
      margin,
      y + 3,
      pageWidth - margin,
      y + 3
    );
  };

  // ==========================================================
  // IMAGE CONTAIN
  // ==========================================================

  const addImageContain = (
    image,
    format,
    x,
    y,
    boxWidth,
    boxHeight
  ) => {
    try {
      const properties =
        doc.getImageProperties(image);

      const imageRatio =
        properties.width /
        properties.height;

      const boxRatio =
        boxWidth / boxHeight;

      let finalWidth;
      let finalHeight;

      if (imageRatio > boxRatio) {
        finalWidth = boxWidth;
        finalHeight =
          boxWidth / imageRatio;
      } else {
        finalHeight = boxHeight;
        finalWidth =
          boxHeight * imageRatio;
      }

      const finalX =
        x +
        (boxWidth - finalWidth) / 2;

      const finalY =
        y +
        (boxHeight - finalHeight) / 2;

      // Image background
      doc.setFillColor(
        ...COLORS.lightGrey
      );

      doc.roundedRect(
        x,
        y,
        boxWidth,
        boxHeight,
        2,
        2,
        "F"
      );

      doc.addImage(
        image,
        format,
        finalX,
        finalY,
        finalWidth,
        finalHeight
      );
    } catch (error) {
      console.warn(
        "Image could not be loaded:",
        error
      );
    }
  };

  // ==========================================================
  // SPECIFICATION TABLE
  // ==========================================================

  const createSpecificationTable = (
    startY,
    rows
  ) => {
    autoTable(doc, {
      startY,

      head: [
        [
          "Specification",
          "Details",
        ],
      ],

      body: rows,

      theme: "grid",

      styles: {
        font: "helvetica",
        fontSize: 8.5,

        cellPadding: 3.8,

        textColor:
          COLORS.black,

        lineColor:
          COLORS.border,

        lineWidth: 0.25,

        valign: "middle",
      },

      headStyles: {
        font: "helvetica",
        fontStyle: "bold",

        fontSize: 8.5,

        textColor:
          COLORS.white,

        fillColor:
          COLORS.dark,

        halign: "left",
        valign: "middle",
      },

      alternateRowStyles: {
        fillColor:
          COLORS.lightGrey,
      },

      columnStyles: {
        0: {
          cellWidth: 62,
          fontStyle: "bold",
        },

        1: {
          cellWidth:
            contentWidth - 62,
        },
      },

      margin: {
        left: margin,
        right: margin,

        bottom:
          margin +
          footerHeight,
      },

      rowPageBreak:
        "avoid",
    });

    return doc.lastAutoTable.finalY;
  };

  // ==========================================================
  // PAGE 1
  // PRODUCT OVERVIEW
  // ==========================================================

  drawHeader();

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(30);

  doc.setTextColor(
    ...COLORS.black
  );

  doc.text(
    "RST-2000",
    margin,
    53
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(14);

  doc.text(
    "Secondary Rasper",
    margin,
    62
  );

  doc.setFontSize(9.5);

  doc.setTextColor(
    ...COLORS.grey
  );

  doc.text(
    "Technical Specification & Product Datasheet",
    margin,
    70
  );

  // ----------------------------------------------------------
  // MAIN IMAGE
  // ----------------------------------------------------------

  addImageContain(
    machineImage,
    "PNG",
    margin,
    82,
    contentWidth,
    82
  );

  doc.setFont(
    "helvetica",
    "italic"
  );

  doc.setFontSize(7.5);

  doc.setTextColor(
    ...COLORS.grey
  );

  doc.text(
    "RST-2000 Secondary Rasper",
    pageWidth / 2,
    169,
    {
      align: "center",
    }
  );

  // ----------------------------------------------------------
  // PRODUCT OVERVIEW
  // ----------------------------------------------------------

  drawSectionTitle(
    "Product Overview",
    183
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(9.3);

  doc.setTextColor(
    ...COLORS.black
  );

  const overviewText =
    "The RST-2000 is an entry-level secondary tyre rasper designed for efficient processing of pre-shredded tyre chips. It reduces relatively coarse tyre material into smaller rubber particles suitable for further screening, steel separation and granulation.";

  const overviewText2 =
    "Its compact cutting chamber and optimized rotor arrangement make the RST-2000 suitable for small to medium-scale tyre recycling plants where reliable secondary processing and controlled output size are required.";

  const overviewText3 =
    "The machine incorporates hardened cutting knives, automatic overload protection and PLC-based controls to provide stable operation with reduced manual intervention.";

  let overviewY = 193;

  const lines1 =
    doc.splitTextToSize(
      overviewText,
      contentWidth
    );

  doc.text(
    lines1,
    margin,
    overviewY
  );

  overviewY +=
    lines1.length * 4.8 + 4;

  const lines2 =
    doc.splitTextToSize(
      overviewText2,
      contentWidth
    );

  doc.text(
    lines2,
    margin,
    overviewY
  );

  overviewY +=
    lines2.length * 4.8 + 4;

  const lines3 =
    doc.splitTextToSize(
      overviewText3,
      contentWidth
    );

  doc.text(
    lines3,
    margin,
    overviewY
  );

  // ==========================================================
  // PAGE 2
  // FEATURES + ELECTRICAL
  // ==========================================================

  doc.addPage();

  drawHeader();

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(22);

  doc.setTextColor(
    ...COLORS.black
  );

  doc.text(
    "RST-2000",
    margin,
    50
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(9);

  doc.setTextColor(
    ...COLORS.grey
  );

  doc.text(
    "Features & Electrical Specifications",
    margin,
    58
  );

  // ----------------------------------------------------------
  // FEATURES
  // ----------------------------------------------------------

  drawSectionTitle(
    "Key Features",
    72
  );

  const features = [
    "Compact heavy-duty cutting chamber.",
    "Hardened alloy steel cutting knives.",
    "Optimized rotor design for tyre chip refinement.",
    "Easy maintenance access platform.",
    "PLC-controlled electrical panel.",
    "Automatic overload and reverse protection.",
    "Replaceable cutting components.",
    "Suitable for continuous secondary processing.",
  ];

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(9.5);

  doc.setTextColor(
    ...COLORS.black
  );

  let featureY = 82;

  features.forEach(
    (feature) => {
      doc.text(
        "•",
        margin + 2,
        featureY
      );

      doc.text(
        feature,
        margin + 8,
        featureY
      );

      featureY += 7;
    }
  );

  // ----------------------------------------------------------
  // ELECTRICAL
  // ----------------------------------------------------------

  drawSectionTitle(
    "Electrical System",
    151
  );

  createSpecificationTable(
    159,
    [
      [
        "Power",
        "75 Hp - 100 HP (55 kw -73 kw)",
      ],

      [
        "No Of Motors",
        "1 No. ABB / Siemens Motor",
      ],

      [
        "Drive",
        "ABB / Inovance / Equivalent",
      ],

      [
        "Voltage",
        "As per Customer's Requirement",
      ],

      [
        "Electric Equipment’s",
        "Switch Gears (L and T / Siemens / Equivalent)",
      ],
    ]
  );

  // ==========================================================
  // PAGE 3
  // CUTTING SECTION ONLY
  // ==========================================================

  doc.addPage();

  drawHeader();

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(22);

  doc.setTextColor(
    ...COLORS.black
  );

  doc.text(
    "RST-2000",
    margin,
    50
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(9);

  doc.setTextColor(
    ...COLORS.grey
  );

  doc.text(
    "Cutting Specifications",
    margin,
    58
  );

  // ----------------------------------------------------------
  // CUTTING SECTION
  // ----------------------------------------------------------

  drawSectionTitle(
    "Cutting Section",
    72
  );

  createSpecificationTable(
    80,
    [
      [
        "Cutting Chamber",
        "L 900 mm x W 1000 mm x H 1000 mm",
      ],

      [
        "Number of Shaft",
        "1 No.",
      ],

      [
        "Shaft Diameter",
        "400 mm",
      ],

      [
        "Shaft Length",
        "1500 mm",
      ],

      [
        "No. of Rotating Blades",
        "42 Nos. (126 cutting edges)",
      ],

      [
        "No. of Static Blades",
        "6 Nos. (36 cutting edges)",
      ],

      [
        "Fixed Blade Mounting Blocks",
        "42 Nos.",
      ],

      [
        "Screen",
        "22 mm (split opening)",
      ],
    ]
  );

  // ==========================================================
  // PAGE 4
  // GEARBOX + DIMENSIONS
  // ==========================================================

  doc.addPage();

  drawHeader();

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(22);

  doc.setTextColor(
    ...COLORS.black
  );

  doc.text(
    "RST-2000",
    margin,
    50
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(9);

  doc.setTextColor(
    ...COLORS.grey
  );

  doc.text(
    "Mechanical & Dimensional Specifications",
    margin,
    58
  );

  // ----------------------------------------------------------
  // GEARBOX AND HYDRAULICS
  // ----------------------------------------------------------

  drawSectionTitle(
    "Gearbox and Hydraulics",
    72
  );

  const gearboxFinalY =
    createSpecificationTable(
      80,
      [
        [
          "Number of Gear Box",
          "1 Nos / Reggiana / Bonfiglioli",
        ],

        [
          "Number of Couplings",
          "1 Nos.",
        ],

        [
          "Type of Coupling",
          "Gear Coupling",
        ],

        [
          "Type of Bearings",
          "Double roller spherical bearing and Thrust ball bearing",
        ],

        [
          "Hydraulics",
          "2 Nos cylinders For Hopper Opening, 4 Nos telescopic cylinders for screen, Power pack 80LPM pump - 2Hp motor",
        ],
      ]
    );

  // ----------------------------------------------------------
  // DIMENSIONS AND HEIGHTS
  // ----------------------------------------------------------

  const dimensionsTitleY =
    gearboxFinalY + 14;

  drawSectionTitle(
    "Dimensions and Heights",
    dimensionsTitleY
  );

  createSpecificationTable(
    dimensionsTitleY + 8,
    [
      [
        "Overall Dimensions",
        "L 3570 mm x W 2175 mm x H 3080 mm",
      ],

      [
        "Hopper Opening",
        "L 840 mm x W 515 mm",
      ],

      [
        "Hopper Height",
        "3050 mm",
      ],

      [
        "Discharge Height",
        "1200 mm",
      ],

      [
        "Approximate Processing Capacity",
        "1500-2000 kg/hr",
      ],
    ]
  );

  // ==========================================================
  // PAGE 5
  // MACHINE VIEWS + CAPACITY
  // ==========================================================

  doc.addPage();

  drawHeader();

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(22);

  doc.setTextColor(
    ...COLORS.black
  );

  doc.text(
    "RST-2000",
    margin,
    50
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(9);

  doc.setTextColor(
    ...COLORS.grey
  );

  doc.text(
    "Machine Views & Processing Capacity",
    margin,
    58
  );

  // ----------------------------------------------------------
  // MACHINE VIEWS
  // ----------------------------------------------------------

  drawSectionTitle(
    "Machine Views",
    75
  );

  const imageBoxWidth = 82;
  const imageBoxHeight = 58;

  const imageTop = 84;

  // LEFT IMAGE
  addImageContain(
    machineImage2,
    "PNG",
    margin,
    imageTop,
    imageBoxWidth,
    imageBoxHeight
  );

  // RIGHT IMAGE
  addImageContain(
    machineImage3,
    "JPEG",
    pageWidth -
      margin -
      imageBoxWidth,
    imageTop,
    imageBoxWidth,
    imageBoxHeight
  );

  // ----------------------------------------------------------
  // IMAGE CAPTIONS
  // ----------------------------------------------------------

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(7.5);

  doc.setTextColor(
    ...COLORS.grey
  );

  doc.text(
    "RST-2000 Machine View",
    margin +
      imageBoxWidth / 2,
    imageTop +
      imageBoxHeight +
      7,
    {
      align: "center",
    }
  );

  doc.text(
    "RST-2000 Machine View",
    pageWidth -
      margin -
      imageBoxWidth / 2,
    imageTop +
      imageBoxHeight +
      7,
    {
      align: "center",
    }
  );

  // ----------------------------------------------------------
  // CAPACITY
  // ----------------------------------------------------------

  drawSectionTitle(
    "Processing Capacity",
    175
  );

  const capacityY = 185;

  const capacityHeight = 38;

  doc.setFillColor(
    ...COLORS.lightGrey
  );

  doc.setDrawColor(
    ...COLORS.border
  );

  doc.setLineWidth(0.4);

  doc.roundedRect(
    margin,
    capacityY,
    contentWidth,
    capacityHeight,
    3,
    3,
    "FD"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(9);

  doc.setTextColor(
    ...COLORS.grey
  );

  doc.text(
    "APPROXIMATE PROCESSING CAPACITY",
    pageWidth / 2,
    capacityY + 13,
    {
      align: "center",
    }
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(19);

  doc.setTextColor(
    ...COLORS.black
  );

  doc.text(
    "1500 - 2000 kg/hr",
    pageWidth / 2,
    capacityY + 28,
    {
      align: "center",
    }
  );

  // ==========================================================
  // ADD FOOTERS TO ALL PAGES
  // ==========================================================

  const totalPages =
    doc.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {
    doc.setPage(page);

    drawFooter(
      page,
      totalPages
    );
  }

  // ==========================================================
  // DOWNLOAD
  // ==========================================================

  doc.save(
    "RST-2000-Technical-Specification.pdf"
  );
};

export default generateRst2000Pdf;