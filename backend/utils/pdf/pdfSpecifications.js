import {
  hasEnoughSpace,
} from "./pdfHelpers.js";

const PRIMARY_COLOR = "#0F4C5C";
const SECONDARY_COLOR = "#1F7A5A";
const DARK_COLOR = "#1F2933";
const MUTED_COLOR = "#6B7280";
const HEADER_BACKGROUND = "#E8F1F3";
const LEFT_BACKGROUND = "#F7FAFA";
const BORDER_COLOR = "#D5E0E4";

const drawTableHeader = (
  doc,
  x,
  y,
  width,
  leftWidth,
  rightWidth,
  height
) => {
  /*
   * HEADER BACKGROUND
   */

  doc
    .rect(
      x,
      y,
      width,
      height
    )
    .fill(HEADER_BACKGROUND);

  /*
   * VERTICAL LINE
   */

  doc
    .moveTo(
      x + leftWidth,
      y
    )
    .lineTo(
      x + leftWidth,
      y + height
    )
    .lineWidth(0.5)
    .strokeColor(
      BORDER_COLOR
    )
    .stroke();

  /*
   * OUTER BORDER
   */

  doc
    .rect(
      x,
      y,
      width,
      height
    )
    .lineWidth(0.6)
    .strokeColor(
      BORDER_COLOR
    )
    .stroke();

  /*
   * SPECIFICATION
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(
      PRIMARY_COLOR
    )
    .text(
      "SPECIFICATION",
      x + 10,
      y + 9,
      {
        width:
          leftWidth - 20,
      }
    );

  /*
   * VALUE
   */

  doc
    .text(
      "VALUE",
      x +
        leftWidth +
        10,
      y + 9,
      {
        width:
          rightWidth - 20,
      }
    );
};

const calculateRowHeight = (
  doc,
  name,
  value,
  leftWidth,
  rightWidth
) => {
  const padding = 9;

  const nameHeight =
    doc.heightOfString(
      name,
      {
        width:
          leftWidth -
          padding * 2,
        font:
          "Helvetica-Bold",
        fontSize: 8,
        lineGap: 2,
      }
    );

  const valueHeight =
    doc.heightOfString(
      value,
      {
        width:
          rightWidth -
          padding * 2,
        font: "Helvetica",
        fontSize: 8,
        lineGap: 2,
      }
    );

  return (
    Math.max(
      nameHeight,
      valueHeight
    ) +
    padding * 2
  );
};

const drawRow = (
  doc,
  x,
  y,
  leftWidth,
  rightWidth,
  height,
  name,
  value
) => {
  /*
   * LEFT CELL
   */

  doc
    .rect(
      x,
      y,
      leftWidth,
      height
    )
    .fill(LEFT_BACKGROUND);

  /*
   * RIGHT CELL
   */

  doc
    .rect(
      x + leftWidth,
      y,
      rightWidth,
      height
    )
    .fill("#FFFFFF");

  /*
   * OUTER BORDER
   */

  doc
    .rect(
      x,
      y,
      leftWidth +
        rightWidth,
      height
    )
    .lineWidth(0.5)
    .strokeColor(
      BORDER_COLOR
    )
    .stroke();

  /*
   * VERTICAL BORDER
   */

  doc
    .moveTo(
      x + leftWidth,
      y
    )
    .lineTo(
      x + leftWidth,
      y + height
    )
    .lineWidth(0.5)
    .strokeColor(
      BORDER_COLOR
    )
    .stroke();

  /*
   * NAME
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(DARK_COLOR)
    .text(
      name,
      x + 10,
      y + 9,
      {
        width:
          leftWidth - 20,
        lineGap: 2,
      }
    );

  /*
   * VALUE
   */

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#374151")
    .text(
      value,
      x +
        leftWidth +
        10,
      y + 9,
      {
        width:
          rightWidth - 20,
        lineGap: 2,
      }
    );
};

