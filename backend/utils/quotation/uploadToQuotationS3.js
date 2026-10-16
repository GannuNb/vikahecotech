
import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import path from "path";

import s3 from "../../config/s3.js";

const uploadToQuotationS3 = async (file) => {
  if (!file?.buffer || !file?.mimetype) {
    throw new Error("Invalid image file.");
  }

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error(
      "Only JPEG, PNG, WebP, and GIF images are allowed."
    );
  }

  const extension = path.extname(file.originalname || "").toLowerCase();

  const extensionByMimeType = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
  };

  const safeExtension =
    extensionByMimeType[file.mimetype] || extension;

  const uniqueFileName = `${crypto.randomUUID()}${safeExtension}`;

  const folder = process.env.AWS_S3_FOLDER || "development";
  const key = `${folder}/quotations/${uniqueFileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return key;
};

export default uploadToQuotationS3;
