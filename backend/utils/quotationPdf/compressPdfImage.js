
import sharp from "sharp";

const compressPdfImage = async (imageBuffer) => {
  const compressedBuffer = await sharp(imageBuffer)
    .rotate()
    .resize({
      width: 1000,
      height: 1000,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 70,
      mozjpeg: true,
    })
    .toBuffer();

  return compressedBuffer;
};

export default compressPdfImage;