const drawSectionHeading = (
  doc,
  title,
  x,
  y,
  width
) => {
  /*
   * GREEN NUMBER/ACCENT
   */

  doc
    .roundedRect(
      x,
      y + 1,
      4,
      16,
      2
    )
    .fill(SECONDARY_COLOR);

  /*
   * HEADING
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(DARK_COLOR)
    .text(
      title,
      x + 12,
      y,
      {
        width:
          width - 12,
      }
    );
};

const drawSpecifications = (
  doc,
  product,
  startY,
  pageState
) => {
  let currentY = startY;

  const left = 45;

  const width =
    doc.page.width - 90;

  const leftWidth =
    width * 0.42;

  const rightWidth =
    width * 0.58;

  const tableHeaderHeight = 29;

  const sections =
    Array.isArray(
      product.sections
    )
      ? product.sections
      : [];

  /*
   * ------------------------------------------------
   * NO SPECIFICATIONS
   * ------------------------------------------------
   */

  if (!sections.length) {
    if (
      !hasEnoughSpace(
        currentY,
        70,
        doc
      )
    ) {
      pageState.startNewPage();

      currentY =
        pageState.getContentStartY();
    }

    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor(
        PRIMARY_COLOR
      )
      .text(
        "Technical Specifications",
        left,
        currentY
      );

    currentY += 30;

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(MUTED_COLOR)
      .text(
        "No technical specifications available.",
        left,
        currentY
      );

    return currentY + 25;
  }

  /*
   * ------------------------------------------------
   * MAIN TITLE
   * ------------------------------------------------
   */

  if (
    !hasEnoughSpace(
      currentY,
      55,
      doc
    )
  ) {
    pageState.startNewPage();

    currentY =
      pageState.getContentStartY();
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor(
      PRIMARY_COLOR
    )
    .text(
      "Technical Specifications",
      left,
      currentY
    );

  currentY += 18;

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(MUTED_COLOR)
    .text(
      "Detailed technical parameters and product specifications",
      left,
      currentY
    );

  currentY += 25;

  /*
   * ------------------------------------------------
   * SECTIONS
   * ------------------------------------------------
   */

  for (
    let sectionIndex = 0;
    sectionIndex <
    sections.length;
    sectionIndex++
  ) {
    const section =
      sections[
        sectionIndex
      ];

    if (
      !section ||
      !Array.isArray(
        section.fields
      ) ||
      !section.fields.length
    ) {
      continue;
    }

    const sectionHeading =
      section.heading ||
      `Section ${
        sectionIndex + 1
      }`;

    /*
     * SECTION HEADING
     */

    if (
      !hasEnoughSpace(
        currentY,
        75,
        doc
      )
    ) {
      pageState.startNewPage();

      currentY =
        pageState.getContentStartY();

      doc
        .font("Helvetica-Bold")
        .fontSize(13)
        .fillColor(
          PRIMARY_COLOR
        )
        .text(
          "Technical Specifications",
          left,
          currentY
        );

      currentY += 30;
    }

    drawSectionHeading(
      doc,
      sectionHeading,
      left,
      currentY,
      width
    );

    currentY += 25;

    /*
     * TABLE HEADER
     */

    if (
      !hasEnoughSpace(
        currentY,
        tableHeaderHeight + 20,
        doc
      )
    ) {
      pageState.startNewPage();

      currentY =
        pageState.getContentStartY();

      drawSectionHeading(
        doc,
        sectionHeading,
        left,
        currentY,
        width
      );

      currentY += 25;
    }

    drawTableHeader(
      doc,
      left,
      currentY,
      width,
      leftWidth,
      rightWidth,
      tableHeaderHeight
    );

    currentY +=
      tableHeaderHeight;

    /*
     * TABLE ROWS
     */

    for (
      let fieldIndex = 0;
      fieldIndex <
      section.fields.length;
      fieldIndex++
    ) {
      const field =
        section.fields[
          fieldIndex
        ];

      const name =
        String(
          field?.name ?? "—"
        ).trim() || "—";

      const value =
        String(
          field?.value ?? "—"
        ).trim() || "—";

      const rowHeight =
        calculateRowHeight(
          doc,
          name,
          value,
          leftWidth,
          rightWidth
        );

      /*
       * PAGE BREAK
       */

      if (
        !hasEnoughSpace(
          currentY,
          rowHeight,
          doc
        )
      ) {
        pageState.startNewPage();

        currentY =
          pageState.getContentStartY();

        /*
         * REPEAT SECTION TITLE
         */

        drawSectionHeading(
          doc,
          sectionHeading,
          left,
          currentY,
          width
        );

        currentY += 25;

        /*
         * REPEAT TABLE HEADER
         */

        drawTableHeader(
          doc,
          left,
          currentY,
          width,
          leftWidth,
          rightWidth,
          tableHeaderHeight
        );

        currentY +=
          tableHeaderHeight;
      }

      /*
       * DRAW ROW
       */

      drawRow(
        doc,
        left,
        currentY,
        leftWidth,
        rightWidth,
        rowHeight,
        name,
        value
      );

      currentY +=
        rowHeight;
    }

    /*
     * SECTION GAP
     */

    currentY += 22;
  }

  return currentY;
};

export default drawSpecifications;