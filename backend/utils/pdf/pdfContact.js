import { hasEnoughSpace } from "./pdfHelpers.js";

const drawContact = (doc, startY, pageState) => {
  let currentY = startY;

  const left = 45;
  const width = doc.page.width - 90;

  const primaryColor = "#2F7188";
  const darkColor = "#111111";
  const lightGreen = "#EAF4EF";

  const sectionHeight = 240;

  if (!hasEnoughSpace(currentY, sectionHeight + 15, doc)) {
    pageState.startNewPage();
    currentY = pageState.getContentStartY();
  }

  // CONTACT BACKGROUND

  doc
    .roundedRect(
      left,
      currentY,
      width,
      sectionHeight,
      5
    )
    .fill(lightGreen);

  // LEFT ACCENT

  doc
    .roundedRect(
      left + 18,
      currentY + 25,
      5,
      70,
      2
    )
    .fill(primaryColor);

  // HEADING

  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor(darkColor)
    .text(
      "For any information about our machineries",
      left + 38,
      currentY + 27,
      {
        width: width - 55,
      }
    );

  // SUBTITLE

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(darkColor)
    .text(
      "Feel Free to reach Us",
      left + 38,
      currentY + 60
    );

  // CONTACT ITEM

  const drawContactItem = (
    x,
    y,
    type,
    title,
    value,
    valueWidth
  ) => {
    const iconCenterX = x + 20;
    const iconCenterY = y + 20;

    // SMALL ICON CIRCLE

    doc
      .circle(
        iconCenterX,
        iconCenterY,
        17
      )
      .fill(primaryColor);

    // ICON

    doc
      .lineWidth(1.5)
      .strokeColor("#FFFFFF");

    // WEBSITE

    if (type === "website") {
      doc
        .circle(
          iconCenterX,
          iconCenterY,
          9
        )
        .stroke();

      doc
        .moveTo(
          iconCenterX - 9,
          iconCenterY
        )
        .lineTo(
          iconCenterX + 9,
          iconCenterY
        )
        .stroke();

      doc
        .ellipse(
          iconCenterX,
          iconCenterY,
          4.5,
          9
        )
        .stroke();
    }

    // EMAIL

    else if (type === "email") {
      doc
        .rect(
          iconCenterX - 10,
          iconCenterY - 7,
          20,
          14
        )
        .stroke();

      doc
        .moveTo(
          iconCenterX - 9,
          iconCenterY - 6
        )
        .lineTo(
          iconCenterX,
          iconCenterY + 2
        )
        .lineTo(
          iconCenterX + 9,
          iconCenterY - 6
        )
        .stroke();
    }

    // PHONE

    else if (type === "phone") {
      doc
        .lineWidth(3.5)
        .moveTo(
          iconCenterX - 7,
          iconCenterY - 8
        )
        .lineTo(
          iconCenterX - 10,
          iconCenterY - 4
        )
        .lineTo(
          iconCenterX - 6,
          iconCenterY + 3
        )
        .lineTo(
          iconCenterX + 3,
          iconCenterY + 9
        )
        .lineTo(
          iconCenterX + 9,
          iconCenterY + 5
        )
        .stroke();
    }

    // ADDRESS

    else if (type === "address") {
      doc
        .circle(
          iconCenterX,
          iconCenterY - 3,
          5
        )
        .fill("#FFFFFF");

      doc
        .moveTo(
          iconCenterX - 6,
          iconCenterY
        )
        .lineTo(
          iconCenterX,
          iconCenterY + 10
        )
        .lineTo(
          iconCenterX + 6,
          iconCenterY
        )
        .fillAndStroke(
          "#FFFFFF",
          "#FFFFFF"
        );

      doc
        .circle(
          iconCenterX,
          iconCenterY - 3,
          2
        )
        .fill(primaryColor);
    }

    // TITLE

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor(darkColor)
      .text(
        title,
        x + 55,
        y - 1,
        {
          width: valueWidth,
        }
      );

    // VALUE

    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor(darkColor)
      .text(
        value,
        x + 55,
        y + 21,
        {
          width: valueWidth,
          lineGap: 2,
        }
      );
  };

  // COLUMN POSITIONS

  const firstColumnX = left + 25;

  const secondColumnX =
    left + width / 2 + 5;

  // WEBSITE

  drawContactItem(
    firstColumnX,
    currentY + 100,
    "website",
    "Website",
    "www.vikahecotech.com",
    150
  );

  // EMAIL

  drawContactItem(
    secondColumnX,
    currentY + 100,
    "email",
    "Email",
    "info@vikahecotech.com",
    135
  );

  // PHONE

  drawContactItem(
    firstColumnX,
    currentY + 160,
    "phone",
    "Phone",
    "+91 4049471616",
    150
  );

  // ADDRESS

  drawContactItem(
    secondColumnX,
    currentY + 160,
    "address",
    "Address",
    "#406, 4th Floor, Patel Towers, Above EasyBuy Beside Nagole RTO Office, Nagole Hyderabad, Telangana-500068",
    125
  );

  doc.fillColor("#111111");

  currentY += sectionHeight + 20;

  return currentY;
};

export default drawContact;