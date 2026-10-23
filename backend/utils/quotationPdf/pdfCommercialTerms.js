
const drawCommercialTerms = (doc, currentY = 125, pageState) => {
  const left = 50;
  const contentWidth = doc.page.width - left - 50;
  const bottomMargin = 40;
  const sections = [
    {
      heading: "Commercial Terms & Conditions:",
      paragraphs: [
        "The following standard terms and conditions form a part of the above reference quotation unless otherwise specified. “Company” means Vikah Ecotech Private Limited, “Buyer” means the person to whom the quotation is addressed.",
      ],
    },
    {
      heading: "Validity:",
      paragraphs: [
        "Unless otherwise specified, the offer will be valid for a period of 60 days from the issue date of the offer and thereafter it will be subject to Company’s confirmation / revision.",
      ],
    },
    {
      heading: "Price and Basis:",
      paragraphs: [
        "The prices quoted are for Ex-factory and inclusive of suitable packing. The prices are not inclusive of any taxes.",
      ],
    },
    {
      heading: "Terms of Payments:",
      paragraphs: [
        "Payment of the Purchase Price shall be made by Buyer to Company in accordance with the following schedule:",
        "a) 50% of the Purchase Price as an advance within 10 working days from the date of signing the PO by buyer and seller.",
        "b) 50% of the Remaining Purchase Price & GST within 7 days before dispatch of the equipment from our works.",
      ],
    },
    {
      heading: "Taxes:",
      paragraphs: [
        "The prices quoted in the Price Schedule are exclusive of all State/Central Government taxes and levies which will be charged extra as on actual.",
      ],
    },
    {
      heading: "Transit Insurance:",
      paragraphs: [
        "Buyer shall be responsible for the Transit Insurance of the Equipment, at buyer’s sole cost and expense.",
      ],
    },
    {
      heading: "Transportation:",
      paragraphs: [
        "Buyer shall be responsible for the transportation of Equipment at Installation on Site. As per Vikah Ecotech guidance.",
      ],
    },
    {
      heading: "Delivery:",
      paragraphs: [
        "Delivery of the Equipment to Buyer by Company, at Buyer’s sole cost and expense, shall be made within 90 days after PO, Advance payment, and Layout Approval from buyer. 100% payment to be done of PO Value along with GST before dispatch. Further, if there will be delay in Payment as per mentioned in Payment Terms, Company will not be responsible for delay delivery of the Equipment.",
        "Also, if Buyer fails in taking delivery of the Equipment by any means of their problems after Equipment is ready to dispatch at our works, Company will start penalty of 0.5% of total price for the first 2 weeks & later on 5% of total price after 2 weeks of Equipment ready to dispatch.",
      ],
    },
    {
      heading: "Order Cancellation:",
      paragraphs: [
        "Buyer cannot cancel the Purchase order, once the PO is executed. In the event that the Buyer cancels the Purchase order, the Company shall not be liable to refund any of the payments made before the cancellation.",
      ],
    },
    {
      heading: "Equipment / Plant Layout:",
      paragraphs: [
        "Vikah Ecotech Private Limited will provide GA (General Arrangement) drawing and civil drawing within 30 days after receiving the Purchase Order (PO) from Buyer. According to the standard layout, original proposal includes standard equipment’s, for custom layouts or custom requirements, additional equipment costs will apply.",
      ],
    },
    {
      heading: "Force Majeure:",
      paragraphs: [
        "The Company shall have no liability for any failure to perform or delay in performance of its obligations under the contract caused by a force majeure event including without limitation:",
        "I. Natural phenomena such as weather conditions, floods, droughts, earthquake and epidemics etc.",
        "II. Act of any Government Authority, domestic or foreign such as war, declared or undeclared quarantines, embargoes, licensing control or production, distribution restrictions etc.",
        "III. Accidents and disruption on account of fires, explosions, sabotage etc.",
        "IV. Transportation delays due to Force Majeure or accidents.",
        "V. Strikes and lock-outs at Company's suppliers/Seller's works.",
        "VI. Non-availability of suitable Railway Wagon/Road Trailer for the purpose of transportation.",
        "VII. Non-fulfilment of any contractual obligation by the Buyer.",
        "In case of any force majeure event, the time for delivery shall be automatically extended by a reasonable period.",
      ],
    },
    {
      heading: "Site Preparation:",
      paragraphs: [
        "Buyer shall be responsible for preparing a site as per company's standard drawing, suitable for the installation and operation of the Equipment.",
      ],
    },
    {
      heading: "Warranty:",
      paragraphs: [
        "The warranty is valid for 12 (Twelve) Months from the date of installation and commissioning against all manufacturing defects or 16 (Sixteen) months from the date of Invoice or 18 (Eighteen) months after receiving purchase order, or 5500 (Fifty-five Hundred) hours whichever is earlier.",
        "Warranty for the equipment is valid against the use of genuine spares bought from VIKAH ECO TECH PRIVATE LIMITED only. Warranty includes and is limited to replacement of parts with manufacturing default only, wear and tear parts and consumables are non-warranty parts.",
        "The service support extend under warranty will include the service charges for travel, lodging, boarding, overnight stay will be to the customer account and charged as per policy only.",
      ],
    },
    {
      heading: "Installation & Supervision:",
      paragraphs: [
        "Company shall supervise the equipment at the installation on site at Free of Cost. Buyer to provide decent stay, vegetarian food and local conveyance of Installation team during the stay. Buyer to arrange air tickets to and from Hyderabad, pick up and drop at nearest airport.",
        "1. Company’s responsibilities:",
        "Company shall be responsible to supervise the Equipment only when Buyer has properly installed the Equipment at Buyer’s Site.",
        "Company shall be responsible for sending the appropriate technician for visit post 10 days of successful Operation of Machinery at Extra Cost for Rs.7500/- per day/Technician after 4 Free Visit. The First 4 visits will be free during warranty period.",
        "2. Buyer’s responsibilities:",
        "Buyer shall be responsible for having the site fully ready (civil work, water tank, etc.) to receive the Equipment on the estimated delivery date.",
        "Buyer shall be responsible for the Company technician’s accommodation, food, air tickets to and from Hyderabad, pick up and drop at nearest airport and security concerns. Buyer shall be responsible for providing all the necessary mechanisms required during the installation/supervision process (e.g. cranes, welding machines, welding rod, grinder machine, gas cutter, hand drill, etc.).",
        "Buyer shall be responsible for providing welder, fitter and labours during the installation/supervision process. Buyer shall be responsible for providing water pipe work for cooling of Equipment and Air Compressor for operation of Pneumatic tools.",
        "Buyer shall be responsible for providing electricity/generator during the installation/supervision process.",
      ],
    },
    {
      heading: "Training:",
      paragraphs: [
        "Company shall provide training for one time at free of cost thereafter extra cost to the buyer as per company norms.",
      ],
    },
    {
      heading: "Confidentiality of Information:",
      paragraphs: [
        "Buyer shall keep all information confidential such as drawings, specifications, or data furnished by the company. The buyer also agrees to allow seller to take the Videos, Photographs during and after Installation & Commissioning, to support the seller on sharing plant image, client visit, share logo for marketing and promotional activities. Seller will take due care to not misuse buyers information.",
      ],
    },
    {
      heading: "Law Applicable, Arbitration:",
      paragraphs: [
        "The Contract shall be governed by Indian Contract Act.",
        "If at any time any question, dispute or difference whatsoever shall arise between the Buyer and the Seller upon or in relation to or in connection with the contract either party may give to the other notice in writing of the existence of such question, dispute or difference and the same shall be referred to the adjudication of two arbitrators, one to be nominated by the Buyer and the other by Seller, or in the case of said arbitrators not agreeing then to the adjudication of an umpire to be appointed by the arbitrators in writing.",
        "Before proceeding, the reference and the award of the arbitrators, or in the event of their not agreeing, of the umpire appointed by them, shall be final and binding on both parties. The provisions of the Indian Arbitration Act, 1940 and of the rules thereunder and any statutory modification thereof shall be deemed to apply to and be incorporated into the contract. Subject to Hyderabad Jurisdiction.",
      ],
    },
  ];

  const getContentStartY = () =>
    pageState?.getContentStartY ? pageState.getContentStartY() : 125;

  const startNewPage = () => {
    if (pageState?.startNewPage) {
      pageState.startNewPage();
      currentY = getContentStartY();
    } else {
      doc.addPage();
      currentY = 125;
    }
  };

  const pageBottom = () => doc.page.height - bottomMargin;

  const ensureSpace = (height) => {
    if (currentY + height > pageBottom()) {
      startNewPage();
    }
  };

  const getTextHeight = (text, font, fontSize, options = {}) => {
    doc.font(font).fontSize(fontSize);
    return doc.heightOfString(text, {
      width: contentWidth,
      ...options,
    });
  };

  sections.forEach((section) => {
    const headingHeight = getTextHeight(
      section.heading,
      "Helvetica-Bold",
      10
    );

    const firstParagraph = section.paragraphs[0] || "";
    const firstParagraphHeight = firstParagraph
      ? getTextHeight(firstParagraph, "Helvetica", 9.5, {
          lineGap: 3,
        })
      : 0;

    const minimumSectionHeight = headingHeight + 8 + Math.min(firstParagraphHeight, 40) + 10;

    ensureSpace(minimumSectionHeight);

    doc.font("Helvetica-Bold").fontSize(10).fillColor("#20A957");
    doc.text(section.heading, left, currentY, {
      width: contentWidth,
      underline: true,
    });
    currentY = doc.y + 8;

    section.paragraphs.forEach((paragraph) => {
      const isPaymentSchedule =
        paragraph.startsWith("a)") || paragraph.startsWith("b)");

      const font = isPaymentSchedule ? "Helvetica-Bold" : "Helvetica";
      const fontSize = 9.5;
      const textHeight = getTextHeight(paragraph, font, fontSize, {
        lineGap: 3,
      });

      ensureSpace(Math.min(textHeight, pageBottom() - getContentStartY()));

      doc.font(font).fontSize(fontSize).fillColor("#000000");
      doc.text(paragraph, left, currentY, {
        width: contentWidth,
        lineGap: 3,
      });
      currentY = doc.y + 9;
    });

    currentY += 3;
  });

  return currentY + 10;
};

export default drawCommercialTerms;
