import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../config/s3.js";

const uploadToS3 = async (fileBuffer, fileName, contentType) => {
  const key = `${process.env.AWS_S3_FOLDER}/products/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await s3.send(command);

  return key;
};

export default uploadToS3;