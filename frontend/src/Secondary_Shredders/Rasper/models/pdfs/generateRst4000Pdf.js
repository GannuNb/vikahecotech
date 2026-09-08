import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import logo from "../../../../images/logo.png";
import machineImage from "../../../../images/R1.png";
import machineImage2 from "../../../../images/secondary-shredders/R2.png";
import machineImage3 from "../../../../images/Machinery images/Rasper.jpeg";

const generateRst4000Pdf = () => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 15;

  const dark = [30, 30, 30];
  const grey = [90, 90, 90];
  const lightGrey = [245, 245, 245];
  const border = [210, 210, 210];
  const accent = [220, 70, 35];

  // --------------------------------------------------
  // HEADER
  // --------------------------------------------------

  const addHeader = () => {
    try {
      doc.addImage(logo, "PNG", margin, 8, 35, 14);
    } catch (error) {
      console.log("Logo could not be loaded:", error);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...grey);

    doc.text(
      "SECONDARY SHREDDER / RASPER",
      pageWidth - margin,
      15,
      { align: "right" }
    );

    doc.setDrawColor(...accent);
    doc.setLineWidth(0.8);

    doc.line(
      margin,
      26,
      pageWidth - margin,
      26
    );
  };

  // --------------------------------------------------
  // FOOTER
  // --------------------------------------------------

  const addFooter = () => {
    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      doc.setDrawColor(...border);
      doc.setLineWidth(0.3);

      doc.line(
        margin,
        pageHeight - 15,
        pageWidth - margin,
        pageHeight - 15
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...grey);

      doc.text(
        "Vikah Ecotech | RST-4000",
        margin,
        pageHeight - 8
      );

      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - margin,
        pageHeight - 8,
        {
          align: "right",
        }
      );
    }
  };

  // --------------------------------------------------
  // IMAGE CONTAIN
  // --------------------------------------------------

  const addImageContain = (
    image,
    x,
    y,
    maxWidth,
    maxHeight
  ) => {
    const imgProps = doc.getImageProperties(image);

    const imageRatio =
      imgProps.width / imgProps.height;

    const containerRatio =
      maxWidth / maxHeight;

    let width;
    let height;

    if (imageRatio > containerRatio) {
      width = maxWidth;
      height = maxWidth / imageRatio;
    } else {
      height = maxHeight;
      width = maxHeight * imageRatio;
    }

    const centeredX =
      x + (maxWidth - width) / 2;

    const centeredY =
      y + (maxHeight - height) / 2;

    doc.addImage(
      image,
      "PNG",
      centeredX,
      centeredY,
      width,
      height
    );
  };

  // --------------------------------------------------
  // SECTION TITLE
  // Same style as previous PDFs
  // --------------------------------------------------

  const addSectionTitle = (title, y) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...dark);

    doc.text(title, margin, y);

    doc.setDrawColor(...accent);
    doc.setLineWidth(1);

    doc.line(
      margin,
      y + 3,
      margin + 35,
      y + 3
    );

    return y + 12;
  };

  // --------------------------------------------------
  // TABLE
  // Same table styling as previous PDFs
  // --------------------------------------------------

  const addTable = (
    head,
    body,
    startY
  ) => {
    autoTable(doc, {
      startY,

      head: [head],

      body,

      theme: "grid",

      margin: {
        left: margin,
        right: margin,
      },

      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: 3,

        textColor: dark,

        lineColor: border,

        lineWidth: 0.3,

        valign: "middle",
      },

      headStyles: {
        fillColor: dark,

        textColor: [255, 255, 255],

        fontStyle: "bold",

        halign: "left",
      },

      alternateRowStyles: {
        fillColor: lightGrey,
      },

      columnStyles: {
        0: {
          fontStyle: "bold",
          cellWidth: 65,
        },

        1: {
          cellWidth: "auto",
        },
      },
    });

    return doc.lastAutoTable.finalY;
  };

  // ==================================================
  // PAGE 1
  // PRODUCT OVERVIEW
  // ==================================================

  addHeader();

  let y = 38;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...dark);

  doc.text(
    "RST-4000",
    margin,
    y
  );

  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(...grey);

  doc.text(
    "Secondary Shredder (Rasper)",
    margin,
    y
  );

  y += 10;

  doc.setDrawColor(...accent);
  doc.setLineWidth(1.2);

  doc.line(
    margin,
    y,
    margin + 45,
    y
  );

  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...grey);

  const intro =
    "The RST-4000 is a high-efficiency secondary shredder (rasper) designed to refine pre-shredded tyre chips into clean, uniform rubber fragments ready for granulation. Built with a heavy-duty rotor, wear-resistant blades, and a robust cutting chamber, it delivers precise cutting performance even under continuous load.";

  const introLines =
    doc.splitTextToSize(
      intro,
      pageWidth - margin * 2
    );

  doc.text(
    introLines,
    margin,
    y
  );

  y +=
    introLines.length * 5 + 10;

  // Machine image

  doc.setFillColor(248, 248, 248);

  doc.roundedRect(
    margin,
    y,
    pageWidth - margin * 2,
    92,
    3,
    3,
    "F"
  );

  try {
    addImageContain(
      machineImage2,
      margin + 8,
      y + 6,
      pageWidth - margin * 2 - 16,
      80
    );
  } catch (error) {
    console.log(
      "Machine image error:",
      error
    );
  }

  y += 103;

  // Product description

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...dark);

  doc.text(
    "RST-4000 Secondary Shredder",
    margin,
    y
  );

  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...grey);

  const description =
    "The rasper efficiently separates steel wires from rubber, improving downstream processing quality and throughput. With PLC-controlled automation, safety interlocks, and optimized feed mechanisms, the RST-4000 ensures stable output size, reduced contamination, and minimal downtime.";

  const descriptionLines =
    doc.splitTextToSize(
      description,
      pageWidth - margin * 2
    );

  doc.text(
    descriptionLines,
    margin,
    y
  );

  // ==================================================
  // PAGE 2
  // FEATURES + ELECTRICAL SYSTEM
  // ==================================================

  doc.addPage();

  addHeader();

  y = 38;

  y = addSectionTitle(
    "KEY FEATURES",
    y
  );

  const features = [
    "Durable, hard-faced knives.",
    "Easy maintenance service platform.",
    "Full PLC control panel.",
    "Stop and auto-reversal motors.",
    "Specific Stop / Auto Reversal motors feature.",
    "Shaft double protected with drive and mechanical mechanism to avoid damage from in-spherical objects.",
  ];

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(9);

  features.forEach(
    (feature) => {
      doc.setTextColor(...dark);

      doc.text(
        "•",
        margin + 2,
        y
      );

      const lines =
        doc.splitTextToSize(
          feature,
          pageWidth - margin * 2 - 10
        );

      doc.text(
        lines,
        margin + 8,
        y
      );

      y +=
        lines.length * 5 + 4;
    }
  );

  y += 6;

  y = addSectionTitle(
    "ELECTRICAL SYSTEM",
    y
  );

  addTable(
    ["Specification", "Details"],
    [
      [
        "Power",
        "180 Hp - 220 Hp (134 kW - 149 kW)",
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
    ],
    y
  );

  // ==================================================
  // PAGE 3
  // CUTTING SECTION
  // ==================================================

  doc.addPage();

  addHeader();

  y = 38;

  y = addSectionTitle(
    "CUTTING SECTION",
    y
  );

  addTable(
    ["Specification", "Details"],
    [
      [
        "Cutting Chamber",
        "L 1500 x W 1000 mm x H 1000 mm",
      ],

      [
        "Number of Shaft",
        "1 No.",
      ],

      [
        "Shaft Diameter",
        "500 mm",
      ],

      [
        "Shaft Length",
        "2420 mm",
      ],

      [
        "No. of Rotating Blades",
        "42 Nos. (252 cutting edges)",
      ],

      [
        "No. of Static Blades",
        "6 Nos. (48 cutting edges)",
      ],

      [
        "Fixed Blade Mounting Blocks",
        "42 Nos.",
      ],

      [
        "Screen",
        "22 mm (split opening)",
      ],
    ],
    y
  );

  y =
    doc.lastAutoTable.finalY + 15;

  // Machine image

  doc.setFillColor(
    248,
    248,
    248
  );

  doc.roundedRect(
    margin,
    y,
    pageWidth - margin * 2,
    105,
    3,
    3,
    "F"
  );

  try {
    addImageContain(
      machineImage,
      margin + 8,
      y + 7,
      pageWidth - margin * 2 - 16,
      91
    );
  } catch (error) {
    console.log(
      "Machine image error:",
      error
    );
  }

  y += 115;

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(11);

  doc.setTextColor(...dark);

  doc.text(
    "Cutting Performance",
    margin,
    y
  );

  y += 7;

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(9);

  doc.setTextColor(...grey);

  const cuttingDescription =
    "The RST-4000 is equipped with a heavy-duty rotor and durable hard-faced cutting knives. Its optimized cutting chamber provides consistent tyre chip refinement for downstream granulation and separation.";

  const cuttingLines =
    doc.splitTextToSize(
      cuttingDescription,
      pageWidth - margin * 2
    );

  doc.text(
    cuttingLines,
    margin,
    y
  );

  // ==================================================
  // PAGE 4
  // GEARBOX / HYDRAULICS
  // ==================================================

  doc.addPage();

  addHeader();

  y = 38;

  y = addSectionTitle(
    "GEARBOX AND HYDRAULICS",
    y
  );

  addTable(
    ["Specification", "Details"],
    [
      [
        "Number of Gear Box",
        "1 Nos / Reggiana / Bonfiglioli",
      ],

      [
        "Number of Couplings",
        "01 Nos",
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
    ],
    y
  );

  y =
    doc.lastAutoTable.finalY + 15;

  // Dimensions

  y = addSectionTitle(
    "DIMENSIONS AND HEIGHTS",
    y
  );

  addTable(
    ["Specification", "Details"],
    [
      [
        "Overall Dimensions",
        "L 4730 mm × W 2500 mm × H 3650 mm",
      ],

      [
        "Hopper Opening (G x F)",
        "L 1200 mm x W 550 mm",
      ],

      [
        "Hopper Height (E)",
        "3430 mm",
      ],

      [
        "Discharge Height (D)",
        "1780 mm",
      ],

      [
        "Approximate Processing Capacity",
        "3500-4000 kg/hr",
      ],
    ],
    y
  );

  // ==================================================
  // PAGE 5
  // MACHINE VIEWS + CAPACITY
  // ==================================================

  doc.addPage();

  addHeader();

  y = 38;

  y = addSectionTitle(
    "MACHINE VIEWS",
    y
  );

  // First image

  doc.setFillColor(
    248,
    248,
    248
  );

  doc.roundedRect(
    margin,
    y,
    pageWidth - margin * 2,
    78,
    3,
    3,
    "F"
  );

  try {
    addImageContain(
      machineImage2,
      margin + 8,
      y + 6,
      pageWidth - margin * 2 - 16,
      66
    );
  } catch (error) {
    console.log(error);
  }

  y += 88;

  // Second image

  doc.setFillColor(
    248,
    248,
    248
  );

  doc.roundedRect(
    margin,
    y,
    pageWidth - margin * 2,
    78,
    3,
    3,
    "F"
  );

  try {
    addImageContain(
      machineImage,
      margin + 8,
      y + 6,
      pageWidth - margin * 2 - 16,
      66
    );
  } catch (error) {
    console.log(error);
  }

  y += 88;

  // Third image

  doc.setFillColor(
    248,
    248,
    248
  );

  doc.roundedRect(
    margin,
    y,
    pageWidth - margin * 2,
    70,
    3,
    3,
    "F"
  );

  try {
    addImageContain(
      machineImage3,
      margin + 8,
      y + 5,
      pageWidth - margin * 2 - 16,
      60
    );
  } catch (error) {
    console.log(error);
  }

  y += 82;

  // Capacity

  doc.setFillColor(...dark);

  doc.roundedRect(
    margin,
    y,
    pageWidth - margin * 2,
    30,
    3,
    3,
    "F"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(8);

  doc.setTextColor(
    190,
    190,
    190
  );

  doc.text(
    "APPROXIMATE PROCESSING CAPACITY",
    pageWidth / 2,
    y + 10,
    {
      align: "center",
    }
  );

  doc.setFontSize(17);

  doc.setTextColor(
    255,
    255,
    255
  );

  doc.text(
    "3500 - 4000 kg/hr",
    pageWidth / 2,
    y + 23,
    {
      align: "center",
    }
  );

  // --------------------------------------------------
  // FOOTER
  // --------------------------------------------------

  addFooter();

  // --------------------------------------------------
  // DOWNLOAD
  // --------------------------------------------------

  doc.save(
    "Vikah-Ecotech-RST-4000-Secondary-Shredder.pdf"
  );
};

export default generateRst4000Pdf;