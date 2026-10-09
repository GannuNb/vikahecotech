import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../../config/s3.js";

const uploadToQuotationS3 = async (
  fileBuffer,
  fileName,
  contentType
) => {
  if (!fileBuffer) {
    throw new Error("File buffer is required");
  }

  if (!fileName) {
    throw new Error("File name is required");
  }

  const key = `${process.env.AWS_S3_FOLDER}/quotations/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await s3.send(command);

  return key;
};

export default uploadToQuotationS3;