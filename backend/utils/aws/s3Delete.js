import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../config/s3.js";

const deleteFromS3 = async (key) => {
  if (!key) {
    throw new Error("S3 object key is required");
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });

  await s3.send(command);

  return true;
};

export default deleteFromS3;