const getS3Url = (key) => {
  if (!key) {
    return null;
  }

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

export default getS3Url;