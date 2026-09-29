import Product from "../models/productModel.js";
import generateProductSpecificationPdf from "../utils/pdf/generateProductSpecificationPdf.js";

const testProductSpecificationPdf = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({
      slug: slug.toLowerCase(),
    }).populate({
      path: "application",
      populate: {
        path: "category",
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const { filePath, fileName } =
      await generateProductSpecificationPdf(product);

    return res.download(
      filePath,
      fileName,
      (error) => {
        if (error) {
          console.error(
            "PDF download error:",
            error
          );
        }
      }
    );
  } catch (error) {
    console.error(
      "Test PDF generation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate PDF",
      error: error.message,
    });
  }
};

export {
  testProductSpecificationPdf,
};