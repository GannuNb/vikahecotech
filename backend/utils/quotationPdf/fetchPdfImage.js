import getObjectFromS3 from "../aws/s3GetObject.js";

const fetchPdfImage = async (imageUrl) => {
  if (typeof imageUrl !== "string" || !imageUrl.trim()) {
    throw new Error("Image URL or S3 key is missing");
  }

  const value = imageUrl.trim();
  let key;

  try {
    const parsedUrl = new URL(value);
    const cloudFrontUrl = process.env.CLOUDFRONT_URL;

    if (!cloudFrontUrl) {
      throw new Error("CLOUDFRONT_URL is not configured");
    }

    const configuredHost = new URL(cloudFrontUrl).host;

    if (parsedUrl.host !== configuredHost) {
      throw new Error("Image URL does not match the configured CloudFront domain");
    }

    key = decodeURIComponent(parsedUrl.pathname.replace(/^\/+/, ""));
  } catch (error) {
    if (
      error.message.includes("CLOUDFRONT_URL") ||
      error.message.includes("does not match")
    ) {
      throw error;
    }

    // The database may store the S3 key instead of a full URL.
    if (/^https?:\/\//i.test(value)) {
      throw new Error(`Invalid cloud image URL: ${value}`);
    }

    key = value.replace(/^\/+/, "");
  }

  if (!key || key.split("/").includes("..")) {
    throw new Error("Invalid S3 object key");
  }

  return getObjectFromS3(key);
};

export default fetchPdfImage;
