import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../config/s3.js";

const streamToBuffer = async (stream) => {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
};

const getObjectFromS3 = async (key) => {
  if (!key) {
    throw new Error("S3 object key is required");
  }

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });

  const response = await s3.send(command);

  if (!response.Body) {
    throw new Error("S3 object body is empty");
  }

  return streamToBuffer(response.Body);
};

export default getObjectFromS3;