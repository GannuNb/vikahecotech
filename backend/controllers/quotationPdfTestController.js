
import generateQuotationPdf from "../utils/quotationPdf/generateQuotationPdf.js";

export const testQuotationPdfHeader = async (req, res) => {
  try {
    const quotationRequest = {
      _id: "test-quotation-001",
      quotationNumber: "VEC/QTN/2026/0001",
      createdAt: new Date(),
      subject: "Techno-Commercial Offer for Rubber Mulch Plant",
      customer: {
        name: "Mr. Rakshit B",
        email: "rakshit@example.com",
        phone: "+91-9909800094",
        company: "KVR AGROGLOBE",
        address: "Hyderabad, Telangana, India",
      },
      selectedMachinery: [
        {
          capacityName: "4TPH",
          category: {
            name: "Primary Shredder",
          },
          quotationModel: {
            capacityName: "4TPH",
            description:
              "At the first stage, full tyres and/or rough tyre shreds are fed into the system through the SFC 4000 Feeding Conveyor, which transfers the material into the SHT-4000 Primary Shredder. The Primary Shredder reduces the tyres into smaller-sized pieces. The shredded material is then discharged through the SDC-4000 Discharge Conveyor and conveyed to the SDS-4000 Disc Screening System for size classification.",
            pricingTable: [
              {
                equipmentDescription: "Feeding Conveyor",
                modelNo: "SFC-4000",
                power: "3 Phase",
                hp: 5,
                qty: 1,
                unitPrice: 85000,
                totalPrice: 85000,
              },
              {
                equipmentDescription: "Primary Shredder",
                modelNo: "SHT-4000",
                power: "3 Phase",
                hp: 100,
                qty: 1,
                unitPrice: 1250000,
                totalPrice: 1250000,
              },
              {
                equipmentDescription: "Discharge Conveyor",
                modelNo: "SDC-4000",
                power: "3 Phase",
                hp: 7.5,
                qty: 1,
                unitPrice: 110000,
                totalPrice: 110000,
              },
              {
                equipmentDescription: "Disc Screening System",
                modelNo: "SDS-4000",
                power: "3 Phase",
                hp: 10,
                qty: 1,
                unitPrice: 175000,
                totalPrice: 175000,
              },
            ],
            technicalSpecifications: [
              { label: "Processing Capacity", value: "4 TPH" },
              { label: "Main Motor Power", value: "100 HP" },
              { label: "Input Material", value: "Waste Tyres" },
              { label: "Output Size", value: "50-100 mm" },
              { label: "Machine Model", value: "SHT-4000" },
              {
                label: "Operating System",
                value: "Industrial Continuous Operation",
              },
            ],
            images: [
              {
                url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
                description: "Primary Shredder - Machinery View",
              },
              {
                url: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?w=800",
                description: "Primary Shredder - Equipment Detail",
              },
            ],
            referencePhotos: [
              {
                url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800",
                description: "Primary Shredder - Sample Output Reference",
              },
              {
                url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800",
                description: "Primary Shredder - Reference View",
              },
            ],
          },
        },
        {
          capacityName: "3TPH",
          category: {
            name: "Steel Cleaning",
          },
          quotationModel: {
            capacityName: "3TPH",
            description:
              "The steel cleaning system separates steel wire from the shredded tyre material to improve the quality of the recovered rubber output.",
            pricingTable: [
              {
                equipmentDescription: "Steel Cleaning Machine",
                modelNo: "SCM-3000",
                power: "3 Phase",
                hp: 30,
                qty: 1,
                unitPrice: 450000,
                totalPrice: 450000,
              },
              {
                equipmentDescription: "Magnetic Separator",
                modelNo: "OMS-3000",
                power: "3 Phase",
                hp: 5,
                qty: 2,
                unitPrice: 95000,
                totalPrice: 190000,
              },
            ],
            technicalSpecifications: [
              { label: "Processing Capacity", value: "3 TPH" },
              { label: "Motor Power", value: "30 HP" },
              {
                label: "Equipment Type",
                value: "Steel Cleaning System",
              },
              {
                label: "Magnetic Separator",
                value: "Overband Magnetic Separator",
              },
              {
                label: "Application",
                value: "Steel Wire Separation",
              },
            ],
            images: [
              {
                url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800",
                description: "Steel Cleaning - Machinery View",
              },
            ],
            referencePhotos: [
              {
                url: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?w=800",
                description: "Steel Cleaning - Sample Output Reference",
              },
            ],
          },
        },
      ],
    };

    const { pdfBuffer, fileName } =
      await generateQuotationPdf(quotationRequest);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${fileName}"`
    );

    return res.send(pdfBuffer);
  } catch (error) {
    console.error("Quotation PDF test error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate quotation PDF.",
    });
  }
};
