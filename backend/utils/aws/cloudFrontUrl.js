const getCloudFrontUrl = (key) => {
  if (!key) return "";

  return `${process.env.CLOUDFRONT_URL}/${key}`;
};

export default getCloudFrontUrl;